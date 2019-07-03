import microgear.client as microgear
import logging
import time
import RPi.GPIO as GPIO
import os
import dropbox
import SimpleHTTPServer
import SocketServer
import urllib2
import threading
# import schedule
import Adafruit_DHT
sensor = Adafruit_DHT.DHT22
pinDHTin = 12
pinDHTout = 16
pinfanOut = 20
pinfanIn = 21
systemType = 'manual'

tempLimit = None
humiLimit = None

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
def saveImg (filename) :
    dbx.users_get_current_account()
    file_path = os.path.join("/home/pi/Desktop/CodeVegetable/public/picture/", filename)
    f = open(file_path, 'rb')
    dbx.files_upload(f.read(),'/'+filename, mode=dropbox.files.WriteMode.overwrite)
    # dbx.files_upload(f.read(),'/'+filename)

def connection():
    logging.info("Now I am connected with Netpie")


def subscription(topic, message):
    logging.info('message : ' + message)
    fetchSystem()

    if topic == "/Vegetable001/controller/system":
        global systemType
        systemType = message
    if topic == "/Vegetable001/controller/tempLimit":
        global tempLimit
        tempLimit = float(message)
    if topic == "/Vegetable001/controller/humiLimit":
        global humiLimit
        humiLimit = float(message)
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
        """ if temperatureIn is not None and temperatureOut is not None and temperatureIn > temperatureOut - 2:
            GPIO.output(10, GPIO.LOW)
            logging.info("contorller : fogOn")
        else :
            GPIO.output(10, GPIO.HIGH)
            logging.info("contorller : fogOff, outside is too hot") """
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
        logging.info("contorller : " + topic + ' '+message)


def disconnect():
    logging.info("disconnected")
def job():
    print("I'm working...")
def fetchSystem ():
    contents = urllib2.urlopen("http://smartfarm-cabinet.herokuapp.com/setsys").read()
    print(contents)

PORT = 8000
class ServerHandler(SimpleHTTPServer.SimpleHTTPRequestHandler):

    def do_POST(self):
        content_len = int(self.headers.getheader('content-length', 0))
        post_body = self.rfile.read(content_len)
        print post_body
        # microgear.publish("/pH",post_body.split(",")[0],{'retain':True})
        # microgear.publish("/EC",post_body.split(",")[1],{'retain':True})
def startServerHttp ():
    Handler = ServerHandler
    httpd = SocketServer.TCPServer(("", PORT), Handler)
    print "serving at port", PORT
    thread = threading.Thread(target=httpd.serve_forever)
    thread.start()
    logging.info("start http server"+PORT)

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

while True:
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
        if systemType == 'auto' and tempLimit is not None and humiLimit is not None:
            if (temperatureIn > tempLimit and tempLimit > temperatureOut - 2) or humidityIn < humiLimit:
                GPIO.output(10, GPIO.LOW)
                logging.info("contorller auto: fogOn")
            else :
                GPIO.output(10, GPIO.HIGH)
                logging.info("contorller auto: fogOff")
    else:
        GPIO.output(10, GPIO.HIGH)
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
