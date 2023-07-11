class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
  }

//Получить начальные карточки с сервера
  getInitialCards() {
    return fetch(`${this._baseUrl}cards`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
      })
      .then(this._checkResponse)
  }
//Добавить карточку на сервер
  addCard(data) {
    return fetch(`${this._baseUrl}cards`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })})
      .then(this._checkResponse)
    }

//Запросить информацию о пользователе с сервера
  getUserInfo() {
    return fetch(`${this._baseUrl}users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
   },
    
  })
  .then(this._checkResponse)
  }

//Записать обновленную информацию о пользователе на сервер
  setUserInfo(data) {
    return fetch(`${this._baseUrl}users/me/`, {
      method: 'PATCH',
      // headers: this._headers,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
     },
      credentials: 'include',
      body: JSON.stringify({
        name: data.name,
        about: data.description
      })})
  .then(this._checkResponse)
}

//Записать обновленный аватар пользователя на сервер
  setAvatar(data) {
    console.log(data)
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
     },
      body: JSON.stringify({
        avatar: data.avatar
      })})
  .then(this._checkResponse)
}

//Запрос на удаление карточки с сервера
deleteCard(cardId) {
  return fetch(`${this._baseUrl}cards/${cardId}`, {
  method: 'DELETE',
  headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${localStorage.getItem('jwt')}`,
  },
  })
  .then(this._checkResponse)
}

//Отправка запроса на присвоение лайка
setLike(cardId) {
  return fetch(`${this._baseUrl}cards/${cardId}/likes`, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
  })
  .then(this._checkResponse)
}

// Отправка запроса на удаление лайка
removeLike(cardId) {
  return fetch(`${this._baseUrl}cards/${cardId}/likes`, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
  })
  .then(this._checkResponse)
}

//Проверка ответа от сервера
_checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Произошла ошибка: ${res.status}`); // если ошибка, отклоняем промис
}

changeLikeCardStatus(cardId, isLiked) {
  if (isLiked) {
    return fetch(`${this._baseUrl}cards/${cardId}/likes`, {
    method: 'PUT',
    // headers: this._headers,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
   },
    credentials: 'include',
  })
  .then(this._checkResponse)
  } else {
    return fetch(`${this._baseUrl}cards/${cardId}/likes`, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
   },
    credentials: 'include',
  })
  .then(this._checkResponse)
  }
}
}

// const api = new Api({baseUrl: 'http://localhost:3000/'})
const api = new Api({baseUrl: 'https://mestogramback.nomoreparties.sbs/'})

export default api;
