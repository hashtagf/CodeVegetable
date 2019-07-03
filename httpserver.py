import SimpleHTTPServer
import SocketServer
import time
import microgear.client as microgear

appid = 'Vegetable001'
gearkey = 'dfhiaN7XLOFf7S3'
gearsecret = 'EsJgEv08jtXzSbwdKUxTpSYq7'

microgear.create(gearkey, gearsecret, appid, {'debugmode': True})

def connection():
    logging.info("Now I am connected with netpie")

def subscription(topic,message):
    logging.info(topic+" "+message)

def disconnect():
    logging.info("disconnected")

microgear.setalias("doraemon")
microgear.on_connect = connection
microgear.on_message = subscription
microgear.on_disconnect = disconnect
microgear.subscribe("/mails")
microgear.connect(False)
PORT = 8000
class ServerHandler(SimpleHTTPServer.SimpleHTTPRequestHandler):

    def do_POST(self):
        content_len = int(self.headers.getheader('content-length', 0))
        post_body = self.rfile.read(content_len)
        print post_body
        # microgear.publish("/pH",post_body.split(",")[0],{'retain':True})
        # microgear.publish("/EC",post_body.split(",")[1],{'retain':True})

Handler = ServerHandler

httpd = SocketServer.TCPServer(("", PORT), Handler)

print "serving at port", PORT
httpd.serve_forever()
