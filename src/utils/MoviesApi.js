class MoviesApi {
  constructor({ baseUrl, headers }) {
    this._url = baseUrl;
    this._headers = headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getInitialCards() {
    return fetch(`${this._url}`, {
      // credentials: "include",
    })
      .then((res) => {
        return this._getResponseData(res);
      })
      .then((res) => {
        return res;
      });
  }

  getProfileId() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
      credentials: "include",
    })
      .then((res) => {
        return this._getResponseData(res);
      })
      .then((res) => {
        return res.data;
      });
  }

  getProfileData() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
      credentials: "include",
    })
      .then((res) => {
        return this._getResponseData(res);
      })
      .then((res) => {
        return res.data;
      });
  }

  postCreateCard(name, link) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
      .then((res) => {
        return this._getResponseData(res);
      })
      .then((res) => {
        return res.data;
      });
  }
}

const moviesApi = new MoviesApi({
  baseUrl: "https://api.nomoreparties.co/beatfilm-movies",
  headers: {
    "Content-Type": "application/json",
  },
});

export default moviesApi;
