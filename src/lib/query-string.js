const urlSerarchParams = new URLSearchParams(window.location.search);

const getParam = (param) => {
  return urlSerarchParams.get(param);
};

export default getParam;
