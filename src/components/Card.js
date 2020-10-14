export default class Card {
	constructor({ data, handleCardClick, handleLikeClick, handleDeleteButtonClick }, userId, cardSelector) {
		this._userId = userId;
		this._name = data.name;
		this._link = data.link;
		this._alt = data.alt;
		this._likes = data.likes;
		this._ownerId = data.owner._id;
		this._cardId = data._id;
		this._handleCardClick = handleCardClick;
		this._handleLikeClick = handleLikeClick;
		this._handleDeleteButtonClick = handleDeleteButtonClick.bind(this);
		this._cardSelector = cardSelector;
	}

	_getLikeCount() {
		const likesCount = this._likes === undefined || this._likes == null ? 0 : this._likes.length;
		this._element.querySelector('.element__like-counter').textContent = likesCount;
		if (this.isLiked()) {
			this._element.querySelector('.element__like-button').classList.add('element__like-button_active');
		}
		else {
			this._element.querySelector('.element__like-button').classList.remove('element__like-button_active');
		}
	}

	isLiked() {
		return Boolean(this._likes.find((item) => item._id === this._userId));
	}

	id() {
		return this._cardId;
	}

	setLikesInfo(data) {
		this._likes = data.likes;
		this._getLikeCount();
	}

	_getTemplate() {
		const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);

		this._card = cardElement;
	}

	_renderButtons() {
		if (this._ownerId === this._userId) {
			this._element.querySelector('.element__delete-button').classList.add('element__delete_invisible');
		}
		else {
			this._element.querySelector('.element__delete-button').classList.remove('element__delete_invisible');
		}
	}

	generateCard() {
		this._element = this._getTemplate();
		this._likeButton = this._element.querySelector('.element__heart');
		this._elementsCard = this._element.querySelector('.element');
		this._image = this._element.querySelector('.element__image');
		this._imageCardName = this._element.querySelector('.element__title');
		this._image.src = this._link;
		this._imageCardName.textContent = this._name;
		this._image.alt = this._name;
		this._getLikeCount();
		this._renderButtons();
		this._setEventListeners();
		return this._element;
	}

	deleteElement() {
		this._element.remove();
		this._element = null;
	}

	_setEventListeners() {
		this._image.addEventListener('click', () => {
			this._handleCardClick({
				link: this._link,
				name: this._name,
			});
		});
		this._element.querySelector('.element__heart').addEventListener('click', () => {
			this._handleLikeClick(this);
		});
		this._element.querySelector('.element__delete').addEventListener('click', () => {
			this._handleDeleteButtonClick(this);
		});
	}
}
