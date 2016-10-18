
var SerialPort = require("serialport");
var port = new SerialPort("COM4", {
  baudRate: 9600
});
var chance = require('chance')();

// write a string every second
port.on('open', function() {
  console.log('Opened port. Going to send example data.');

  setInterval(function() {
    var integer = chance.integer({min:0, max: 300});
    var string = integer.toString();
    var end = String.fromCharCode(170);
    var whole = string + end;
    port.write(string + end);
    console.log('wrote', integer);
  }, 1000)

});
