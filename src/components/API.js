export default class Api {
	constructor(config) {
		this.url = config.url;
		this.headers = config.headers;
	}

	_getResponseData(res) {
		if (res.ok) {
			return res.json();
		}
		return Promise.reject(new Error(`Ошибка: ${res.status}`));
	}

	getInitialCards() {
		return fetch(`${this.url}/cards`, {
			headers: this.headers,
		}).then((res) => this._getResponseData(res));
	}

	getUserInfo() {
		return fetch(`${this.url}/users/me`, {
			method: 'GET',
			headers: this.headers,
		}).then((res) => this._getResponseData(res));
	}

	postNewCard(data) {
		return fetch(`${this.url}/cards`, {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify({
				name: data.place,
				link: data.link,
			}),
		}).then((res) => this._getResponseData(res));
	}

	setUserInfo(data) {
		return fetch(`${this.url}/users/me`, {
			method: 'PATCH',
			headers: this.headers,
			body: JSON.stringify({
				name: data.name,
				about: data.about,
			}),
		}).then((res) => this._getResponseData(res));
	}

	setUserAvatar(data) {
		return fetch(`${this.url}/users/me/avatar`, {
			method: 'PATCH',
			headers: this.headers,
			body: JSON.stringify({
				avatar: data.avatar,
			}),
		}).then((res) => {
			return this._getResponseData(res);
		});
	}

	deleteCard(cardID) {
		return fetch(`${this.url}/cards/${cardID}`, {
			method: 'DELETE',
			headers: this.headers,
		}).then((res) => {
			return this._getResponseData(res);
		});
	}

	likeCard(cardId) {
		return fetch(`${this.url}/cards/likes/${cardId}`, {
			method: 'PUT',
			headers: this.headers,
		}).then((res) => {
			return this._getResponseData(res);
		});
	}

	dislikeCard(cardId) {
		return fetch(`${this.url}/cards/likes/${cardId}`, {
			method: 'DELETE',
			headers: this.headers,
		}).then((res) => {
			return this._getResponseData(res);
		});
	}
}
