export default class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
        console.log(this._headers);
    }
    _isResponseOk(response) {
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(`Ошибка: ${response.status}`);
        }
    }
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers,
        })
        .then((response) => {
            /*if (response.ok) {
                return response.json();
            }
            Promise.reject(`Ошибка: ${response.status}`);*/
            return this._isResponseOk(response);
        })
    }

    addCard(name, link) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link,
            }),
        })
        .then((response) => {
            /*if (response.ok) {
                return response.json();
            }
            Promise.reject(`Ошибка: ${response.status}`);*/
            return this._isResponseOk(response);
        })
    }

    deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers,
          })
          .then((response) => {
            /*if (response.ok) {
              return response.json();
            }
            Promise.reject(`Ошибка: ${response.status}`);*/
            return this._isResponseOk(response);
          });
    }

    addLike(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: "PUT",
            headers: this._headers,
          }).then((response) => {
            /*if (response.ok) {
              return response.json();
            } 
            Promise.reject(`Что-то пошло не так: ${res.status}`);*/
            return this._isResponseOk(response);
          });
    }

    removeLike(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: "DELETE",
            headers: this._headers,
          }).then((result) => {
            /*if (result.ok) {
              return result.json();
            } Promise.reject(`Что-то пошло не так: ${res.status}`);*/
            return this._isResponseOk(result);
          });
    }

    //аватар приходит данным методом
    getInfoUser(){
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
        })
        .then((response) => {
            /*if (response.ok) {
                return response.json();
            }
            Promise.reject(`Ошибка: ${response.status}`);*/
            return this._isResponseOk(response);
        });
// ошибки ловим в index.js
//        .catch((err) => {
//            console.log(err);
//        })
    }

    setInfoUser(name, about) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about,
            }),
        })
        .then((response)=> {
            /*if (response.ok) {
                return response.json()
            }
            Promise.reject(`Ошибка: ${response.status}`);*/
            return this._isResponseOk(response);
        });
    }

    //обновляем аватар данным методом
    updateProfileImage(link) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: link,
            }),
        })
        .then((response)=> {
            /*if (response.ok) {
                return response.json()
            }
            Promise.reject(`Ошибка: ${response.status}`);*/
            return this._isResponseOk(response);
        });
    }
}