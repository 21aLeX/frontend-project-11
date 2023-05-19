import axios from 'axios';
import parser from './parser.js';

export default (url, index) => axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${url}`)
  .then((response) => parser(response.data.contents, index))
  .then((data) => data)
  .catch((error) => {
    let { message } = error;
    if (message === 'Network Error') {
      message = 'network';
    }
    throw new Error(message);
  });
