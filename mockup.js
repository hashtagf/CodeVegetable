var MicroGear = require('microgear');

const APPID  = 'smarth';
const KEY    = '2CnqbZKz85LXoRg';
const SECRET = 'aZFoGTdCVtzth1f9OXxV5N63R';

var microgear = MicroGear.create({
    key : KEY,
    secret : SECRET
});

microgear.on('connected', function() {
    console.log('Connected...');
    microgear.setAlias("mygear");
    setInterval(function() {
        microgear.publish("/Temperature",''+(23.5 + Math.random() * 2),true);
        microgear.publish("/Humidity",''+(56  + Math.random() * 2),true);
        microgear.publish("/TemperatureOut",''+(24.5 + Math.random() * 2),true);
        microgear.publish("/HumidityOut",''+(58 + Math.random() * 2),true);
        microgear.publish("/EC",''+(15 + parseInt(Math.random() * 3)),true);
        microgear.publish("/pH",''+(7.1 + Math.random() * 0.5),true);
    },10000);
});

microgear.on('message', function(topic,body) {
    console.log('incoming : '+topic+' : '+body);
});

microgear.on('closed', function() {
    console.log('Closed...');
});

microgear.connect(APPID);