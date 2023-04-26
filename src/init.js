import * as yup from 'yup';
import i18n from 'i18next';
import resources from './locales/index.js';
import form from './renders/form.js';
import body from './renders/body.js';
import watchedState from './watcheds.js';
import request from './request.js';
import cutObj from './cutObj.js';
import renderValid from './renders/renderValid.js';
import renderPosts from './renders/renderPosts.js';
import renderFids from './renders/renderFids.js';
import renderUi from './renders/renderUi.js';
import getModal from './modal.js';
import renderModal from './renders/renderModal.js';

const createState = () => ({
  listRSS: [],
  fids: [],
  posts: {},
  isValid: null,
  lng: 'ru',
  stateUi: [],
  modal: false,
});
yup.setLocale({
  mixed: {
    required: 'required',
  },
  string: {
    url: 'invalid',
  },
});
const schema = yup.object().shape({
  url: yup.string().required().url(),
});
const createRender = (state) => {
  const render = (path, value) => {
    switch (path) {
      case ('isValid'):
        renderValid(value, i18n);
        break;
      case ('fids'):
        renderFids(value, i18n);
        break;
      case ('stateUi'):
        console.log(value);
        renderUi(value);
        break;
      case ('modal'):
        renderModal(value, i18n);
        break;
      case ('listRSS'):
        break;
      default:
        renderPosts(value, i18n, state);
    }
  };
  return render;
};
const addEventLink = (stateANDwatched) => {
  const [state, watched] = stateANDwatched;
  const posts = Object.values(state.posts).map((item) => Object.values(item)).flat();
  posts.forEach((post, index) => {
    const [a, button] = document.querySelectorAll(`[data-id="${index}"]`);
    a.addEventListener('click', () => {
      if (!state.stateUi.includes(index)) {
        watched.stateUi = [...state.stateUi, index];
      }
    });
    button.addEventListener('click', () => {
      if (!state.stateUi.includes(index)) {
        watched.stateUi = [...state.stateUi, index];
      }
      watched.modal = [post.title, post.description, post.link];
    });
  });
};
const update = (stateANDwatcheds) => {
  const [state, watched] = stateANDwatcheds;// чтоб линтер не ругался
  setTimeout(() => {
    state.listRSS.forEach((url) => {
      request(url).then((doc) => {
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
        state.posts[url] = { ...(state.posts[url] ?? {}), ...notContained };// это нормально?
        watched.posts = { ...state.posts };
        addEventLink([state, watched]);
        watched.url.push(url);
      }).catch(() => { });
    });
    update([state, watched]);
  }, 5000);
};
const formEvent = (stateANDwatcheds) => (e) => {
  e.preventDefault();
  const [state, watched] = stateANDwatcheds;// аналогично
  const data = new FormData(e.target);
  const inputUrl = data.get('url');
  schema.validate({ url: inputUrl }, { abortEarly: false }).then(() => {
    if (state.listRSS.includes(inputUrl)) {
      throw new Error('include');
    }
    watched.isValid = 'initialization';
    return request(inputUrl).then((doc) => {
      const idFid = state.listRSS.length;
      const [fid, posts] = cutObj(doc, idFid, inputUrl);
      state.posts[inputUrl] = { ...posts };// это нормально?
      watched.posts = { ...state.posts };
      watched.fids.push(fid);
      watched.isValid = 'valid';
      watched.listRSS.push(inputUrl);
      addEventLink([state, watched]);
    });
  }).catch((error) => {
    watched.isValid = error.errors ? error.errors[0] : error.message;
  });
};
const getHeader = () => {
  const h1 = document.createElement('h1');
  h1.classList.add('display-3', 'mb-0');
  h1.textContent = i18n.t('interface.rssAggregator');
  const p = document.createElement('p');
  p.classList.add('lead');
  p.textContent = i18n.t('interface.start');
  const p1 = document.createElement('p');
  p1.classList.add('mt-2', 'mb-0', 'text-muted');
  p1.textContent = i18n.t('interface.example');
  const p2 = document.createElement('p');
  p2.classList.add('feedback', 'm-0', 'position-absolute', 'small', 'text-danger');
  return [h1, p, p1, p2];
};
export default function init() {
  const state = createState();
  i18n.init({
    lng: state.lng,
    resources,
  }).catch(() => { });// обработать как промис, это так?
  const render = createRender(state);
  const watched = watchedState(state, render);
  const forma = form(i18n);
  forma.addEventListener('submit', formEvent([state, watched, render]));
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
  update([state, watched]);
}
