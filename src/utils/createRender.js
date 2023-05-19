import i18n from 'i18next';
import renderValid from '../renders/renderValid.js';
import renderPosts from '../renders/renderPosts.js';
import renderFids from '../renders/renderFids.js';
import renderUi from '../renders/renderUi.js';
import renderModal from '../renders/renderModal.js';

const createRender = (state) => {
  const render = (path, value) => {
    switch (path) {
      case ('form.status'):
        renderValid(value, i18n);
        break;
      case ('fids'):
        renderFids(value, i18n);
        break;
      case ('stateUi'):
        renderUi(value);
        break;
      case ('modal'):
        renderModal(value);
        break;
      case ('listRSS'):
        break;
      case ('posts'):
        renderPosts(value, i18n, state);
        break;
      default:
    }
  };
  return render;
};
export default createRender;
