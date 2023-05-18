import * as yup from 'yup';
import i18n from 'i18next';
import resources from './locales/index.js';
import form from './renders/form.js';
import body from './renders/body.js';
import watchedState from './watcheds.js';
import request from './request.js';
import cutObj from './cutObj.js';
import getModal from './modal.js';
import createRender from './createRender.js';
import getSection from './renders/getSection.js';

const createState = () => ({
  listRSS: [],
  fids: [],
  posts: new Map(),
  form: { status: null },
  lng: 'ru',
  stateUi: [],
  modal: {},
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

const addEventLink = (state, watched) => {
  const postsAll = [];
  state.posts.forEach((post) => {
    postsAll.push(...post);
  });
  const container = document.querySelector('.posts');
  container.addEventListener('click', (e) => {
    const tag = e.target;
    if (tag.tagName === 'A' || tag.tagName === 'BUTTON') {
      watched.stateUi.push(Number(tag.dataset.id));
    } if (tag.tagName === 'BUTTON') {
      const { title, description, link } = postsAll[tag.dataset.id];
      // eslint-disable-next-line no-param-reassign
      watched.modal = { title, description, link };
    }
  });
};
const update = (state, watched) => {
  setTimeout(() => {
    if (state.listRSS.length > 0) {
      const newPosts = [];
      state.listRSS.forEach((url, index) => {
        request(url).then((doc) => {
          const [, posts] = cutObj(doc, index);
          newPosts.push(posts);
          watched.posts.set(index, posts);
        }).catch(() => { });
      });
    }
    update(state, watched);
  }, 5000);
};
const formEvent = (state, watched) => (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const inputUrl = data.get('url');
  schema.validate({ url: inputUrl }, { abortEarly: false }).then(() => {
    if (state.listRSS.includes(inputUrl)) {
      throw new Error('include');
    }
    // eslint-disable-next-line no-param-reassign
    watched.form.status = 'initialization';
    return request(inputUrl).then((doc) => { // без return ошибки не доходят до следующего cath
      const idFid = state.listRSS.length;
      const [fid, posts] = cutObj(doc, idFid);
      watched.posts.set(idFid, posts);
      watched.fids.push(fid);
      // eslint-disable-next-line no-param-reassign
      watched.form.status = 'valid';
      watched.listRSS.push(inputUrl);
      addEventLink(state, watched);
    });
  }).catch((error) => {
    // eslint-disable-next-line no-param-reassign
    watched.form.status = error.errors ? error.errors[0] : error.message;
  });
};
export default function init() {
  const state = createState();
  i18n.init({
    lng: state.lng,
    resources,
  }).then().catch(() => { });// так?
  const view = createRender(state);
  const watched = watchedState(state, view);
  update(state, watched);
  const forma = form(i18n);
  forma.addEventListener('submit', formEvent(state, watched));
  const element = document.body;
  element.insertAdjacentHTML('afterbegin', getModal());
  element.append(getSection(forma, i18n));
  element.append(body());
}
