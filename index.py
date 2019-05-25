import microgear.client as microgear
import logging
import time
import RPi.GPIO as GPIO
import os
import dropbox

GPIO.setmode(GPIO.BCM)

appid = 'Vegetable001'
gearkey = 'dfhiaN7XLOFf7S3'
gearsecret = 'EsJgEv08jtXzSbwdKUxTpSYq7'

microgear.create(gearkey, gearsecret, appid, {'debugmode': True})


def saveImg (filename) :
    dbx = dropbox.Dropbox("cKG3HoKEj5UAAAAAAABN6J8oc2yJIB7q6pDRjVKBNvrX_gs0D0vSSAHCT-QVRnlI")
    dbx.users_get_current_account()
    file_path = os.path.join("public/picture/", filename)
    f = open(file_path, 'rb')
    dbx.files_upload(f.read(),'/cam/'+filename)

def connection():
    logging.info("Now I am connected with Netpie")


def subscription(topic, message):
    logging.info('message : ' + message)
    if message == "lightOn":
        GPIO.setup(17, GPIO.OUT)
        GPIO.output(17, GPIO.LOW)
        logging.info("contorller : lightOn")
    elif message == "lightOff":
        GPIO.setup(17, GPIO.OUT)
        GPIO.output(17, GPIO.HIGH)
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
        GPIO.setup(6, GPIO.OUT)
        GPIO.output(6, GPIO.HIGH)
    else:
        logging.info("contorller : not Found")


def disconnect():
    logging.info("disconnected")


microgear.setalias("RaspberryPI")
microgear.setname("RaspberryPI")
microgear.on_connect = connection
microgear.on_message = subscription
microgear.on_disconnect = disconnect
microgear.subscribe("/controller")
microgear.connect(True)
