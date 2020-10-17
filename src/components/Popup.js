export default class Popup {
	constructor(popupSelector) {
		this._popupSelector = popupSelector;
		this._closeButton = this._popupSelector.querySelector('.popup__close-icon');
		this._submitButton = this._popupSelector.querySelector('.popup__button');
		this._handlerEscClose = this._handlerEscClose.bind(this);
	}

	_handlerEscClose(evt) {
		if (evt.key === 'Escape') {
			this.close();
		}
	}

	_closeByOverlay(evt) {
		if (evt.target.classList.contains('popup')) {
			this.close();
		}
	}

	_handlerCloseButton() {
		this.close();
	}

	loading(loading) {
		if (loading) {
			this._submitButton.textContent = 'Сохранение...';
		}
		else {
			this._submitButton.textContent = 'Сохранить';
		}
	}

	open() {
		this._popupSelector.classList.add('popup_opened');
		document.addEventListener('keydown', this._handlerEscClose);
	}

	close() {
		this._popupSelector.classList.remove('popup_opened');
		document.removeEventListener('keydown', this._handlerEscClose);
	}

	setEventListeners() {
		this._popupSelector.addEventListener('click', this._closeByOverlay.bind(this));
		this._closeButton.addEventListener('click', this._handlerCloseButton.bind(this));
	}
}
