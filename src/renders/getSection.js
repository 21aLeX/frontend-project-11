import getHeader from './getHeader.js';

const getSection = (forma, i18n) => {
  const section = document.createElement('section');
  section.classList.add('container-fluid', 'bg-dark', 'p-5');
  const div = document.createElement('div');
  div.classList.add('row');
  section.append(div);
  const div1 = document.createElement('div');
  div1.classList.add('col-md-10', 'col-lg-8', 'mx-auto', 'text-white');
  div.append(div1);
  const [h1, p, p1, p2] = getHeader(i18n);
  div1.append(h1, p, forma, p1, p2);
  return section;
};
export default getSection;
