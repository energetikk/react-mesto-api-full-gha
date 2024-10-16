
export const BASE_URL = 'http://localhost:3000/';
// export const BASE_URL = 'https://mestogramback.nomoreparties.sbs/';
// export const BASE_URL = 'http://95.140.152.186:3001/';
// export const BASE_URL = 'https://mestoapi.deminpavel.ru/';

//Проверка ответа от сервера
function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Произошла ошибка: ${res.status}`); // если ошибка, отклоняем промис
}

export const register = ({ password, email }) => {
  return fetch(`${BASE_URL}signup`, {
    method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({password, email})
  })
  .then(res => checkResponse(res));
}

export const authorize = ({ password, email }) => {
    return fetch(`${BASE_URL}signin`, {
      method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ password, email })
    })
    .then(res => checkResponse(res));
    
  };

export const getContent = (token) => {
    return fetch(`${BASE_URL}users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
    })
      .then(res => checkResponse(res))
      .then(data => data);
  };
  