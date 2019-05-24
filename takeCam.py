import RPi.GPIO as GPIO
import time
import os
import dropbox


def saveImg (filename) :
    dbx = dropbox.Dropbox("cKG3HoKEj5UAAAAAAABN6J8oc2yJIB7q6pDRjVKBNvrX_gs0D0vSSAHCT-QVRnlI")
    dbx.users_get_current_account()
    file_path = os.path.join("public/picture/", filename)
    f = open(file_path, 'rb')
    dbx.files_upload(f.read(),'/cam/'+filename)

GPIO.setmode(GPIO.BCM)

#-------------------

os.system("fswebcam -p YUYV -d /dev/video2 -r 1280x780 --no-banner public/picture/Floor3.jpg")
os.system("fswebcam -p YUYV -d /dev/video1 -r 1280x780 --no-banner public/picture/Floor2.jpg")
os.system("fswebcam -p YUYV -d /dev/video0 -r 1280x780 --no-banner public/picture/Floor1.jpg")

saveImg ('Floor3.jpg')
saveImg ('Floor2.jpg')
saveImg ('Floor1.jpg')