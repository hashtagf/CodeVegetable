import RPi.GPIO as GPIO
import time
import os

GPIO.setmode(GPIO.BCM)

GPIO.setup(10, GPIO.OUT)
GPIO.output(10, GPIO.HIGH)
