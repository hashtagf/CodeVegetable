import SimpleHTTPServer
import SocketServer
import time

PORT = 8000
class ServerHandler(SimpleHTTPServer.SimpleHTTPRequestHandler):

    def do_POST(self):
        content_len = int(self.headers.getheader('content-length', 0))
        post_body = self.rfile.read(content_len)
        print(post_body)
        # microgear.publish("/pH",post_body.split(",")[0],{'retain':True})
        # microgear.publish("/EC",post_body.split(",")[1],{'retain':True})

Handler = ServerHandler

httpd = SocketServer.TCPServer(("", PORT), Handler)

print("serving at port", PORT)
httpd.serve_forever()
while True:
    print("hello")
    time.sleep(5)