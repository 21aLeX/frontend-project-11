const renderValid = (value, i18n) => {
  const inputUrl = document.querySelector('[name=url]');
  const button = document.querySelector('[aria-label="add"]');
  const forma = document.querySelector('form');
  const p = forma.parentNode.lastChild;
  button.disabled = false;
  inputUrl.disabled = false;
  p.textContent = i18n.t(value);
  if (value === 'initialization') {
    button.disabled = true;
    inputUrl.disabled = true;
  } else if (value === 'valid') {
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
export default renderValid;
