
var SerialPort = require("serialport");
var port = new SerialPort("COM4", {
  baudRate: 9600
});

// write a string every second
port.on('open', function() {
  console.log('Opened port. Going to send example data.');

  setInterval(function() {
    var string = "☻1(  0123123    00"
    port.write(string);
    console.log('wrote', string);
  }, 1000)

});
