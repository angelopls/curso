// socket.js

import openSocket from 'socket.io-client';

const url = import.meta.env.VITE_WASERVER_URL;

const socket = openSocket(url);

export default socket;
