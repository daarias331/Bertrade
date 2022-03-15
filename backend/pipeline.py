from dataclasses import dataclass
import os
import pandas as pd
from datetime import date
from pandas.core import groupby

from pandas.core.indexes import interval
import snscrape.modules.twitter as sntwitter
from datetime import datetime
from datetime import timedelta
import timeit   
import yfinance as yf
import argparse

import re
import string
from collections import defaultdict
import numpy as np

def download_tweets(start_date, query, max_results=300):

    end_date=datetime.strptime(start_date, "%Y-%m-%d")+ timedelta(days=1)

    tweets_list = []
    data_df=pd.DataFrame(columns=['Date', 'text'])
    try:
        for i,tweet in enumerate(sntwitter.TwitterSearchScraper(f'{query} since:{start_date} until:{str(end_date)}').get_items()):
            if i>max_results:
                break
            content_no_comma=str(tweet.content).replace(',',' ') #Removes commas to not interfere in the CSV structure
            #id='id'+str(tweet.id) #adds "id" to the actual number to prevent any kind of truncation
            tweet_date_format=str(tweet.date)
            tweet_datetime=datetime.strptime(tweet_date_format,'%Y-%m-%d %H:%M:%S+00:00') #Transforms into datetime
            tweet_date=datetime.date(tweet_datetime) #transforms into date
            tweets_list.append([tweet_date, content_no_comma])
    except:
        print("Exception on tweet:",i, "from date:", start_date,"\n")
    
    data_df=pd.concat([data_df,pd.DataFrame(tweets_list ,columns=['Date', 'text'])])

    return data_df
    

def transform_to_lower_case(df):
    df['text']=df['text'].str.lower()
    return df

def remove_non_ascii(sentece):
    encoded_string = sentece.encode("ascii", "ignore")
    return encoded_string.decode()

def remove_unwanted_characters(df):

    print("Removing unwanted characters")
    df['text']=df['text'].map(lambda x: re.sub(r'http\S+', ' ', x)) #Remove URL's
    df['text']=df['text'].map(lambda x: re.sub(r'\r|\n', ' ', x)) #Remove scape characters
    df['text']=df['text'].map(lambda x: re.sub(r'S&amp;P 500', ' ', x)) #Remove meaningless sequence not easily matched by regex
    df['text']=df['text'].map(lambda x: re.sub(r'([a-zA-Z0-9_]{1,50})&amp;([a-zA-Z0-9_]{1,50})', ' ', x)) #Remove meaningless sequences 1
    df['text']=df['text'].map(lambda x: re.sub(r'([a-zA-Z0-9_]{1,50})amp;([a-zA-Z0-9_]{1,50})', ' ', x)) #Remove meaningless sequences 2
    df['text']=df['text'].map(lambda x: re.sub(r'amp;', ' ', x))
    df['text']=df['text'].map(lambda x: re.sub(r'@([a-zA-Z0-9_]{1,50})|#([a-zA-Z0-9_]{1,50})|\$([a-zA-Z0-9_]{1,50})', ' ', x)) #Remove meaningless sequences
    df['text']=df['text'].map(lambda x: re.sub('-|&|#|@|\+|\^|\*|\$|\(|\)|\{|\}|"|!|\/|%|:',' ',x)) #Remove other characters. Add again after|\"
    df['text']=df['text'].map(lambda x: re.sub(r'\d+', ' ', x)) #Removing numbers
    
    #df['text']=df['text'].map(lambda x: re.sub('amp;','. ',x)) #Remove other characters
    df['text']=df['text'].map(lambda x: remove_non_ascii(x)) #Remove non ascii characters
    
    emoji_pattern = re.compile("["
    u"\U0001F600-\U0001F64F"  # emoticons
    u"\U0001F300-\U0001F5FF"  # symbols & pictographs
    u"\U0001F680-\U0001F6FF"  # transport & map symbols
    u"\U0001F1E0-\U0001F1FF"  # flags (iOS)
    u"\U00002500-\U00002BEF"  # chinese char
    u"\U00002702-\U000027B0"
    u"\U00002702-\U000027B0"
    u"\U000024C2-\U0001F251"
    u"\U0001f926-\U0001f937"
    u"\U00010000-\U0010ffff"
    u"\u2640-\u2642" 
    u"\u2600-\u2B55"
    u"\u200d"
    u"\u23cf"
    u"\u23e9"
    u"\u231a"
    u"\ufe0f"  # dingbats
    u"\u3030"
                        "]+", flags=re.UNICODE)
    df['text']=df['text'].map(lambda x: re.sub(emoji_pattern, '', x))

    df['text']=df['text'].map(lambda x: re.sub(' +',' ',x)) #Remove multiple whitespaces

    df['text']=df['text'].map(lambda x: x.translate(str.maketrans('', '', string.punctuation))) #Removes punctutation

    return df

def remove_short_tweets(df,min_words,min_len ):

    print("Removing short tweets")
    df['keep']=[True]*len(df['text'])
    #sizes=[]
    for i in range(len(df['text'])):
        #sizes.append(len(df['text'][i].split()))
        if len(df['text'][i].split())<=min_words or len(df['text'][i])<=min_len: #Remove tweets with less or equal to "min_len" words
            df.loc[i,'keep']=False
    #print(min(sizes), df['text'][sizes.index(min(sizes))],df['keep'][sizes.index(min(sizes))])
    df=df[df['keep']]
    df.reset_index(inplace=True, drop=True)
    return df


def combine_tweets_by_date(DF):

    print("Combining tweets by date")

    # Creates dictionary. Keys are the dates and the value is a list of tweets twitted on that date
    keys_dict=defaultdict(list)
    for i, doc in enumerate(DF["text"]):
        key=DF.loc[i,'Date']
        keys_dict[key].append(doc)
    
    # Creates array with two columns: First column is the date, second column is the tweets joined together  
    array_date=[]
    for k in keys_dict.keys():
        keys_dict[k]=' '.join(keys_dict[k])
        array_date.append([k,keys_dict[k]])
    
    # Transform array to dataframe
    array_date=np.array(array_date)
    new_df=pd.DataFrame(array_date,columns=['Date','text'])

    return new_df

def clean_data(DF):
    df_clean=transform_to_lower_case(DF)
    df_clean= remove_unwanted_characters(df_clean)
    df_clean=remove_short_tweets(df_clean,min_words=2,min_len= 10)
    df_clean=combine_tweets_by_date(df_clean)

    return df_clean


df_tweets=download_tweets('2022-03-08',"$SPX")

df_tweets=clean_data(df_tweets)

tweets_json=df_tweets.to_dict(orient = 'records')[0]


print(type(tweets_json))
print(tweets_json)

#df_tweets.to_csv("prueba_spx.csv",index=False)





