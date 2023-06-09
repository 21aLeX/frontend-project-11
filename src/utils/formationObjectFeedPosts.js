const createObjPost = (items, idFid) => {
  const result = [];
  items.forEach((item) => {
    const link = item.querySelector('link').textContent;
    const obj = {
      idFid,
      title: item.querySelector('title').textContent,
      description: item.querySelector('description').textContent,
      link,
    };
    result.push(obj);
  });
  return result;
};
export default (doc, id) => {
  const posts = createObjPost(doc.querySelectorAll('item'), id);
  const objFid = {
    id,
    title: doc.querySelector('title').textContent,
    description: doc.querySelector('description').textContent,
  };
  return [objFid, posts];
};
