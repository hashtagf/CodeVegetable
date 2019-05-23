import microgear.client as microgear
import logging
import time
# import RPi.GPIO as GPIO
import os

# GPIO.setmode(GPIO.BCM)

appid = 'Vegetable001'
gearkey = 'dfhiaN7XLOFf7S3'
gearsecret = 'EsJgEv08jtXzSbwdKUxTpSYq7'

microgear.create(gearkey, gearsecret, appid, {'debugmode': True})


def connection():
    logging.info("Now I am connected with Netpie")


def subscription(topic, message):
    if message == "b'lightOn'":
        GPIO.setup(17, GPIO.OUT)
        GPIO.output(17, GPIO.LOW)
        logging.info("lightOn")
    elif message == "b'lightOff'":
        GPIO.setup(17, GPIO.OUT)
        GPIO.output(17, GPIO.HIGH)
        logging.info("lightOff")
    elif message == "b'pumpOn'":
        GPIO.setup(22, GPIO.OUT)
        GPIO.output(22, GPIO.LOW)
        logging.info("pumpOn")
    elif message == "b'pumpOff'":
        GPIO.setup(22, GPIO.OUT)
        GPIO.output(22, GPIO.HIGH)
        logging.info("pumpOff")
    elif message == "b'fogOn'":
        GPIO.setup(10, GPIO.OUT)
        GPIO.output(10, GPIO.LOW)
        logging.info("fogOn")
    elif message == "b'fogOff'":
        GPIO.setup(10, GPIO.OUT)
        GPIO.output(10, GPIO.HIGH)
        logging.info("fogOff")
    elif message == "waterOn'":
        GPIO.setup(26, GPIO.OUT)
        GPIO.output(26, GPIO.LOW)
        logging.info("waterOn")
    elif message == "waterOff'":
        GPIO.setup(26, GPIO.OUT)
        GPIO.output(26, GPIO.HIGH)
        logging.info("waterOff")
    elif message == "b'takeCam'":
        os.system(
            "fswebcam -p YUYV -d /dev/video2 -r 1280x780 --no-banner public/picture/cam3/Floor3.jpg")
        os.system(
            "fswebcam -p YUYV -d /dev/video1 -r 1280x780 --no-banner public/picture/cam2/Floor2.jpg")
        os.system(
            "fswebcam -p YUYV -d /dev/video0 -r 1280x780 --no-banner public/picture/cam1/Floor1.jpg")
        logging.info("takeCam")


def disconnect():
    logging.info("disconnected")


microgear.setalias("RaspberryPI")
microgear.setname("RaspberryPI")
microgear.on_connect = connection
microgear.on_message = subscription
microgear.on_disconnect = disconnect
microgear.subscribe("/controller")
microgear.connect(True)
