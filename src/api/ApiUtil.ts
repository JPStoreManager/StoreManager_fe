
const apiUtil = (() => {
  // const SERVER_HOST = 'http://localhost:8080';
  const SERVER_HOST = (import.meta as any).env.VITE_API_SERVER_URL;

  const HTTP_METHOD = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
  };

  const API = {
    USER: {
      LOGIN: {
        path: '/api/v1/user/login',
        method: HTTP_METHOD.GET
      },
      LOGOUT: {
        path: '/api/v1/user/logout',
        method: HTTP_METHOD.POST
      },
      FIND_PW_SEND_OTP: {
        path: '/api/v1/user/find/pw/otp/send',
        method: HTTP_METHOD.POST
      },
      FIND_PW_VERIFY_OTP: {
        path: '/api/v1/user/find/pw/otp/verify',
        method: HTTP_METHOD.POST
      },
      FIND_PW_UPDATE_PW: {
        path: '/api/v1/user/find/pw',
        method: HTTP_METHOD.PUT
      },
    },
    AUTH: {
      AUTHORIZATION: {
        path: '/auth/me',
        method: HTTP_METHOD.GET
      }
    },
    SALES: {
      MONTH: {
        path: '/api/v1/sales/month',
        method: HTTP_METHOD.GET
      }
    }
  };


  const get = (path: string, queryParam?: { [key: string]: string }, headers?: Map<string, string>): Promise<Response> => {
    const queryString = new URLSearchParams(queryParam)?.toString();
    if (queryString) {
      path += `?${queryString}`;
    }

    const reqestHeaders: HeadersInit = _getheaders(headers);

    return fetch(`${SERVER_HOST}${path}${queryString}`, { 
      method: 'GET',
      headers: reqestHeaders,
      credentials: 'include'
    });
  };

  const post = (path: string, body?: object, headers?: Map<string, string>): Promise<Response> => {
    const reqestHeaders: Headers = _getheaders(headers);
    if(!reqestHeaders.has('Content-Type')) reqestHeaders.set('Content-Type', 'application/json');

    return fetch(`${SERVER_HOST}${path}`, {
      method: 'POST',
      headers: reqestHeaders,
      credentials: 'include',
      body: JSON.stringify(body)
    });
  };


  const put = (path: string, body?: object, headers?: Map<string, string>): Promise<Response> => {
    const reqestHeaders: Headers = _getheaders(headers);
    if(!reqestHeaders.has('Content-Type')) reqestHeaders.set('Content-Type', 'application/json');

    return fetch(`${SERVER_HOST}${path}`, {
      method: 'PUT',
      headers: reqestHeaders,
      credentials: 'include',
      body: JSON.stringify(body)
    });
  };

  const _getheaders = (headers?: Map<string, string>): Headers => {
    if (!headers || headers.size === 0) {
      return new Headers();
    }

    const reqestHeaders: HeadersInit = new Headers();
    headers?.forEach((value, key) => {
      reqestHeaders.append(key, value);// Directly assign key-value pairs
    });

    return reqestHeaders;
  };

  return {
    API,
    get, post, put
  }
})();

export default apiUtil;