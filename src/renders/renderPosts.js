const createA = (id, href, title) => {
  const a = document.createElement('a');
  a.setAttribute('href', href);
  a.setAttribute('data-id', id);
  a.setAttribute('target', '_blank');
  a.setAttribute('rel', 'noopener noreferrer');
  a.textContent = title;
  return a;
};
const createButton = (id) => {
  const button = document.createElement('button');
  button.setAttribute('type', 'button');
  button.setAttribute('data-id', id);
  button.setAttribute('data-bs-toggle', 'modal');
  button.setAttribute('data-bs-target', '#exampleModal');
  button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
  return button;
};
const createLi = (container, posts, i18n, states) => {
  const state = states;// чтоб линтер не ругачся почему этоя меняю параметр
  posts.forEach((post, index) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
    const a = createA(index, post.link, post.title);
    if (state.stateUi.includes(index)) {
      a.classList.add('fw-normal', 'link-secondary');
    } else {
      a.classList.add('fw-bold');
    }
    const button = createButton(index, post.link, post.title);
    li.append(a, button);
    button.textContent = i18n.t('view');
    container.append(li);
  });
};
const renderPosts = (value, i18n, state) => {
  const container = document.querySelector('.posts');
  const div1 = document.createElement('div');
  container.replaceChildren(div1);
  div1.classList.add('card', 'border-0');
  const div2 = document.createElement('div');
  div2.classList.add('card-body');
  const h2 = document.createElement('h2');
  div2.append(h2);
  h2.classList.add('card-title', 'h4');
  h2.textContent = i18n.t('posts');
  const ul = document.createElement('ul');
  div1.append(div2, ul);
  ul.classList.add('list-group', 'border-0', 'rounded-0-group');
  const posts = Object.values(value).map((item) => Object.values(item)).flat();
  createLi(ul, posts, i18n, state);
};
export default renderPosts;
