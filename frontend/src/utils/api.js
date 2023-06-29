class Api {
  constructor(config) {
    // eslint-disable-next-line no-unused-expressions
    this._baseUrl = config.baseUrl,
    this._headers = config.headers
  }

//Получить начальные карточки с сервера
  getInitialCards() {
    return fetch(`${this._baseUrl}cards`, {
      headers: {authorization: 'edc06021-97df-405d-a469-7d3ba7b0f077'
      }})
      .then(this._checkResponse)
  }
//Добавить карточку на сервер
  addCard(data) {
    return fetch(`${this._baseUrl}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })})
      .then(this._checkResponse)
    }

//Запросить информацию о пользователе с сервера
  getUserInfo() {
    return fetch('https://nomoreparties.co/v1/cohort-62/users/me', {
    method: 'GET',
    headers: {authorization: 'edc06021-97df-405d-a469-7d3ba7b0f077'}
  })
  .then(this._checkResponse)
  }

//Записать обновленную информацию о пользователе на сервер
  setUserInfo(data) {
    return fetch(`${this._baseUrl}users/me/`, {
      method: 'PATCH',
      headers: this._headers,
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
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })})
  .then(this._checkResponse)
}

//Запрос на удаление карточки с сервера
deleteCard(cardId) {
  return fetch(`${this._baseUrl}cards/${cardId}`, {
  method: 'DELETE',
  headers: this._headers
  })
  .then(this._checkResponse)
}

//Отправка запроса на присвоение лайка
setLike(cardId) {
  return fetch(`${this._baseUrl}cards/${cardId}/likes`, {
    method: 'PUT',
    headers: this._headers
  })
  .then(this._checkResponse)
}

// Отправка запроса на удаление лайка
removeLike(cardId) {
  return fetch(`${this._baseUrl}cards/${cardId}/likes`, {
    method: 'DELETE',
    headers: this._headers
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
    headers: this._headers
  })
  .then(this._checkResponse)
  } else {
    return fetch(`${this._baseUrl}cards/${cardId}/likes`, {
    method: 'DELETE',
    headers: this._headers
  })
  .then(this._checkResponse)
  }
}
}

const api = new Api({baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-62/',
headers: {
 authorization: 'edc06021-97df-405d-a469-7d3ba7b0f077',
 "Content-Type": "application/json"
 }
})

export default api;
