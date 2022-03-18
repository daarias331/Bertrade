from importlib.resources import path
from random import sample
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import pipeline

import numpy as np
import pandas as pd

from datetime import datetime
from datetime import timedelta


import depth_model
import direction_model

path_bert="C:\\Users\\Alex\\Caps\\capstone\\Experiments\\Bin_by_date\\SPX_NOT freeze\\model_SPX_shift_ready_bin_byDate_ep14.dat"
path_depth="C:\\Users\\Alex\\Caps\\capstone\\xgb_depth_model.json"

# Use a service account
cred = credentials.Certificate('C:\\Users\\Alex\Ghub\\key_bertrade.json')
firebase_admin.initialize_app(cred)

db = firestore.client()


'''
df_tweets=pipeline.download_tweets('2022-03-08',"$SPX")

df_tweets=pipeline.clean_data(df_tweets)

tweets_json=df_tweets.to_dict(orient = 'records')[0]

tweets_json["Date"]=tweets_json["Date"].strftime("%Y-%m-%d")


###ADDING A DOCUMENT    
#doc_ref = db.collection(u'trial').document(u'date1')


#QUERYING A DOCUMENT
doc_ref = db.collection(u'trial').document(u'date1')

doc = doc_ref.get()

sample=None
if doc.exists:
    sample=doc.to_dict()
    print(f'Document data: {sample}')
else:
    print(u'No such document!')


### PREDICTING DIRECTION

import direction_model

path="C:\\Users\\Alex\\Caps\\capstone\\Experiments\\Bin_by_date\\SPX_NOT freeze\\model_SPX_shift_ready_bin_byDate_ep14.dat"
model=direction_model.load_model(path)

data_loader=direction_model.load_data(sample)

pred=direction_model.predict(model,data_loader,direction_model.device)

print(pred)

#doc_ref.set(tweets_json)
'''

### PREDICTING DEPTH
'''
import depth_model
path_depth="C:\\Users\\Alex\\Caps\\capstone\\xgb_depth_model.json"

dfcito=depth_model.preprocess_sample("^GSPC","2022-03-16")
model=depth_model.load_model("C:\\Users\\Alex\\Caps\\capstone\\xgb_depth_model.json")
fv = np.array(dfcito).reshape((1,-1))
depth_pred=float(model.predict(fv).squeeze())

print(depth_pred)

'''

'''
    # pushed onto DB
    db.collection(u'trial').add({
    u'pred_depth': depth_pred
})'''


def determine_predictor_date(db, date_predict_str):
    '''Returns a date as a string in format yyyy-mm-dd corresponding to the closest previous business day used to make the prediction 
    Keyword arguments:
    db -- object connecting to firebase database
    date_predict_str -- date as string in format dd-mm-yyyy corresponding to the date we want to make the prediction for
    '''
    holidays=get_holidays(db)
    days_before=1
    date_predict= datetime.strptime(date_predict_str, "%Y-%m-%d")

    predictor_date=None
    
    while not predictor_date:
        candidate = date_predict-timedelta(days=days_before) # candidate in datetime format
        candidate_str=candidate.strftime("%Y-%m-%d")
        
        if candidate.isoweekday() in [6,7]: #If it's the weekend we won't use it to predict
            days_before+=1
            continue
        elif candidate_str in holidays: #If it's a holiday, we won't use it to predict
            days_before+=1
            continue
        else:
            predictor_date=candidate_str
    
    return predictor_date



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
pdate=determine_predictor_date(db,'2022-04-21')

if __name__ == '__main__':

    predicted_date='2022-03-07'
    predictor_day_str=determine_predictor_date(db,predicted_date)
    print(f'Predictor date is: {predictor_day_str}')

    ## Block to predict the direction of the price
    df_tweets=pipeline.download_tweets(predictor_day_str,"$SPX")
    sample=pipeline.clean_data(df_tweets)
    model_direction=direction_model.load_model(path_bert)
    data_loader=direction_model.load_data(sample)
    direction_pred=direction_model.predict(model_direction,data_loader,direction_model.device)

    ## Block to predict the depth of the price movement
    df_price=depth_model.preprocess_sample("^GSPC",predictor_day_str)
    model_depth=depth_model.load_model("C:\\Users\\Alex\\Caps\\capstone\\xgb_depth_model.json")
    fv = np.array(df_price).reshape((1,-1))
    depth_pred=float(model_depth.predict(fv).squeeze())

    
    # Pushing the data onto the DB
    data_prediction={
        u'predictor date': predictor_day_str,
        u'predicted date': predicted_date,
        u'predicted direction': direction_pred,
        u'predicted depth': depth_pred
    }

    db.collection(u'predictions').add(data_prediction)
