const renderUi = (value) => {
  const a = document.querySelector(`a[data-id="${value[value.length - 1]}"]`);
  a.classList.remove('fw-bold');
  a.classList.add('fw-normal', 'link-secondary');
};
export default renderUi;
