class Api {
    constructor({ baseUrl, headers }) {
        this._headers = headers
        this._baseUrl = baseUrl
    }

    login(dataUser) {
        return fetch(`${this._baseUrl}/signin`, {
            headers: this._headers,
            method: 'POST',
            body: JSON.stringify(dataUser)
        }).then(onResponse)
    }

    register(data) {
        return fetch(`${this._baseUrl}/signup`, {
            headers: this._headers,
            method: 'POST', 
            body: JSON.stringify(data)
        }).then(onResponse)
    }

    resetPass (data) {
        return fetch(`${this._baseUrl}/password-reset`, {
            headers: this._headers,
            method: 'POST', 
            body: JSON.stringify(data)
        }).then(onResponse)
    }
}

const onResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка : ${res.status}`)
};

const config = {
    baseUrl: 'https://api.react-learning.ru',
    headers: {
        'content-type': 'application/json'
    },
}

export const authApi = new Api(config);
