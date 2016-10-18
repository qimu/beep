// install the node server as the windows service

require('babel-core/register');

var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name:'serial-beep',
  description: 'The program connects to a serial port and read data from a scale, and allow http://localhost:3000 to see the program.',
  script: 'src/utilities/index.js'
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});

svc.install();
