class Api {
    constructor({ baseUrl, headers, nameProject }) {
        this._headers = headers
        this._baseUrl = baseUrl
        this._nameProject = nameProject
    }

    getProductList() {
        console.log(this._nameProject, 'GET getProductList')
        return fetch(`${this._baseUrl}/products`, { headers: this._headers }).then(
            onResponse
        ).catch((e) => {
            console.log(e)
        });
    }

    getUserInfo() {
        console.log(this._nameProject, 'GET getUserInfo')
        return fetch(`${this._baseUrl}/users/me`, { headers: this._headers }).then(
            onResponse
        ).catch((e) => {
            console.log(e)
        });
    }
    search(searchQuery) {
        console.log(this._nameProject, '!!!!!!!!!!!!!!!!! GET searchQuery')
        return fetch(`${this._baseUrl}/products/search?query=${searchQuery}`, { headers: this._headers }).then(
            onResponse
        ).catch((e) => {
            console.log(e)
        });
    }

    setUserInfo(dataUser) {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify(dataUser),
        }).then(
            onResponse
        ).catch((e) => {
            console.log(e)
        })
    }

    changleLikeProduct(productId, isLike) {
        return fetch(`${this._baseUrl}/products/likes/${productId}`, {
            headers: this._headers,
            method: isLike ? 'DELETE' : 'PUT'
        }).then(
            onResponse
        ).catch((e)=>{
            console.log(e)
        })
    }
    getProductById(productId) {
        return fetch(`${this._baseUrl}/products/${productId}`, {
            headers: this._headers
        }).then(onResponse)
    }
}



const config = {
    baseUrl: 'https://api.react-learning.ru',
    headers: {
        'content-type': 'application/json',
        'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M2YjVhYjU5Yjk4YjAzOGY3N2E2ODYiLCJncm91cCI6Imdyb3VwLTkiLCJpYXQiOjE2NzM5NjcwNzIsImV4cCI6MTcwNTUwMzA3Mn0.dafJiRIpn6a6bkAiu7Kh0ulFGtekCBEUK-lMl-7GHTk'
    },
    nameProject: 'Dog_food'
}

const onResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка : ${res.status}`)
};

const api = new Api(config);

export default api;
