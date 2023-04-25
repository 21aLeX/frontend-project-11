import { Modal } from 'bootstrap';

const renderModal = (value, i18n) => {
  const [title, description, href] = value;
  const modalTitle = document.querySelector('.modal-title');
  modalTitle.textContent = title;
  const body = document.querySelector('.modal-body');
  body.textContent = description;
  const btnRead = document.querySelector('.btn-primary');
  btnRead.textContent = i18n.t('modalRead');
  const btnClose = document.querySelector('.btn-secondary');
  btnClose.textContent = i18n.t('modalClose');
  btnRead.setAttribute('href', href);
  const modal = document.querySelector('#exampleModal');
  const myModal = Modal.getInstance(modal);
  myModal.toggle();
};
export default renderModal;
