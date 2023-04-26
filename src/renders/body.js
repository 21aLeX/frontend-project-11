export default () => {
  const section = document.createElement('section');
  section.classList.add('container-fluid', 'container-xxl', 'p-5');
  const div = document.createElement('div');
  div.classList.add('row');
  section.append(div);
  const div1 = document.createElement('div');
  div1.classList.add('col-md-10', 'col-lg-8', 'order-1', 'mx-auto', 'posts');
  div.append(div1);
  const div2 = document.createElement('div');
  div2.classList.add('col-md-10', 'col-lg-4', 'mx-auto', 'order-0', 'order-lg-1', 'feeds');
  div.append(div2);
  return section;
};
