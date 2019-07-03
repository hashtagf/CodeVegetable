import SimpleHTTPServer
import SocketServer
import time
import microgear.client as microgear

def fetchSystem ():
    contents = urllib2.urlopen("http://smartfarm-cabinet.herokuapp.com/setsys").read()
    print contents[0]
fetchSystem()
