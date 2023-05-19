const getInput = () => {
  const input = document.createElement('input');
  input.setAttribute('id', 'url-input');
  input.autofocus = true;
  input.setAttribute('name', 'url');
  input.setAttribute('aria-label', 'url');
  input.setAttribute('placeholder', 'ссылка RSS');
  input.setAttribute('autocomplete', 'off');
  input.classList.add('form-control', 'w-100');
  return input;
};
const getButton = (i18n) => {
  const button = document.createElement('button');
  button.setAttribute('type', 'submit');
  button.setAttribute('aria-label', 'add');
  button.classList.add('h-100', 'btn', 'btn-lg', 'btn-primary', 'px-sm-5');
  button.textContent = i18n.t('interface.add');
  return button;
};
export default (i18n) => {
  const form = document.createElement('form');
  form.classList.add('rss-form', 'text-body');
  form.setAttribute('formaction', 'true');
  const div = document.createElement('div');
  div.classList.add('row');
  form.append(div);
  const divCol1 = document.createElement('div');
  divCol1.classList.add('col');
  const div1 = document.createElement('div');
  div1.classList.add('form-floating');
  divCol1.append(div1);
  const input = getInput();// input
  div1.append(input);
  const label = document.createElement('label');
  label.setAttribute('for', 'url-input');
  label.textContent = i18n.t('interface.link');
  div1.append(label);
  const divCol2 = document.createElement('div');
  divCol2.classList.add('col-auto');
  div.append(divCol1, divCol2);
  const button = getButton(i18n);// button
  divCol2.append(button);
  return form;
};
