var express = require('express')
var PyhonShell = require('python-shell')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')

var Schema = mongoose.Schema
var thingSchema = new Schema({}, { strict: false })
var DateEat = mongoose.model('SmartFarm', thingSchema)

var Schema2 = mongoose.Schema
var thingSchema2 = new Schema2({}, { strict: false })
var eventbtn = mongoose.model('event', thingSchema2)

var Schema3 = mongoose.Schema
var thingSchema3 = new Schema3({}, { strict: false })
var evenhole = mongoose.model('typehole', thingSchema3)

var Schema4 = mongoose.Schema
var thingSchema4 = new Schema4({}, { strict: false })
var evensys = mongoose.model('btnsys', thingSchema4)


var app = express()

mongoose.connect('mongodb://localhost:27017/farm')

app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/ledOn', function (req, res, next) {
  PyhonShell.run('ledOn.py', function (err) {
    if (err) { res.send(err) }
    else res.send({ message: 'done' })
  })
})

app.get('/ledOff', function (req, res, next) {
  PyhonShell.run('ledOff.py', function (err) {
    if (err) { res.send(err) }
    else res.send({ message: 'done' })
  })
})

app.get('/pumpOn', function (req, res, next) {
  PyhonShell.run('pumpOn.py', function (err) {
    if (err) { res.send(err) }
    else res.send({ message: 'done' })
  })
})

app.get('/pumpOff', function (req, res, next) {
  PyhonShell.run('pumpOff.py', function (err) {
    if (err) { res.send(err) }
    else res.send({ message: 'done' })
  })
})

app.get('/fogOn', function (req, res, next) {
  PyhonShell.run('fogOn.py', function (err) {
    if (err) { res.send(err) }
    else res.send({ message: 'done' })
  })
})

app.get('/fogOff', function (req, res, next) {
  PyhonShell.run('fogOff.py', function (err) {
    if (err) { res.send(err) }
    else res.send({ message: 'done' })
  })
})

app.get('/waterOn', function (req, res, next) {
  PyhonShell.run('waterOn.py', function (err) {
    if (err) { res.send(err) }
    else res.send({ message: 'done' })
  })
})

app.get('/waterOff', function (req, res, next) {
  PyhonShell.run('waterOff.py', function (err) {
    if (err) { res.send(err) }
    else res.send({ message: 'done' })
  })
})

app.get('/takeCam', function (req, res, next) {
  PyhonShell.run('takeCam.py', function (err) {
    if (err) { res.send(err) }
    else res.send({ message: 'done' })
  })
})

//////////////////////////////////////////////////////////////////////////////////////date
app.post('/dateend', function (req, res) {
  var obj = new DateEat(req.body)
  obj.save(function (err, obj) {
    if (err) {
      return (res.send(err))
    } else {
      return (res.send('done'))
    }
  })
})

app.get('/dateend', function (req, res) {
  DateEat.find({})
    .exec(function (err, done) {
      if (err) console.log(err)
      res.send(done)
    })
})

app.put('/dateend/:id', function (req, res) {
  DateEat.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { end: req.body.end, hole: req.body.hole, status: req.body.status } },
    { new: true })
    .exec(function (err, done) {
      if (err) console.log(err)
      res.send(done)
    })
})

//////////////////////////////////////////////////////////////////////////////////////date

//////////////////////////////////////////////////////////////////////////////////////vegetable
app.post('/hole', function (req, res) {
  var objhole = new evenhole(req.body)
  objhole.save(function (err, obj) {
    if (err) {
      return (res.send(err))
    } else {
      return (res.send('done'))
    }
  })
})

app.get('/hole', function (req, res) {
  evenhole.find({})
    .exec(function (err, done) {
      if (err) console.log(err)
      res.send(done)
    })
})

app.put('/hole/:id', function (req, res) {
  evenhole.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { idhole: req.body.idhole, statushole: req.body.statushole, nameveg: req.body.nameveg, typeveg: req.body.typeveg } },
    { new: true })
    .exec(function (err, done) {
      if (err) console.log(err)
      res.send(done)
    })
})

//////////////////////////////////////////////////////////////////////////////////////vegetable

//////////////////////////////////////////////////////////////////////////////////////btn
app.post('/btn', function (req, res) {
  var objbtn = new eventbtn(req.body)
  objbtn.save(function (err, obj) {
    if (err) {
      return (res.send(err))
    } else {
      return (res.send('done'))
    }
  })
})

app.get('/btn', function (req, res) {
  eventbtn.find({})
    .exec(function (err, done) {
      if (err) console.log(err)
      res.send(done)
    })
})

app.put('/btn/:id', function (req, res) {
  eventbtn.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { btnnum: req.body.btnnum, statusbtn: req.body.statusbtn } },
    { new: true })
    .exec(function (err, done) {
      if (err) console.log(err)
      res.send(done)
    })
})
//////////////////////////////////////////////////////////////////////////////////////btn

//////////////////////////////////////////////////////////////////////////////////////btn
app.post('/setsys', function (req, res) {
  var objsys = new evensys(req.body)
  objsys.save(function (err, obj) {
    if (err) {
      return (res.send(err))
    } else {
      return (res.send('done'))
    }
  })
})

app.get('/setsys', function (req, res) {
  evensys.find({})
    .exec(function (err, done) {
      if (err) console.log(err)
      res.send(done)
    })
})

app.put('/setsys/:id', function (req, res) {
  evensys.findOneAndUpdate(
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
    { new: true })
    .exec(function (err, done) {
      if (err) console.log(err)
      res.send(done)
    })
})

//////////////////////////////////////////////////////////////////////////////////////btn

app.listen(3000)
console.log('running on port 3000.')