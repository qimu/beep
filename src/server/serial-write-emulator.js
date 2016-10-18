
var SerialPort = require("serialport");
var port = new SerialPort("COM4", {
  baudRate: 9600
});
var chance = require('chance')();

// write a string every second
port.on('open', function() {
  console.log('Opened port. Going to send example data.');

  setInterval(function() {
    //var integer = chance.integer({min:0, max: 300});

    var string = "☻1(  12360    00"

    port.write(string);
    console.log('wrote', string);
  }, 1000)

});
