import formationObjectFeedPosts from './formationObjectFeedPosts.js';

export default (xmlStr, index) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlStr, 'text/xml');
  if (doc.querySelector('parsererror')) {
    throw new Error('rss');
  }
  return formationObjectFeedPosts(doc, index);
};
