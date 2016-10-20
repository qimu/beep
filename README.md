# Serial-beep

## Video Demo

[![Video Demo](http://img.youtube.com/vi/HgL_dYE1fHA/0.jpg)](http://www.youtube.com/watch?v=HgL_dYE1fHA)

## Intro

beep when a truck is on a scale that connects to a computer via serial port

## Features

* Beep every 5 seconds (hard-coded)
* Trigger the beep is the weight detected is above 500 pounds (hard-coded).
* Won't beep when no truck is on the scale
* Show current weight on a nice UI
* Show truck on or off images to indicate the status
* Works on Both macOS and Windows
* Have a emulator for emulating data from the real equipment without connecting to it (src/server/serial-write-emulator.js)

## Technology Used

Node.js and React.js

## Infrastructure

The Node.js opened the serial port and read data via event. Each time, it gets the data, which is a string, it parses out the weight, in pounds, and send this number to the React.js app in the browser via socket.io. Beeping and changing the truck image is handled in the React.js app.

## Customize it

To change to your desired port, open src/server/server.js, and change PORT_ON_MAC or PORT_ON_WIN, depend on your system.

## How to start

Node.js and npm have to be installed on your system.

Run:  
```
npm install
npm install nodemon -g
npm run webpack
npm run start
```
Check your http://localhost:3000/ or  `open http://localhost:3000/`

## Run the Node.js Server as a Service Under Windows

Run:
```
npm install -g node-windows
npm link node-windows
cd src\utilities
node install-service
```

To remove the service, run:

```
cd src\utilities
node uninstall-service
```

## Suggestion

This project can be used as a demo for using node-serial library and socket.io library together in node.js.

## Testing without Real Equipment Connected

Create a pair of virtual serial port (technically, called null-modem), so one data inputted into one port is outputted from another.

### For Mac:

Run virtual ports:
```
brew install socat
npm run mac-null-modem
```
Run write emulator:
```
npm run write-emulator
```
Run server:
```
npm run start
```

You may need to change ports in code to fit your configuration.

### For Windows:

Use [com0com](https://code.google.com/archive/p/powersdr-iq/downloads)

Then use the write-emulator to write data into one virtual port, the other port will get data.
