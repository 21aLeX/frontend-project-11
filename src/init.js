import * as yup from 'yup';
import i18n from 'i18next';
import onChange from 'on-change';
import resources from './locales/index.js';
import form from './renders/form.js';
import body from './renders/body.js';
import request from './utils/request.js';
import getModal from './utils/modal.js';
import createRender from './utils/createRender.js';
import getSection from './renders/getSection.js';

const createState = () => ({
  listRSS: [],
  fids: [],
  posts: new Map([['posts', []]]),
  form: { status: null },
  lng: 'ru',
  stateUi: [],
  modal: {},
});
yup.setLocale({
  mixed: {
    required: 'required',
    notOneOf: 'include',
  },
  string: {
    url: 'invalid',
  },
});

const getSchema = (url, listRSS) => yup.object().shape({
  url: yup.string().required().url().notOneOf(listRSS),
}).validate({ url });

const addEventLink = (state, watched) => {
  const container = document.querySelector('.posts');
  container.addEventListener('click', (e) => {
    const tag = e.target;
    if (tag.tagName === 'A' || tag.tagName === 'BUTTON') {
      watched.stateUi.push(Number(tag.dataset.id));
    } if (tag.tagName === 'BUTTON') {
      const { title, description, link } = state.posts.get('posts')[tag.dataset.id];
      watched.modal = { title, description, link };
    }
  });
};
const update = (state, watched) => {
  setTimeout(() => {
    if (state.listRSS.length > 0) {
      const promises = state.listRSS
        .map((url, index) => request(url, index)
          .then((dataRequest) => {
            const [, posts] = dataRequest;
            return posts;
          }).catch(() => { }));
      Promise.allSettled(promises)
        .then((results) => results.map((result) => result.value))
        .then((map) => watched.posts.set('posts', map.flat()))
        .catch(() => { });
    }
    update(state, watched);
  }, 5000);
};
const formEvent = (state, watched) => (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const inputUrl = data.get('url');
  getSchema(inputUrl, state.listRSS).then(() => {
    watched.form.status = 'initialization';
    const idFid = state.listRSS.length;
    return request(inputUrl, idFid).then((dataRequest) => {
      const [fid, posts] = dataRequest;
      watched.posts.set('posts', [...state.posts.get('posts'), ...posts]);
      watched.fids.push(fid);
      watched.form.status = 'valid';
      watched.listRSS.push(inputUrl);
      addEventLink(state, watched);
    });
  }).catch((error) => {
    watched.form.status = error.errors ? error.errors[0] : error.message;
  });
};
export default function init() {
  try {
    const state = createState();
    i18n.init({
      lng: state.lng,
      resources,
    }).then(() => {
      const watched = onChange(state, createRender(state));
      // [хм, во 2м шаге сказано что "Вынесите слой View (тот, где вотчеры) в отдельный файл"]
      update(state, watched);
      const forma = form(i18n);
      forma.addEventListener('submit', formEvent(state, watched));
      const element = document.body;
      element.insertAdjacentHTML('afterbegin', getModal(i18n));
      element.append(getSection(forma, i18n));
      element.append(body());
    });
  } catch (error) {
    console.log(error);
  }
}
