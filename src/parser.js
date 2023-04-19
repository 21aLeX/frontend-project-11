export default (xmlStr) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlStr, 'text/xml');
  return doc;
};
