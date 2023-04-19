import onChange from 'on-change';

const watchedValid = (state, value, render) => {
  const watched = onChange(state, render);
  watched.isValid = value;
};
const watchedRSS = (state, value, render) => {
  const watched = onChange(state, render);
  watched.listRSS.push(value);
};
const watchedFid = (state, value, render) => {
  const watched = onChange(state, render);
  watched.fids.push(value);
};
const watchedPosts = (state, value, render) => {
  const watched = onChange(state, render);
  watched.posts.push(value);
};
export {
  watchedValid, watchedRSS, watchedFid, watchedPosts,
};
