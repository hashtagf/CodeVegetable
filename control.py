import RPi.GPIO as GPIO
import time
import os

GPIO.setmode(GPIO.BCM)

#-------------------

os.system("fswebcam -d /dev/video0 -r 1280x780 --no-banner Front1.jpg")



