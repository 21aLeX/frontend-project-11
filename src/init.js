import * as yup from 'yup';
import i18n from 'i18next';
import resources from './locales/index.js';
import form from './form.js';
import body from './body.js';
import watchedState from './watcheds.js';
import request from './request.js';
import cutObj from './cutObj.js';
import renderValid from './renders/renderValid.js';
import renderPosts from './renders/renderPosts.js';
import renderFids from './renders/renderFids.js';
import renderUi from './renders/renderUi.js';
import getModal from './modal.js';
import renderModal from './renders/renderModal.js';

// если что я пыталась сократить количество кода в функциях(до 25 строк)
//  чтоб значек кодклимейта был зелененький
const state = {
  listRSS: [],
  fids: [],
  posts: {},
  isValid: null,
  lng: 'ru',
  stateUi: [],
  modal: false,
};
i18n.init({
  lng: state.lng,
  resources,
});
yup.setLocale({
  mixed: {
    required: { valid: 'required' },
  },
  string: {
    url: { valid: 'invalid' },
  },
});
const schema = yup.object().shape({
  url: yup.string().required().url(),
});
// render
// рендеры разнесла по разным файлам по тойже причине и для читаемости
const render = (path, value) => {
  switch (path) {
    case ('isValid'):
      renderValid(value, i18n);
      break;
    case ('fids'):
      renderFids(value, i18n);
      break;
    case ('stateUi'):
      renderUi(value);
      break;
    case ('modal'):
      renderModal(value, i18n);
      break;
    default:
      renderPosts(value, i18n, state, render);
  }
};
const update = () => {
  setTimeout(() => {
    state.listRSS.forEach((url) => {
      request(url)
        .then((doc) => {
          const idFid = state.listRSS.length;
          const idPosts = state.posts.length;
          const [, posts] = cutObj(doc, idFid, idPosts);
          const notContained = {};
          const keys = Object.keys(posts);
          keys.forEach((key) => {
            if (!state.posts[url][key]) {
              notContained[key] = posts[key];
            }
          });
          state.posts[url] = { ...(state.posts[url] ?? {}), ...notContained };
          watchedState(state, { posts: state.posts, url }, render);
        })
        .catch(() => { });
    });
    update();
  }, 5000);
};
const formEvent = (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const inputUrl = data.get('url');
  schema.validate({ url: inputUrl }, { abortEarly: false })
    .then(() => {
      if (state.listRSS.includes(inputUrl)) {
        throw new Error('include');
      }
      watchedState(state, { valid: 'initialization' }, render);
      return request(inputUrl).then((doc) => {
        const idFid = state.listRSS.length;
        const [fid, posts] = cutObj(doc, idFid, inputUrl);
        state.fids.push(fid);
        state.posts[inputUrl] = { ...(state.posts[inputUrl] ?? {}), ...posts };
        watchedState(state, {
          valid: 'valid', posts: state.posts, url: inputUrl, fid: state.fids,
        }, render);
      });
    })
    .catch((error) => {
      const objParam = error.errors ? error.errors[0] : { valid: error.message };
      watchedState(state, objParam, render);
    });
};
const getHeader = () => {
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
  return [h1, p, p1, p2];
};
update();
export default function init() {
  const forma = form();
  forma.addEventListener('submit', formEvent);
  const element = document.body;
  element.insertAdjacentHTML('afterbegin', getModal());
  const section = document.createElement('section');
  section.classList.add('container-fluid', 'bg-dark', 'p-5');
  element.append(section);
  const div = document.createElement('div');
  div.classList.add('row');
  section.append(div);
  const div1 = document.createElement('div');
  div1.classList.add('col-md-10', 'col-lg-8', 'mx-auto', 'text-white');
  div.append(div1);
  const [h1, p, p1, p2] = getHeader();
  div1.append(h1, p, forma, p1, p2);
  element.append(body());
}
