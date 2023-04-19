import axios from 'axios';
import parser from './parser.js';
import {
  watchedRSS, watchedValid, watchedFid, watchedPosts,
} from './watcheds.js';

const cutObjPost = (items, idFid) => {
  const result = [];
  items.forEach((item) => {
    const obj = {
      id: result.length + 1,
      idFid,
      title: item.querySelector('title').textContent,
      link: item.querySelector('link').textContent,
    };
    result.push(obj);
  });
  return result;
};
export default (state, url, renderValid, renderRss, renderFids, renderPosts) => axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${url}`)
  .then((response) => parser(response.data.contents))
  .then((doc) => {
    if (doc.querySelector('parsererror')) {
      throw new Error('rss');
    }
    watchedRSS(state, url, renderRss);
    watchedValid(state, 'valid', renderValid);
    const objFid = {
      id: state.listRSS.length,
      title: doc.querySelector('title').textContent,
      description: doc.querySelector('description').textContent,
    };
    watchedFid(state, objFid, renderFids);
    const posts = cutObjPost(doc.querySelectorAll('item'), state.listRSS.length);
    watchedPosts(state, posts, renderPosts);
  })
  .catch((error) => {
    let { message } = error;
    if (message === 'Network Error') {
      message = 'network';
    }
    throw new Error(message);
  });
