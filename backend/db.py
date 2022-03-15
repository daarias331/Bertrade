import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import pipeline

# Use a service account
cred = credentials.Certificate('C:\\Users\\Alex\Ghub\\key_bertrade.json')
firebase_admin.initialize_app(cred)

db = firestore.client()

'''doc_ref = db.collection(u'users').document(u'alovelace')
doc_ref.set({
    u'first': u'Ada',
    u'last': u'Lovelace',
    u'born': 1815
})
'''

df_tweets=pipeline.download_tweets('2022-03-08',"$SPX")

df_tweets=pipeline.clean_data(df_tweets)

tweets_json=df_tweets.to_dict(orient = 'records')[0]

tweets_json["Date"]=tweets_json["Date"].strftime("%Y-%m-%d")

doc_ref = db.collection(u'trial').document(u'date1')


doc_ref.set(tweets_json)