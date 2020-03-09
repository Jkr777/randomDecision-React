import axios from 'axios';

export function setTokenHeader(token) {
  if(token) {
    axios.defaults.headers.common["x-auth"] = `${token}`; 
  } else {
    delete axios.defaults.headers.common["x-auth"];
  }
};