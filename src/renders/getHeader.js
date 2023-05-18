const getHeader = (i18n) => {
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
export default getHeader;
