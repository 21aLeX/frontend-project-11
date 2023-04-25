const createLi = (container, fids) => {
  fids.forEach((fid) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'border-0', 'border-end-0');
    const h3 = document.createElement('h3');
    h3.classList.add('h6', 'm-0');
    h3.textContent = fid.title;
    const p = document.createElement('p');
    li.append(h3, p);
    p.classList.add('m-0', 'small', 'text-black-50');
    p.textContent = fid.description;
    container.append(li);
  });
};
const renderFids = (value, i18n) => {
  const container = document.querySelector('.feeds');
  const div1 = document.createElement('div');
  container.replaceChildren(div1);
  div1.classList.add('card', 'border-0');
  const div2 = document.createElement('div');
  div2.classList.add('card-body');
  const h2 = document.createElement('h2');
  h2.classList.add('card-title', 'h4');
  h2.textContent = i18n.t('fids');
  div2.append(h2);
  const ul = document.createElement('ul');
  div1.append(div2, ul);
  ul.classList.add('list-group', 'border-0', 'rounded-0');
  createLi(ul, value);
};
export default renderFids;
