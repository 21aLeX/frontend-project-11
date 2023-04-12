import form from './form.js';
import body from './body.js';

export default function init() {
  const element = document.body;
  const section = document.createElement('section');
  section.classList.add('container-fluid', 'bg-dark', 'p-5');
  element.append(section);
  const div = document.createElement('div');
  div.classList.add('row');
  section.append(div);
  const div1 = document.createElement('div');
  div1.classList.add('col-md-10', 'col-lg-8', 'mx-auto', 'text-white');
  div.append(div1);
  const h1 = document.createElement('h1');
  h1.classList.add('display-3', 'mb-0');
  h1.textContent = 'RSS агрегатор';
  div1.append(h1);
  const p = document.createElement('p');
  p.classList.add('lead');
  p.textContent = 'Начните читать RSS сегодня! Это легко, это красиво.';
  div1.append(p);
  div1.append(form());
  const p1 = document.createElement('p');
  p1.classList.add('mt-2', 'mb-0', 'text-muted');
  p1.textContent = 'Пример: https://ru.hexlet.io/lessons.rss';
  div1.append(p1);
  element.append(body());
}
