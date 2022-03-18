import numpy as np
import pandas as pd
from torch import load
import yfinance as yf
from datetime import datetime
from datetime import timedelta

from ta.volatility import AverageTrueRange
from xgboost import XGBRegressor

def download_hourly_price(ticker,day):
    start = datetime.strptime(day, "%Y-%m-%d")- timedelta(days=10)#- timedelta(days=1)
    end = datetime.strptime(day, "%Y-%m-%d")+ timedelta(days=2)
    return yf.download(ticker,start,end, interval='1h')


def generate_ATRP(DF, wind=14):
    df=DF.copy()
    
    atr_i=AverageTrueRange(high=df.High, low=df.Low, close=df['Adj Close'],window=wind)
    df['ATR']=atr_i.average_true_range()
    df['ATRP']=[ 100*df.loc[i,'ATR']/df.loc[i,'Adj Close'] for i in df.index]
    #snp.sort_values(by=['ATRP'], ascending=False)
    return df

def average_hourly_ATRP(DF):
    df=DF.copy()
    df['datetime']=pd.to_datetime(df.index,utc=True)
    df['Date']=df.datetime.dt.date #Transform datetime into date
    grouped=df.groupby('Date')
    return grouped

def generate_window(DF, lag, window):
    #print(DF)
    df=DF.copy()
    df2=pd.DataFrame()
    for t in range(0,window+1):
        df2[f"ATRP_t-{lag+t}"]=df["ATRP"].shift(lag+t)
    #print(df)
    df2.dropna(axis=0,inplace=True)
    #self.preprocessed=df2
    X=df2.iloc[:,-window:]
    #print(df2)
    #y=df2.loc[:,['ATRP_t-0']]
    return X 

def preprocess_sample(ticker,day):
    
    day_str=day
    #day_date=datetime.strptime(day, "%Y-%m-%d").dt.date
    
    hourly_df=download_hourly_price(ticker,day_str) #Downloads hourly data
    hourly_df=generate_ATRP(hourly_df,wind=14) #Generates ATRP indicator on hourly data
    day_grouped_df=average_hourly_ATRP(hourly_df).mean() #Groups by day and takes the average of ATRP
    X_df=generate_window(day_grouped_df,0,6) # Generates df with features where each features is an ATRP correpsonding to a period in time

    return X_df.iloc[-1,:]


def load_model(path):
    xgb=XGBRegressor()
    xgb.load_model(path)
    return xgb

    



if __name__ == '__main__':
    #dfcito=download_hourly_price("^GSPC","2022-03-16")
    #dfcito=ATRP(dfcito,14)
    #dfcito.index.name="datetime"
    #dfcito=average_hourly_ATRP(dfcito).mean()
    dfcito=preprocess_sample("^GSPC","2022-03-16")
    model=load_model("C:\\Users\\Alex\\Caps\\capstone\\xgb_depth_model.json")
    fv = np.array(dfcito).reshape((1,-1))
    print(model.predict(fv).squeeze())

