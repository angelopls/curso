import io from 'socket.io-client';

const url = import.meta.env.VITE_WASERVER_URL;

const socket = io('https://server.meuwa.top');

console.log(socket);

export default function createWebSocketPlugin() {
  return (store) => {
    socket.on('message', (data) => {
      console.log(data);
      store.dispatch('testeStore');
    });
    socket.on('qr', (data) => {
      console.log(data);
      store.dispatch('testeStore');
    });
  };
}
