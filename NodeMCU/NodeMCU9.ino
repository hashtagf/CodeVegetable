#include <ESP8266WiFi.h>
#include <WiFiUdp.h>
#include <SoftwareSerial.h>
#include <DHT.h>
#include <MicroGear.h>

#define fan D3 //พัดลม
#define pump D4 //ปั๊มน้ำ
#define light D0 //หลอดไฟ
#define ledPin D7 //เทส

#define DHTPIN D1
#define DHTTYPE DHT22

//Microgear
#define APPID   "Vegetable001"
#define KEY     "dfhiaN7XLOFf7S3"
#define SECRET  "EsJgEv08jtXzSbwdKUxTpSYq7"

#define ALIAS   "NodeMCU1"
#define TargetWeb "DigitalOUTPUT_HTML_web"

DHT dht(DHTPIN, DHTTYPE);

const char WEBSITE[] = "api.pushingbox.com"; //pushingbox API server
const String devid = "vC72A27011256BCC"; //device ID from Pushingbox

const int analogInPin = A0; //Analog EC input pin 
const int analogOutPin = D8; //Analog EC output pin 

int sensorValue = 0; //value read 
int outputValue = 0; //value output 
int house;
int minute;
int second;
int countUp = 0;

float h = dht.readHumidity();
float t = dht.readTemperature();

//float h = 0;
//float t = 0;

SoftwareSerial chat(D5, D6); //RX, TX Serial

String pH; //ตัวแปลเก็บค่าที่ส่งมาจาก Arduino

//char ssid[] = "Angular";
//char pass[] = "123456789";

char ssid[] = "Apple TV"; //network SSID (name)
char pass[] = "appletv415"; //network password

//char ssid[] = "BankunYa_1"; //network SSID (name)
//char pass[] = "home1125"; //network password

unsigned int localPort = 2390; //local port to listen for UDP packets

//IPAddress timeServer(129, 6, 15, 28); // time.nist.gov NTP server
IPAddress timeServerIP; // time.nist.gov NTP server address

const char* ntpServerName = "time.nist.gov";
const int NTP_PACKET_SIZE = 48; // NTP time stamp is in the first 48 bytes of the message

byte packetBuffer[ NTP_PACKET_SIZE]; //buffer to hold incoming and outgoing packets

// A UDP instance to let us send and receive packets over UDP
WiFiUDP udp;

//control
WiFiClient espClient;
PubSubClient client(espClient);
MicroGear microgear(espClient);

void setup() {

  /* Event listener */
  microgear.on(MESSAGE,onMsghandler);
  microgear.on(CONNECTED,onConnected);
  
  Serial.begin(115200);
  chat.begin(4800);
  dht.begin();
  
  pinMode(fan, OUTPUT);
  pinMode(pump, OUTPUT);
  pinMode(light, OUTPUT);
  
  Serial.println();
  Serial.println();

  // We start by connecting to a WiFi network
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, pass);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }//end while
  Serial.println("");

  Serial.println("WiFi connected");
  Serial.print("IP address: ");
  Serial.print(WiFi.localIP());

  //Microgear
  microgear.init(KEY,SECRET,ALIAS);
  microgear.connect(APPID);
  pinMode(ledPin,OUTPUT);
  digitalWrite(ledPin,HIGH); // Turn off LED

  pinMode(LED_BUILTIN, OUTPUT);

  Serial.println("Starting UDP");
  udp.begin(localPort);
  Serial.print("Local port: ");
  Serial.println(udp.localPort());

  //control
  //client.setServer(mqtt_server, 19505);
  //client.setCallback(callback);
  
} //end setup

void loop() {
  ///////////////////////////////////////////////////////////////////////microgear
  if(microgear.connected()) {
    microgear.loop();
//    Serial.println("connect...");
  }else{
    Serial.println("connection lost, reconnect...");
    microgear.connect(APPID);
  }
  ///////////////////////////////////////////////////////////////////////microgear
  
  ///////////////////////////////////////////////////////////////////////NTP
  //get a random server from the pool
  WiFi.hostByName(ntpServerName, timeServerIP);

  sendNTPpacket(timeServerIP); // send an NTP packet to a time server
  // wait to see if a reply is available
  delay(1000);

  int cb = udp.parsePacket();
  if (!cb) {
    Serial.println();
    Serial.println("no packet yet");
  }else {
//    Serial.print("packet received, length=");
//    Serial.println(cb);
    // We've received a packet, read the data from it
    udp.read(packetBuffer, NTP_PACKET_SIZE); // read the packet into the buffer

    //the timestamp starts at byte 40 of the received packet and is four bytes,
    // or two words, long. First, esxtract the two words:

    unsigned long highWord = word(packetBuffer[40], packetBuffer[41]);
    unsigned long lowWord = word(packetBuffer[42], packetBuffer[43]);
    // combine the four bytes (two words) into a long integer
    // this is NTP time (seconds since Jan 1 1900):
    unsigned long secsSince1900 = highWord << 16 | lowWord;
//    Serial.print("Seconds since Jan 1 1900 = " );
//    Serial.println(secsSince1900);

    // now convert NTP time into everyday time:
//    Serial.print("Unix time = ");
    // Unix time starts on Jan 1 1970. In seconds, that's 2208988800:
    const unsigned long seventyYears = 2208988800UL;
    // subtract seventy years:
    unsigned long epoch = secsSince1900 - seventyYears;
    // print Unix time:
//    Serial.println(epoch);

    // print the hour, minute and second:
    Serial.println();
    Serial.print("The UTC time is ");       // UTC is the time at Greenwich Meridian (GMT)
    Serial.print((epoch  % 86400L) / 3600 + 7); // print the hour (86400 equals secs per day)
    Serial.print(':');
    if ( ((epoch % 3600) / 60) < 10 ) {
      // In the first 10 minutes of each hour, we'll want a leading '0'
      Serial.print('0');
    }
    Serial.print((epoch  % 3600) / 60); // print the minute (3600 equals secs per minute)
    Serial.print(':');
    if ( (epoch % 60) < 10 ) {
      // In the first 10 seconds of each minute, we'll want a leading '0'
      Serial.print('0');
    }
    Serial.println(epoch % 60); // print the second

    house = ((epoch % 86400L) / 3600+7);
    minute = (epoch % 3600) / 60;
    second = (epoch % 60);

//    Serial.print("House : ");
//    Serial.println(house);
//    Serial.print("Minute : ");
//    Serial.println(minute);
    
  } //end else
  // wait ten seconds before asking for the time again
  Serial.println();
  ///////////////////////////////////////////////////////////////////////NTP

  ///////////////////////////////////////////////////////////////////////EC
  // read the analog in value:
  sensorValue = analogRead(analogInPin);            
  // map it to the range of the analog out:
  outputValue = map(sensorValue, 0, 1023, 0, 5000);  
  // change the analog out value:
  analogWrite(analogOutPin, outputValue);           

  // print the results to the serial monitor:
  Serial.print("EC value = " );                       
  Serial.print(sensorValue);      
//  Serial.print("\t output = ");      
//  Serial.println(analogRead(1)* 5.00 / 1024, 2);
    
//  pH = chat.readString();  // อ่าน Serial และนำไปเก็บในตัวแปร A
//  Serial.println(pH);
  Serial.println();
  ///////////////////////////////////////////////////////////////////////EC

  ///////////////////////////////////////////////////////////////////////pH
  pH = chat.readString();  // อ่าน Serial และนำไปเก็บในตัวแปร A
  Serial.print("pH value : ");
  Serial.println(pH);
  ///////////////////////////////////////////////////////////////////////pH

  ///////////////////////////////////////////////////////////////////////DHT22
  float h = dht.readHumidity();
  float t = dht.readTemperature();
  float f = dht.readTemperature(true);

  if (isnan(h) || isnan(t) || isnan(f)) {
    Serial.println("Failed to read from DHT Sensor");
    return;
  }

  float hif = dht.computeHeatIndex(f, h);
  float hic = dht.computeHeatIndex(t, h, false);

  Serial.print("Humidity : ");
  Serial.print(h);
  Serial.print(" %\t");
  Serial.print("Temperature : ");
  Serial.print(t);
  Serial.println(" *C");

  microgear.publish("/Humidity", h);
  microgear.publish("/Temperature", t);
  microgear.publish("/EC", sensorValue);
  microgear.publish("/pH", pH);

//    digitalWrite(GR1, HIGH);
//    delay(5000);
//    digitalWrite(GR1, LOW);
//    delay(5000);
  if(t>=27.00 || h>=70.00){
    digitalWrite(fan, LOW);
    Serial.println("Status fan : ON");
    
  }else if(t<27.00 || h<70.00){
    digitalWrite(fan, HIGH);
    Serial.println("Status fan : OFF");
  }
  ///////////////////////////////////////////////////////////////////////DHT22

  ///////////////////////////////////////////////////////////////////////UP Google

  if(house == 30 && minute == 10 && second < 16 || house == 12 && minute == 10 && second < 16 || house == 18 && minute == 10 && second < 16 || house == 24 && minute == 10 && second < 16){

  countUp++;  
  Serial.print("----------------------> count : ");  
  Serial.println(countUp); 
  
    if(countUp == 1){
      WiFiClient client;  //Instantiate WiFi object

      //Start or API service using our WiFi Client through PushingBox
      if (client.connect(WEBSITE, 80)){ 
           client.print("GET /pushingbox?devid=" + devid
         + "&h="            + (String) h
         + "&t="            + (String) t
         + "&sensorValue="  + (String) sensorValue
         + "&pH="           + (String) pH
           );
  
        client.println(" HTTP/1.1"); 
        client.print("Host: ");
        client.println(WEBSITE);
        client.println("User-Agent: ESP8266/1.0");
        client.println("Connection: close");
        client.println();
        Serial.println("----------------------> Google UP");
      } //end if
    }//if countUp
  }else if(minute == 11){
    countUp = 0;
   }//else if timeUp
  ///////////////////////////////////////////////////////////////////////UP Google
  
  //delay(10000);
}//end loop

// send an NTP request to the time server at the given address
unsigned long sendNTPpacket(IPAddress& address){
//  Serial.println("sending NTP packet...");
  // set all bytes in the buffer to 0
  memset(packetBuffer, 0, NTP_PACKET_SIZE);
  // Initialize values needed to form NTP request
  // (see URL above for details on the packets)
  packetBuffer[0] = 0b11100011;   // LI, Version, Mode
  packetBuffer[1] = 0;     // Stratum, or type of clock
  packetBuffer[2] = 6;     // Polling Interval
  packetBuffer[3] = 0xEC;  // Peer Clock Precision
  // 8 bytes of zero for Root Delay & Root Dispersion
  packetBuffer[12]  = 49;
  packetBuffer[13]  = 0x4E;
  packetBuffer[14]  = 49;
  packetBuffer[15]  = 52;

  // all NTP fields have been given values, now
  // you can send a packet requesting a timestamp:
  udp.beginPacket(address, 123); //NTP requests are to port 123
  udp.write(packetBuffer, NTP_PACKET_SIZE);
  udp.endPacket();
} //sendNTPpacket

void onMsghandler(char *topic, uint8_t* msg, unsigned int msglen){
  
  Serial.print("Incoming message --> ");
  Serial.print(topic);
  Serial.print(" : ");
  char strState[msglen];
  for (int i = 0; i < msglen; i++){
    strState[i] = (char)msg[i];
    Serial.print((char)msg[i]);
  }
  Serial.println();

  float h = dht.readHumidity();
  float t = dht.readTemperature();
  float f = dht.readTemperature(true);

  if (isnan(h) || isnan(t) || isnan(f)) {
    Serial.println("Failed to read from DHT Sensor");
    return;
  }

  float hif = dht.computeHeatIndex(f, h);
  float hic = dht.computeHeatIndex(t, h, false);

  String stateStr = String(strState).substring(0, msglen);

  if(stateStr == "ON"){
    digitalWrite(ledPin, LOW);
    microgear.chat(TargetWeb, "ON");
    
    WiFiClient client;  //Instantiate WiFi object

    //Start or API service using our WiFi Client through PushingBox
    if (client.connect(WEBSITE, 80)){ 
         client.print("GET /pushingbox?devid=" + devid
       + "&h="            + (String) h
       + "&t="            + (String) t
       + "&sensorValue="  + (String) sensorValue
       + "&pH="           + (String) pH
         );

      client.println(" HTTP/1.1"); 
      client.print("Host: ");
      client.println(WEBSITE);
      client.println("User-Agent: ESP8266/1.0");
      client.println("Connection: close");
      client.println();
      }
    Serial.println("-------------------------------------------------");
  } 
  else if (stateStr == "OFF"){
    digitalWrite(ledPin, HIGH);
    microgear.chat(TargetWeb, "OFF");
    Serial.println("-------------------------------------------------");
  }
}

void onConnected(char *attribute, uint8_t* msg, unsigned int msglen){
  Serial.println("Connected to NETPIE...");
  microgear.setAlias(ALIAS);
}
