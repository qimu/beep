// Libs
import React from 'react';
import { render } from 'react-dom';

// CSS
import '../../app/css/style.css';

// Components
import App from '../../app/App';

// socket
var socket = require('socket.io-client')('http://localhost:3000');
socket.on('connect', function(){
  console.log('Socket.io connected to server');
});

// Render
render(
  <App socket={socket}/>,
  document.getElementById('root')
);
