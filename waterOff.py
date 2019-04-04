import RPi.GPIO as GPIO
import time
import os

GPIO.setmode(GPIO.BCM)

GPIO.setup(27, GPIO.OUT)
GPIO.output(27, GPIO.HIGH)
