var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var MicroGear = require("microgear");
const admin = require("firebase-admin");
const functions = require("firebase-functions");
const { google } = require("googleapis");
const axios = require("axios");

const MESSAGING_SCOPE = "https://www.googleapis.com/auth/firebase.messaging";
const SCOPES = [MESSAGING_SCOPE];

const serviceAccount = require("./smartfarm-noti-firebase-adminsdk-h3gkr-da5eef9be1.json");
const databaseURL = "https://smartfarm-noti.firebaseio.com";
const URL =
  "https://fcm.googleapis.com/v1/projects/smartfarm-noti/messages:send";

var Schema = mongoose.Schema;
var thingSchema = new Schema({}, { strict: false });
var DateEat = mongoose.model("smartfarm", thingSchema);

var Schema2 = mongoose.Schema;
var thingSchema2 = new Schema2({}, { strict: false });
var eventbtn = mongoose.model("event", thingSchema2);

var Schema3 = mongoose.Schema;
var thingSchema3 = new Schema3({}, { strict: false });
var evenhole = mongoose.model("typehole", thingSchema3);

var Schema4 = mongoose.Schema;
var thingSchema4 = new Schema4({}, { strict: false });
var evensys = mongoose.model("btnsys", thingSchema4);

const APPID = "Vegetable001";
const KEY = "xOWBLi8n4B7rjLi";
const SECRET = "Y5HSsNTp1wJmtgeRhXV5wcsZx";

const ALIAS = "SERVER_API"; //  ชื่อตัวเอง

var microgear = MicroGear.create({
  key: KEY,
  secret: SECRET,
  alias: ALIAS
});

microgear.on("connected", function() {
  microgear.setAlias(ALIAS);
  microgear.subscribe("/#");
  console.log("connect NETPIE");
});

microgear.on("present", function(event) {
  console.log(event);
});

microgear.on("absent", function(event) {
  console.log(event);
});

microgear.resettoken(function(err) {
  microgear.connect(APPID);
});

var app = express();
// mongoose.connect('mongodb://localhost:27017/farm')
mongoose.connect("mongodb://smartfarm:farm1234@ds053678.mlab.com:53678/farm");

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: databaseURL
});

const db = admin.firestore();
let deviceToken = [];
db.collection("token")
  .get()
  .then(snapshot => {
    snapshot.forEach(doc => {
      init(doc.id);
    });
  })
  .catch(err => {
    console.log("Error getting documents", err);
  });

// const deviceToken =
//   "cnq6vJ-Kv5w:APA91bFdvMSN8Lfpn9tVfCPJpmmmPOvas7l4RefAk3fAO-QYDLmcDtarpRyhaln6l4s7V7HWSpO8NG_tlaT14yBRzC5BCpxU5whMp7gbmyJ2luWcLnOHcTIdgRm8Cgc-AP6ZGGmzzQAu";

function getAccessToken() {
  return new Promise(function(resolve, reject) {
    var key = serviceAccount;
    var jwtClient = new google.auth.JWT(
      key.client_email,
      null,
      key.private_key,
      SCOPES,
      null
    );
    jwtClient.authorize(function(err, tokens) {
      if (err) {
        reject(err);
        return;
      }
      resolve(tokens.access_token);
    });
  });
}

async function init(deviceToken) {
  const body = {
    message: {
      data: { key: "value" },
      notification: {
        title: "SMARTFARM-CABINET",
        body: "Notification Online"
      },
      webpush: {
        headers: {
          Urgency: "high"
        },
        notification: {
          requireInteraction: "true"
        }
      },
      token: deviceToken
    }
  };

  try {
    const accessToken = await getAccessToken();
    console.log("accessToken: ", accessToken);
    const { data } = await axios.post(URL, JSON.stringify(body), {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      }
    });
    console.log("name: ", data.name);
  } catch (err) {
    console.log("err: ", err.message);
  }
}

async function sendNotification(title, text, token) {
  const body = {
    message: {
      data: { key: "value" },
      notification: {
        title: title,
        body: text
      },
      webpush: {
        headers: {
          Urgency: "high"
        },
        notification: {
          requireInteraction: "true"
        }
      },
      token: token
    }
  };

  try {
    const accessToken = await getAccessToken();
    console.log("accessToken: ", accessToken);
    const { data } = await axios.post(URL, JSON.stringify(body), {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      }
    });
    console.log("name: ", data.name);
  } catch (err) {
    console.log("err: ", err.message);
  }
}

app.get("/sendNoti/:title/:text", function(req, res, next) {
  db.collection("token")
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        sendNotification(req.params.title, req.params.text, doc.id);
      });
    })
    .catch(err => {
      console.log("Error getting documents", err);
    });
  res.status(200);
  res.send({
    status: "OK",
    msg: "testNoti"
  });
});

app.get("/ledOn", function(req, res, next) {
  microgear.chat("RaspberryPI", "lightOn");
  db.collection("token")
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        sendNotification("LED ON", "เปิดไฟ", doc.id);
      });
    })
    .catch(err => {
      console.log("Error getting documents", err);
    });
  res.status(200);
  res.send({
    status: "OK",
    msg: "lightOn"
  });
});

app.get("/ledOff", function(req, res, next) {
  microgear.chat("RaspberryPI", "lightOff");
  db.collection("token")
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        sendNotification("LED OFF", "ปิดไฟ", doc.id);
      });
    });
  res.status(200);
  res.send({
    status: "OK",
    msg: "lightOff"
  });
});

app.get("/pumpOn", function(req, res, next) {
  microgear.chat("RaspberryPI", "pumpOn");
  db.collection("token")
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        sendNotification("PUMP ON", "ปั้มน้ำกำลังทำงาน", doc.id);
      });
    });
  res.status(200);
  res.send({
    status: "OK",
    msg: "pumpOn"
  });
});

app.get("/pumpOff", function(req, res, next) {
  microgear.chat("RaspberryPI", "pumpOff");
  db.collection("token")
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        sendNotification("PUMP OFF", "ปั้มน้ำหยุดทำงาน", doc.id);
      });
    });
  res.status(200);
  res.send({
    status: "OK",
    msg: "pumpOff"
  });
});

app.get("/fogOn", function(req, res, next) {
  microgear.chat("RaspberryPI", "fogOn");
  db.collection("token")
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        sendNotification("FOG ON", "ระบบหมอกทำงาน", doc.id);
      });
    });
  res.status(200);
  res.send({
    status: "OK",
    msg: "fogOn"
  });
});

app.get("/fogOff", function(req, res, next) {
  microgear.chat("RaspberryPI", "fogOff");
  db.collection("token")
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        sendNotification("FOG OFF", "ระบบหมอกหยุดทำงาน", doc.id);
      });
    });
  res.status(200);
  res.send({
    status: "OK",
    msg: "fogOff"
  });
});

app.get("/waterOn", function(req, res, next) {
  microgear.chat("RaspberryPI", "waterOn");
  db.collection("token")
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        sendNotification("WATER ON", "เปิดใช้งานเครื่องกรองน้ำ", doc.id);
      });
    });
  res.status(200);
  res.send({
    status: "OK",
    msg: "waterOn"
  });
});

app.get("/waterOff", function(req, res, next) {
  microgear.chat("RaspberryPI", "waterOff");
  db.collection("token")
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        sendNotification("WATER OFF", "ปิดการทำงานเครื่องกรองน้ำ", doc.id);
      });
    });
  res.status(200);
  res.send({
    status: "OK",
    msg: "waterOff"
  });
});

app.get("/takeCam", function(req, res, next) {
  microgear.chat("RaspberryPI", "takeCam");
  res.status(200);
  res.send({
    status: "OK",
    msg: "takeCam"
  });
});

//////////////////////////////////////////////////////////////////////////////////////date
app.post("/dateend", function(req, res) {
  var obj = new DateEat(req.body);
  obj.save(function(err, obj) {
    if (err) {
      return res.send(err);
    } else {
      return res.send("done");
    }
  });
});

app.get("/dateend", function(req, res) {
  DateEat.find({}).exec(function(err, done) {
    if (err) console.log(err);
    res.send(done);
  });
});

app.put("/dateend/:id", function(req, res) {
  DateEat.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: { end: req.body.end, hole: req.body.hole, status: req.body.status }
    },
    { new: true }
  ).exec(function(err, done) {
    if (err) console.log(err);
    res.send(done);
  });
});

//////////////////////////////////////////////////////////////////////////////////////date

//////////////////////////////////////////////////////////////////////////////////////vegetable
app.post("/hole", function(req, res) {
  var objhole = new evenhole(req.body);
  objhole.save(function(err, obj) {
    if (err) {
      return res.send(err);
    } else {
      return res.send("done");
    }
  });
});

app.get("/hole", function(req, res) {
  evenhole.find({}).exec(function(err, done) {
    if (err) console.log(err);
    res.send(done);
  });
});

app.put("/hole/:id", function(req, res) {
  evenhole
    .findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          idhole: req.body.idhole,
          statushole: req.body.statushole,
          nameveg: req.body.nameveg,
          typeveg: req.body.typeveg,
          sizebefore: req.body.sizebefore,
          sizeafter: req.body.sizeafter
        }
      },
      { new: true }
    )
    .exec(function(err, done) {
      if (err) console.log(err);
      res.send(done);
    });
});

//////////////////////////////////////////////////////////////////////////////////////vegetable

//////////////////////////////////////////////////////////////////////////////////////btn
app.post("/btn", function(req, res) {
  var objbtn = new eventbtn(req.body);
  objbtn.save(function(err, obj) {
    if (err) {
      return res.send(err);
    } else {
      return res.send("done");
    }
  });
});

app.get("/btn", function(req, res) {
  eventbtn.find({}).exec(function(err, done) {
    if (err) console.log(err);
    res.send(done);
  });
});

app.put("/btn/:id", function(req, res) {
  eventbtn
    .findOneAndUpdate(
      { _id: req.params.id },
      { $set: { btnnum: req.body.btnnum, statusbtn: req.body.statusbtn } },
      { new: true }
    )
    .exec(function(err, done) {
      if (err) res.send(err);
      res.send(done);
    });
});
//////////////////////////////////////////////////////////////////////////////////////btn

//////////////////////////////////////////////////////////////////////////////////////btn
app.post("/setsys", function(req, res) {
  var objsys = new evensys(req.body);
  objsys.save(function(err, obj) {
    if (err) {
      return res.send(err);
    } else {
      return res.send("done");
    }
  });
});

app.get("/setsys", function(req, res) {
  evensys.find({}).exec(function(err, done) {
    if (err) console.log(err);
    res.send(done);
  });
});

app.put("/setsys/:id", function(req, res) {
  evensys
    .findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          btnsys: req.body.btnsys,
          sysbtn: req.body.sysbtn,
          stasys: req.body.stasys,
          sysTimeStart: req.body.sysTimeStart,
          sysTimeEnd: req.body.sysTimeEnd,
          sysTimeFog: req.body.sysTimeFog,
          sysTemp: req.body.sysTemp,
          sysHumi: req.body.sysHumi
        }
      },
      { new: true }
    )
    .exec(function(err, done) {
      if (err) console.log(err);
      res.send(done);
      microgear.chat("RaspberryPI", "btnupdate");
    });
});

//////////////////////////////////////////////////////////////////////////////////////btn
const port = process.env.PORT || 4000;
app.listen(port);
console.log("running on port" + port);
