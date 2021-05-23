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
        .catch((err) => {
            console.log(err);
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

    getInfoUser(){
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            Promise.reject(`Ошибка: ${response.status}`);
        })
        .catch((err) => {
            console.log(err);
        })
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
        })
    }
}