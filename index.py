import microgear.client as microgear
import logging
import time
import RPi.GPIO as GPIO
import os
import dropbox
# import schedule
import Adafruit_DHT
sensor = Adafruit_DHT.DHT22
GPIO.setmode(GPIO.BCM)
pinDHTin = 20
pinDHTout = 21
pinfanOut = 16
pinfanIn = 12
GPIO.setup(pinfanOut,GPIO.OUT)
GPIO.setup(pinfanIn,GPIO.OUT)
appid = 'Vegetable001'
gearkey = 'dfhiaN7XLOFf7S3'
gearsecret = 'EsJgEv08jtXzSbwdKUxTpSYq7'

microgear.create(gearkey, gearsecret, appid, {'debugmode': True})

dbx = dropbox.Dropbox("cKG3HoKEj5UAAAAAAABOIPdWvWMDanbCaQP_5q5Sd-NbI9CpIDPCFeZN0EI2xCUa")
dbx.users_get_current_account()
def saveImg (filename) :
    file_path = os.path.join("/home/pi/Desktop/CodeVegetable/public/picture/", filename)
    f = open(file_path, 'rb')
    dbx.files_upload(f.read(),'/'+filename, mode=dropbox.files.WriteMode.overwrite)
    # dbx.files_upload(f.read(),'/'+filename)

def connection():
    logging.info("Now I am connected with Netpie")


def subscription(topic, message):
    logging.info('message : ' + message)
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
        logging.info("contorller : fogOn")
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
        os.system(
            "fswebcam -p YUYV -d /dev/video2 -r 1280x780 --no-banner public/picture/Floor3.jpg")
        os.system(
            "fswebcam -p YUYV -d /dev/video1 -r 1280x780 --no-banner public/picture/Floor2.jpg")
        os.system(
            "fswebcam -p YUYV -d /dev/video0 -r 1280x780 --no-banner public/picture/Floor1.jpg")
        saveImg ('Floor3.jpg')
        saveImg ('Floor2.jpg')
        saveImg ('Floor1.jpg')
        logging.info("contorller : takeCam")
        GPIO.output(17, GPIO.LOW)
    else:
        logging.info("contorller : not Found")


def disconnect():
    logging.info("disconnected")
def job():
    print("I'm working...")
# schedule.every(5).minutes.do(job)
# schedule.run_pending()
microgear.setalias("RaspberryPI")
microgear.setname("RaspberryPI")
microgear.on_connect = connection
microgear.on_message = subscription
microgear.on_disconnect = disconnect
microgear.subscribe("/controller")
microgear.connect(False)
while True:
    humidityIn, temperatureIn = Adafruit_DHT.read_retry(sensor, pinDHTin)
    humidityOut, temperatureOut = Adafruit_DHT.read_retry(sensor, pinDHTout)
    if humidityIn is not None and humidityOut is not None:
        print(temperatureIn + ' '+ temperatureOut)
        microgear.publish("/Temperature",temperatureIn,{'retain':True})
        microgear.publish("/Humidity",humidityIn,{'retain':True})
        microgear.publish("/TemperatureOut",temperatureOut,{'retain':True})
        microgear.publish("/HumidityOut",humidityOut,{'retain':True})
    if (temperatureIn > temperatureOut and humidityIn < humidityOut) :
        if (humidityIn > 95) :
            GPIO.output(pinfanOut,GPIO.LOW)
        else :
            GPIO.output(pinfanOut,GPIO.HIGH)
        GPIO.output(pinfanIn,GPIO.HIGH)
        print("Status fan : ON")
    else :
        GPIO.output(pinfanOut,GPIO.LOW)
        GPIO.output(pinfanIn,GPIO.LOW)
        print("Status fan : OFF")
    time.sleep(10)
