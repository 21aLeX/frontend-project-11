import { Modal } from 'bootstrap';

const renderModal = (value) => {
  const { title, description, link } = value;
  const modalTitle = document.querySelector('.modal-title');
  modalTitle.textContent = title;
  const body = document.querySelector('.modal-body');
  body.textContent = description;
  const btnRead = document.querySelector('.btn-primary');
  btnRead.setAttribute('href', link);
  const modal = document.querySelector('#exampleModal');
  const myModal = Modal.getInstance(modal);
  myModal.toggle();
};
export default renderModal;
