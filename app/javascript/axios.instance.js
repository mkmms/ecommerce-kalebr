import axios from 'axios';

const tokenField = typeof(document) != "undefined" ? document.querySelector('meta[name="csrf-token"]') : {};
const token = tokenField ? tokenField.content : ""

const instance = axios.create({
  baseURL: '/',
  headers: {
    'X-CSRF-Token': token
  },
  responseType: 'json'
});

export default instance;