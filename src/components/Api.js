export default class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
        console.log(this._headers);
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers,
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            Promise.reject(`Ошибка: ${response.status}`);
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
            if (response.ok) {
                return response.json();
            }
            Promise.reject(`Ошибка: ${response.status}`);
        })
    }

    deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers,
          })
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            Promise.reject(`Ошибка: ${response.status}`);
          });
    }

    addLike(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: "PUT",
            headers: this._headers,
          }).then((response) => {
            if (response.ok) {
              return response.json();
            } 
            Promise.reject(`Что-то пошло не так: ${res.status}`);
          });
    }

    removeLike(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: "DELETE",
            headers: this._headers,
          }).then((result) => {
            if (result.ok) {
              return result.json();
            } Promise.reject(`Что-то пошло не так: ${res.status}`);
          });
    }

    //аватар приходит данным методом
    getInfoUser(){
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            Promise.reject(`Ошибка: ${response.status}`);
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
            if (response.ok) {
                return response.json()
            }
            Promise.reject(`Ошибка: ${response.status}`);
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
            if (response.ok) {
                return response.json()
            }
            Promise.reject(`Ошибка: ${response.status}`);
        });
    }
}