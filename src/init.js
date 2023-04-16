import * as yup from 'yup';
// import keyBy from 'lodash/keyBy.js';
// import isEmpty from 'lodash/isEmpty.js';
import form from './form.js';
import body from './body.js';
import watchedState from './watcheds.js';

export default function init() {
  const state = {
    listRSS: [],
    isValid: 'valid',
  };
  const schema = yup.object().shape({
    url: yup.string().url(),
  });
  const render = (path, value) => {
    const inputUrl = document.querySelector('[name=url]');
    if (value === 'invalid') {
      inputUrl.classList.add('is-invalid');
    } else {
      const forma = document.querySelector('form');
      inputUrl.classList.remove('is-invalid');
      forma.reset();
      inputUrl.focus();
    }
  };

  const forma = form();
  forma.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const inputUrl = data.get('url');
    console.log(state);
    schema.validate({ url: inputUrl }, { abortEarly: false })
      .then(() => {
        if (state.listRSS.includes(inputUrl)) {
          throw new Error();
        }
        watchedState(state, 'valid', render);
        watchedState(state, inputUrl, render);
      })
      .catch(() => watchedState(state, 'invalid', render));
  });
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
  div1.append(h1);
  const p = document.createElement('p');
  p.classList.add('lead');
  p.textContent = 'Начните читать RSS сегодня! Это легко, это красиво.';
  div1.append(p);
  div1.append(forma);
  const p1 = document.createElement('p');
  p1.classList.add('mt-2', 'mb-0', 'text-muted');
  p1.textContent = 'Пример: https://ru.hexlet.io/lessons.rss';
  div1.append(p1);
  element.append(body());
}
