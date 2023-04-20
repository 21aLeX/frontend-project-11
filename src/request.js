import axios from 'axios';
import parser from './parser.js';

export default (url) => axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${url}`)
  .then((response) => parser(response.data.contents))
  .then((doc) => {
    if (doc.querySelector('parsererror')) {
      throw new Error('rss');
    } return doc;
  })
  .catch((error) => {
    let { message } = error;
    if (message === 'Network Error') {
      message = 'network';
    }
    throw new Error(message);
  });
