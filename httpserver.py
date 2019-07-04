import urllib2
import requests

from datetime import datetime

def fetchSystem ():
    response = requests.get("http://smartfarm-cabinet.herokuapp.com/setsys")
    json_response = response.json()
    strTime = json_response[0]['sysTimeStart']

    datetime_object =  datetime.strptime(json_response[0]['sysTimeEnd'], '%Y-%m-%dT%H:%M:%S.%fZ')
    print datetime_object
    print datetime.utcnow()
fetchSystem()
