import axios from 'axios';
import { io } from 'socket.io-client';

const baseURL = 'http://localhost:5000';

export const API = axios.create({ baseURL: `${baseURL}/api/v1/` });
export const setAuthToken = ({ token }) => {
  if (token) {
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common['Authorization'];
  }
};

export const configJson = {
  'Content-Type': 'application/json',
};

export const configFormData = {
  'Content-Type': 'multipart/form-data',
};

export const connectSocketIO = ({ token }) =>
  io.connect(baseURL, {
    transports: ['websocket'],
    query: { token },
  });

export const loadNotifications = ({ socket }) =>
  socket.current.emit('load-notifications');

export const sendNotifications = ({ socket }) =>
  socket.current.emit('send-notifications');

export const listenNotifications = ({ socket, cb }) => {
  socket.current.on('new-notifications', (data) => cb(data));
};
