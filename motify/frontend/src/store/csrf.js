const csrfFetch = async (url, options = {}) => {
  options.method ||= 'GET';
  options.headers ||= {};

  if (options.method.toUpperCase() !== 'GET') {
    options.headers['X-CSRF-Token'] = sessionStorage.getItem('X-CSRF-Token');
    options.headers['Content-Type'] = 'application/json';
  }

  const response = await fetch (url, options);

  if (response.status >= 400) throw response;

  return response;

}


export default csrfFetch;