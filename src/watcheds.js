import onChange from 'on-change';

const watchedState = (state, value, render) => {
  const watchedStates = onChange(state, render);
  if (value === 'valid' || value === 'invalid') {
    watchedStates.isValid = value;
  } else {
    watchedStates.listRSS.push(value);
  }
};
export default watchedState;
