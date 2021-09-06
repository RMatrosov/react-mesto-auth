

class Api {
    constructor({baseUrl, headers}) {
        this._URL = baseUrl;
        this._token = headers.authorization;
    };

     getInitialCards() {
         return fetch(`${this._URL}cards`, {
             headers: {
                 authorization: this._token,
             }
         })
             .then(this._handleResponse);
     };

    getUserInfoFromServer() {
        return fetch(`${this._URL}users/me`, {
            headers: {
                authorization: this._token,
            }
        })
            .then(this._handleResponse);
    };

    setUserInfoFromServer({name, about}) {
        return fetch(`${this._URL}users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
            .then(this._handleResponse);
    };

    addCardToServer({title, link}) {
        return fetch(`${this._URL}cards`, {
            method: 'POST',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: title,
                link: link
            })
        })
            .then(this._handleResponse);
    };

    deleteCardFromServer(data) {
        return fetch(`${this._URL}cards/${data}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            }
        })
            .then(this._handleResponse);
    };

    changeLikeCardStatus(id, isLiked) {
        let method
        if (!isLiked){
            method = 'DELETE'
        }else{
            method = 'PUT'
        }
        return fetch(`${this._URL}cards/likes/${id}`, {
            method: method,
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            }
        })
            .then(this._handleResponse);
    };

    changeAvatar(item) {
        return fetch(`${this._URL}users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: item.avatar,
            })
        })
            .then(this._handleResponse);
    };

    _handleResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    };

};

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-26/',
    headers: {
        authorization: '4e299d77-1777-4738-8eea-94761855c603',
        'Content-Type': 'application/json'
    }
});

export default api;

