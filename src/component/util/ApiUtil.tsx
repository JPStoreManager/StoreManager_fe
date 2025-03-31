const apiUtil = (() => {
  const SERVER_HOST = 'http://localhost:8080';

  const PATH = {
    USER: {
      LOGIN: 'user/login'
    }
  };


  const get = (path: string, queryParam?: { [key: string]: string }, headers?: Map<string, string>): Promise<Response> => {
    const queryString = new URLSearchParams(queryParam)?.toString();
    if (queryString) {
      path += `?${queryString}`;
    }

    const reqestHeaders: HeadersInit = _getheaders(headers);

    return fetch(`${SERVER_HOST}/${path}${queryString}`, { 
      method: 'GET',
      headers: reqestHeaders
    });
  };

  const post = (path: string, body?: object, headers?: Map<string, string>): Promise<Response> => {
    const reqestHeaders: Headers = _getheaders(headers);
    if(!reqestHeaders.has('Content-Type')) reqestHeaders.set('Content-Type', 'application/json');

    return fetch(`${SERVER_HOST}/${path}`, {
      method: 'POST',
      headers: reqestHeaders,
      body: JSON.stringify(body)
    });
  };

  const _getheaders = (headers?: Map<string, string>): Headers => {
    if (!headers || headers.size === 0) {
      return new Headers();
    }

    const reqestHeaders: HeadersInit = new Headers();
    headers?.forEach((value, key) => {
      reqestHeaders.set(key, value);
    });
    return reqestHeaders;
  };

  return {
    PATH,
    get,
    post
  }
})();

export default apiUtil;