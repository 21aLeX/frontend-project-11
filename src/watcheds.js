import onChange from 'on-change';

const watchedState = (state, render) => {
  const watched = onChange(state, render); // теперь конечно в 10 раз проще стало(
  return watched;
};
export default watchedState;
