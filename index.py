#!/usr/bin/env python2.7
import microgear.client as microgear
import logging
import time
import RPi.GPIO as GPIO
import os
import dropbox
import SimpleHTTPServer
import SocketServer
import threading
import requests
from datetime import datetime,timedelta
# import pytz
# from pytz import timezone,utc

# import schedule
import Adafruit_DHT
sensor = Adafruit_DHT.DHT22
pinDHTin = 12
pinDHTout = 16
pinfanOut = 20
pinfanIn = 21

systemType = 'manual'

tempLimit = 30
humiLimit = 80
timeStart = None
timeEnd = None

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
GPIO.setup(pinfanOut,GPIO.OUT)
GPIO.setup(pinfanIn,GPIO.OUT)
appid = 'Vegetable001'
gearkey = 'dfhiaN7XLOFf7S3'
gearsecret = 'EsJgEv08jtXzSbwdKUxTpSYq7'

microgear.create(gearkey, gearsecret, appid, {'debugmode': True})

humidityIn = None
temperatureIn = None
humidityOut = None
temperatureOut = None

dbx = dropbox.Dropbox("cKG3HoKEj5UAAAAAAABOIPdWvWMDanbCaQP_5q5Sd-NbI9CpIDPCFeZN0EI2xCUa")
def saveImg (path, filename) :
    dbx.users_get_current_account()
    file_path = os.path.join("/home/pi/Desktop/CodeVegetable/public/picture/" + path+"/", filename)
    f = open(file_path, 'rb')
    
    dbx.files_upload(f.read(),'/'+path +'.jpg', mode=dropbox.files.WriteMode.overwrite)
    g = open(file_path, 'rb')
    
    dbx.files_upload(g.read(),'/'+path +'/'+filename, mode=dropbox.files.WriteMode.overwrite)
    os.remove("/home/pi/Desktop/CodeVegetable/public/picture/" + path+"/" + filename)
    # result = dbx.files_get_temporary_link('/'+path +'/'+filename)
    # print(result.link)
    # microgear.publish("/" + path,result.link,{'retain':True})
    # dbx.file_copy('/' + path + '/' + filename, '/' + path + '.jpg')
def writePin (pin, flag):
    GPIO.setup(pin, GPIO.OUT)
    if flag:
        GPIO.output(pin, GPIO.HIGH)
    else :
        GPIO.output(pin, GPIO.LOW)
def connection():
    logging.info("Now I am connected with Netpie")


def subscription(topic, message):
    logging.info('message : ' + message)
    if message == "btnupdate":
        fetchSystem()
    if message == "lightOn":
        GPIO.setup(17, GPIO.OUT)
        GPIO.output(17, GPIO.LOW)
        GPIO.setup(6, GPIO.OUT)
        GPIO.output(6, GPIO.LOW)
        logging.info("contorller : lightOn")
    elif message == "lightOff":
        GPIO.setup(17, GPIO.OUT)
        GPIO.output(17, GPIO.HIGH)
        GPIO.setup(6, GPIO.OUT)
        GPIO.output(6, GPIO.HIGH)
        logging.info("contorller : lightOff")
    elif message == "pumpOn":
        GPIO.setup(22, GPIO.OUT)
        GPIO.output(22, GPIO.LOW)
        logging.info("contorller : pumpOn")
    elif message == "pumpOff":
        GPIO.setup(22, GPIO.OUT)
        GPIO.output(22, GPIO.HIGH)
        logging.info("contorller : pumpOff")
    elif message == "fogOn":
        GPIO.setup(10, GPIO.OUT)
        GPIO.output(10, GPIO.LOW)
    elif message == "fogOff":
        GPIO.setup(10, GPIO.OUT)
        GPIO.output(10, GPIO.HIGH)
        logging.info("contorller : fogOff")
    elif message == "waterOn":
        GPIO.setup(13, GPIO.OUT)
        GPIO.output(13, GPIO.LOW)
        logging.info("contorller : waterOn")
    elif message == "waterOff":
        GPIO.setup(13, GPIO.OUT)
        GPIO.output(13, GPIO.HIGH)
        logging.info("contorller : waterOff")
    elif message == "takeCam":
        GPIO.setup(17, GPIO.OUT)
        GPIO.output(17, GPIO.HIGH)
        GPIO.setup(6, GPIO.OUT)
        GPIO.output(6, GPIO.LOW)
        currentDT = datetime.now()
        filename = currentDT.strftime("%Y-%m-%d-%H-%M-%S") + '.jpg'
        try:
            os.system(
                "fswebcam -p YUYV -d /dev/video1 -r 1280x780 --set brightness=50% --no-banner public/picture/Floor3/"+filename)
            os.system(
                "fswebcam -p YUYV -d /dev/video0 -r 1280x780 --set brightness=50% --no-banner public/picture/Floor2/"+filename)
            os.system(
                "fswebcam -p YUYV -d /dev/video2 -r 1280x780 --set brightness=50% --no-banner public/picture/Floor1/"+filename)
            saveImg ('Floor3',filename)
            saveImg ('Floor2', filename)
            saveImg ('Floor1', filename)
            logging.info("contorller : takeCam")
        except:
            logging.info("contorller : cannot takeCam")

        
        GPIO.output(17, GPIO.LOW)
    else:
        logging.info("contorller : " + topic + ' '+message)

def disconnect():
    logging.info("disconnected")
def job():
    print("I'm working...")
def fetchSystem ():
    global systemType,tempLimit,humiLimit,timeStart,timeEnd
    response = requests.get("http://smartfarm-cabinet.herokuapp.com/setsys")
    json_response = response.json()
    systemType = json_response[0]['sysbtn']
    tempLimit = float(json_response[0]['sysTemp'])
    humiLimit = float(json_response[0]['sysHumi'])
    timeStart = convertTime(datetime.strptime(json_response[0]['sysTimeStart'], '%Y-%m-%dT%H:%M:%S.%fZ'))
    timeEnd = convertTime(datetime.strptime(json_response[0]['sysTimeEnd'], '%Y-%m-%dT%H:%M:%S.%fZ'))
PORT = 8000
class ServerHandler(SimpleHTTPServer.SimpleHTTPRequestHandler):

    def do_POST(self):
        content_len = int(self.headers.getheader('content-length', 0))
        post_body = self.rfile.read(content_len)
        print post_body
        microgear.publish("/pH",post_body.split(",")[0],{'retain':True})
        microgear.publish("/EC",post_body.split(",")[1],{'retain':True})
def convertTime (time):
    temp = time + timedelta(hours = 7)
    return temp.time()
                    
def startServerHttp ():
    Handler = ServerHandler
    httpd = SocketServer.TCPServer(("", PORT), Handler)
    print "serving at port", PORT
    thread = threading.Thread(target=httpd.serve_forever)
    thread.start()
    logging.info("start http server port:" + str(PORT))

startServerHttp()
# schedule.every(5).minutes.do(job)
# schedule.run_pending()
microgear.setalias("RaspberryPI")
microgear.setname("RaspberryPI")
microgear.on_connect = connection
microgear.on_message = subscription
microgear.on_disconnect = disconnect
microgear.subscribe("/controller/#")
fanIn = False
fanOut = False
GPIO.output(pinfanIn,GPIO.LOW)
GPIO.output(pinfanOut,GPIO.LOW)
connection = True
while connection:
    try:
        microgear.connect(False)
        connection = False
        logging.info("connect")
        break
    except:
        time.sleep(10)
        connection = True
        logging.warning("disconnect")
fetchSystem()
while True:
    if systemType == 'Auto':
        now = datetime.now().time()
        print now,timeStart,timeEnd
        if (timeStart < now and now < timeEnd) or timeStart == timeEnd:
            writePin(17,False)
            writePin(6,False)
            logging.info("contorller auto: lightOn")
        else :
            writePin(17,True)
            writePin(6,True)
            logging.info("contorller auto: lightOff")
    humidityIn, temperatureIn = Adafruit_DHT.read_retry(sensor, pinDHTin)
    humidityOut, temperatureOut = Adafruit_DHT.read_retry(sensor, pinDHTout)
    if humidityIn is None :
        print "cannot get temp in"
    if humidityOut is None :
        print "cannot get temp out"
    if humidityIn is not None and humidityOut is not None:
        logging.info(str(temperatureIn) + ' ' +str(temperatureOut))
        print 'TempIn={0:0.1f}*C  HumidityIn={1:0.1f}%'.format(temperatureIn, humidityIn)
        print 'TempOut={0:0.1f}*C  HumidityOut={1:0.1f}%'.format(temperatureOut, humidityOut)
        microgear.publish("/Temperature",temperatureIn,{'retain':True})
        microgear.publish("/Humidity",humidityIn,{'retain':True})
        microgear.publish("/TemperatureOut",temperatureOut,{'retain':True})
        microgear.publish("/HumidityOut",humidityOut,{'retain':True})
        if (temperatureIn > temperatureOut) :
            if (humidityIn > 95) :
                fanOut = False
            else :
                fanOut = True
            fanIn = True
            logging.info("Status fan : ON")
        else :
            fanOut = False
            fanIn = False
            logging.info("Status fan : OFF")
        if systemType == 'Auto':
            if (temperatureIn > tempLimit and 2 > abs(temperatureOut - temperatureIn)) or humidityIn < humiLimit:
                writePin(10,False)
                logging.info("contorller auto: fogOn")
            else :
                writePin(10,True)
                logging.info("contorller auto: fogOff")
    else:
        if systemType == 'Auto':
            writePin(10,True)
            logging.info("contorller auto: fogOff")
        logging.warning('Failed to get reading. Try again!')
        print 'Failed to get reading. Try again!'
    if fanIn :
        GPIO.output(pinfanIn,GPIO.HIGH)
    else :
        GPIO.output(pinfanIn,GPIO.LOW)
    if fanOut :
        GPIO.output(pinfanOut,GPIO.HIGH)
    else :
        GPIO.output(pinfanOut,GPIO.LOW)
    time.sleep(5)
