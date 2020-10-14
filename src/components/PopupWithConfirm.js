import Popup from './Popup.js';

export default class ModalConfirm extends Popup {
	constructor(modalSelector) {
		super(modalSelector);
		this._formSubmit = this._modal.querySelector('.popup__fields');
	}

	handlerSubmit(handlerFormSubmit) {
		this._handleFormSubmit = handlerFormSubmit;
	}

	setEventListeners() {
		super.setEventListeners();
		this._formSubmit.addEventListener('submit', (evt) => {
			evt.preventDefault();
			this._handleFormSubmit();
			this.close();
		});
	}
}
