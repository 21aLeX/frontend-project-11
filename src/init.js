import * as yup from 'yup';
import i18n from 'i18next';
import resources from './locales/index.js';
import form from './form.js';
import body from './body.js';
import watchedState from './watcheds.js';

const state = {
  listRSS: [],
  isValid: null,
  lng: 'ru',
};
i18n.init({
  lng: state.lng,
  resources,
});
const schema = yup.object().shape({
  url: yup.string().url(),
});
const renderValid = (path, value) => {
  console.log(value);
  const inputUrl = document.querySelector('[name=url]');
  const forma = document.querySelector('form');
  const p = forma.parentNode.lastChild;
  p.textContent = i18n.t(value);
  if (value === 'valid') {
    inputUrl.classList.remove('is-invalid');
    forma.reset();
    inputUrl.focus();
    p.classList.remove('text-danger');
    p.classList.add('text-success');
  } else {
    p.classList.remove('text-success');
    p.classList.add('text-danger');
    inputUrl.classList.add('is-invalid');
  }
};
const formEvent = (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const inputUrl = data.get('url');
  schema.validate({ url: inputUrl }, { abortEarly: false })
    .then(() => {
      if (state.listRSS.includes(inputUrl)) {
        watchedState(state, 'include', renderValid);
        throw new Error('include');
      }
      watchedState(state, 'valid', renderValid);
      state.listRSS.push(inputUrl);
    })
    .catch((error) => {
      let { message } = error;
      if (error.message === 'url must be a valid URL') {
        message = 'invalid';
      }
      watchedState(state, message, renderValid);
    });
};
export default function init() {
  const forma = form();
  forma.addEventListener('submit', formEvent);
  const element = document.body;
  const section = document.createElement('section');
  section.classList.add('container-fluid', 'bg-dark', 'p-5');
  element.append(section);
  const div = document.createElement('div');
  div.classList.add('row');
  section.append(div);
  const div1 = document.createElement('div');
  div1.classList.add('col-md-10', 'col-lg-8', 'mx-auto', 'text-white');
  div.append(div1);
  const h1 = document.createElement('h1');
  h1.classList.add('display-3', 'mb-0');
  h1.textContent = 'RSS агрегатор';
  const p = document.createElement('p');
  p.classList.add('lead');
  p.textContent = 'Начните читать RSS сегодня! Это легко, это красиво.';
  const p1 = document.createElement('p');
  p1.classList.add('mt-2', 'mb-0', 'text-muted');
  p1.textContent = 'Пример: https://ru.hexlet.io/lessons.rss';
  const p2 = document.createElement('p');
  p2.classList.add('feedback', 'm-0', 'position-absolute', 'small', 'text-danger');
  div1.append(h1, p, forma, p1, p2);
  element.append(body());
}
