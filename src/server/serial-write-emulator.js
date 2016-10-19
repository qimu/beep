const PORT_ON_MAC = "/dev/ttys001";
const PORT_ON_WIN = "COM6";


var SerialPort = require("serialport");
var serialport = process.platform == "win32" ? PORT_ON_WIN : PORT_ON_MAC
var port = new SerialPort(serialport, {
  baudRate: 9600
});

// write a string every second
port.on('open', function() {
  console.log('Opened port. Going to send example data.');

  setInterval(function() {
    var weight1 = 29680;
    var weight2 = 0;
    var string = `☻1(  ${weight2}    00`;
    port.write(string);
    console.log(`emulator wrote from serialport ${serialport}: ${string}`);
  }, 1000)

});
