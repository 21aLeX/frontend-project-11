import onChange from 'on-change';

const watchedState = (state, values, render) => {
  const watched = onChange(state, render);
  const [valid, posts, url, fid] = values;
  if (valid) {
    watched.isValid = valid;
    if (valid === 'valid' || posts) {
      state.listRSS.push(url);
      watched.fids.push(fid);
    }
  }
  if (posts) {
    watched.posts[url] = Object.assign(watched.posts[url] ?? {}, posts);
  }
};
export default watchedState;
