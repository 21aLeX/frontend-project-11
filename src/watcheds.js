import onChange from 'on-change';

const watchedState = (state, values, render) => {
  const watched = onChange(state, render);
  const {
    valid, posts, url, fid, idClick, modal,
  } = values;
  if (valid) {
    watched.isValid = valid;
    if (valid === 'valid' || posts) {
      state.listRSS.push(url);
      watched.fids = [...fid];
    }
  }
  if (posts) {
    watched.posts = { ...state.posts };
  }
  if (idClick) {
    watched.stateUi.push(idClick);
  }
  if (modal) {
    watched.modal = modal;
  }
};
export default watchedState;
