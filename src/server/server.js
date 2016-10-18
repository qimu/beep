import path from 'path';
import express from 'express';

var bodyParser = require('body-parser');

var app = express();
var server;

// express app

const PATH_STYLES = path.resolve(__dirname, '../client/styles');
const PATH_DIST = path.resolve(__dirname, '../../dist');

app.use('/styles', express.static(PATH_STYLES));
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

io.on('connection', function(socket) {
  console.log('The browser is connected on socket.io');
})

// receiving data on serial port

var SerialPort = require("serialport");
var port = new SerialPort("COM3", {
  baudRate: 57600,
  parser: SerialPort.parsers.readline(String.fromCharCode(170))
});

port.on('open', function() {
  console.log('Serial Port Opened, ready to receive data.');
});

port.on('error', function(err) {
  console.log('Error: ', err.message);
});

port.on('data', function(data) {
  console.log(data);

  // when data is received on serial port, send it to the browser
  //io.emit('newWeight', integer);
});

// start the http server
http.listen(3000, function(){
  console.log('listening on *:3000');
});
