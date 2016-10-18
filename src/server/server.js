import path from 'path';
import express from 'express';

var bodyParser = require('body-parser');

var app = express();
var server;

// express app

const PATH_STYLES = path.resolve(__dirname, '../client/styles');
const PATH_DIST = path.resolve(__dirname, '../../dist');
const SOUNDS_DIST = path.resolve(__dirname, '../../sounds');

app.use('/styles', express.static(PATH_STYLES));
app.use('/sounds', express.static(SOUNDS_DIST));

app.use(express.static(PATH_DIST));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/index.html'));
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

// socket.io

var http = require('http').Server(app);
var io = require('socket.io')(http);

// mostly testing
var chance = require('chance')();
io.on('connection', function(socket) {
  console.log('The browser is connected on socket.io');
})


// receiving data on serial port

var SerialPort = require("serialport");
var port = new SerialPort("COM3", {
  baudRate: 9600
});

port.on('open', function() {
  console.log('Serial Port Opened, ready to receive data.');
});

port.on('error', function(err) {
  console.log('Error: ', err.message);
});

port.on('data', function(data) {
  var dataString = data.toString('utf-8');

  console.log("\n========================");
  console.log('received data from scale:');
  console.log(dataString);

  // receivies something like "☻1   22520    00"
  // parse it
  var elements = dataString.split("  ");
  var mainWeightString = elements[elements.length - 3];
  var mainWeight = parseInt(mainWeightString);
  console.log(`parsed out main weight is ${mainWeight}. Will send to browser.`);
  console.log("=======================");

  // when data is received on serial port, send it to the browser
  io.emit('newWeight', mainWeight);
});

// start the http server
http.listen(3000, function(){
  console.log('listening on *:3000');
});
