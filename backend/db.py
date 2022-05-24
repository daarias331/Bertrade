from importlib.resources import path
from random import sample
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from matplotlib.pyplot import get
import pipeline

import numpy as np
import pandas as pd

from datetime import datetime
from datetime import timedelta


import argparse
parser= argparse.ArgumentParser(description='Bert Model to classify direction of price')
parser.add_argument('-d','--date', type=str, metavar='', help='specify the date for which you want to generate the prediction in format YYYY-MM-DD')
args = parser.parse_args()

day_to_predict=args.date


import depth_model
import direction_model

path_bert="C:\\Users\\Alex\\Caps\\capstone\\Experiments\\Bin_by_date\\SPX_NOT freeze\\model_SPX_shift_ready_bin_byDate_ep14.dat"
path_depth="C:\\Users\\Alex\\Caps\\capstone\\xgb_depth_model.json"

# Use a service account
cred = credentials.Certificate('C:\\Users\\Alex\Ghub\\key_bertrade.json')
firebase_admin.initialize_app(cred)


db = firestore.client()


def date_market_open(db,date_predict_str):
    holidays=get_holidays(db)
    date_predict= datetime.strptime(date_predict_str, "%Y-%m-%d")

    if date_predict.isoweekday() in [6,7]:
        return False
    elif date_predict_str in holidays:
        return False
    else:
        return True


def determine_predictor_date(db, date_predict_str):
    '''Returns tuple. Pos[0] is a date as a string in format yyyy-mm-dd corresponding to the closest previous business day used to make the prediction 
                        Pos[1] is is the date in format datetime
    Keyword arguments:
    db -- object connecting to firebase database
    date_predict_str -- date as string in format yyyy-mm-dd corresponding to the date we want to make the prediction for
    '''
    holidays=get_holidays(db)
    days_before=1
    date_predict= datetime.strptime(date_predict_str, "%Y-%m-%d")

    predictor_date=None
    predictor_date_str=None
    
    
    while not predictor_date:
        candidate = date_predict-timedelta(days=days_before) # candidate in datetime format
        candidate_str=datetime.strftime(candidate,"%Y-%m-%d")
        
        if candidate.isoweekday() in [6,7]: #If it's the weekend we won't use it to predict
            days_before+=1
            continue
        elif candidate_str in holidays: #If it's a holiday, we won't use it to predict
            days_before+=1
            continue
        else:
            predictor_date=candidate
            predictor_date_str=candidate_str
    
    
    return predictor_date_str, predictor_date



def get_holidays(db):
    docs = db.collection(u'holidays').stream()
    holiday_list=[]
    for doc in docs:
        holiday_list.append(doc.to_dict()['holiday_date'])
    return holiday_list



def add_holidays(db,path_holiday):
    holidays_df=pd.read_csv(path_holiday)

    for holiday in holidays_df['Holiday']:
        db.collection(u'holidays').add({
            u'holiday_date':holiday
        })

#add_holidays(db,'C:\\Users\\Alex\Ghub\\holidays_2022.csv')  # Uncomment this if want to add new holidays

def get_true_close(ticker,day):
    '''Adds the closing price of the day t-1 to the DB 
    Keyword arguments:
    day -- string indicating the date we want to update the closing price for
    '''
    start=datetime.strptime(day, "%Y-%m-%d")+timedelta(days=1) # Adds one day to the day we want to know. Don't overthink it, it's just a constrain from yfinance
    end=start+timedelta(days=1) # Adds one more day (two days in total from the day we want to know). Don't overthink it, it's just a constrain from yfinance
    
    df=depth_model.yf.download(ticker,start,end,'1d')

    adj_close_last=df.loc[day,'Adj Close']

    return adj_close_last
         

if __name__ == '__main__':

    
    predicted_date_str=day_to_predict
    predicted_date=datetime.strptime(predicted_date_str,"%Y-%m-%d")
    predictor_day_str, predictor_day=determine_predictor_date(db,predicted_date_str)
    print(f'Predictor date is: {predictor_day_str}')
    
    ## Block to predict the direction of the price
    df_tweets=pipeline.download_tweets(predictor_day_str,"$SPX")
    sample=pipeline.clean_data(df_tweets)
    model_direction=direction_model.load_model(path_bert)
    data_loader=direction_model.load_data(sample)
    direction_pred=direction_model.predict(model_direction,data_loader,direction_model.device)
    direction_pred_num = 1 if direction_pred=='up' else -1

    ## Block to predict the depth of the price movement
    df_price=depth_model.preprocess_sample("^GSPC",predictor_day_str)
    model_depth=depth_model.load_model("C:\\Users\\Alex\\Caps\\capstone\\xgb_depth_model.json")
    fv = np.array(df_price).reshape((1,-1))
    depth_pred=float(model_depth.predict(fv).squeeze())

    #To update previous day 
    prev_close=get_true_close('^GSPC',predictor_day_str)
    pred_price=prev_close*(1+(depth_pred*direction_pred_num/100))
    
    # Pushing the data onto the DB
    data_prediction={
        u'predictor_date_str':predictor_day_str,
        u'predictor_date': predictor_day,
        u'predicted_date_str': predicted_date_str,
        u'predicted_date': predicted_date,
        u'predicted_direction': direction_pred,
        u'predicted_depth': depth_pred,
        u'predicted_price': pred_price
    }

    db.collection(u'predictions').add(data_prediction)
    

    ## Adds the actual closing price of the previous day
    prev_ref=db.collection(u'predictions').where(u'predicted_date_str',u'==',predictor_day_str).get()[0] #Gets the document where we had made a predicion for previous day (predictor_day)

    db.collection(u'predictions').document(prev_ref.id).set({
        u'actual close':prev_close
    }, merge=True )
    
