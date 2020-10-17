import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
	constructor({ handleFormSubmit }, popupSelector) {
		super(popupSelector);
		this._form = this._popupSelector.querySelector('.popup__fields');
		this.handleFormSubmit = handleFormSubmit;
	}
	_getInputValues() {
		this._inputList = this._form.querySelectorAll('.popup__item');
		this._formValues = {};
		this._inputList.forEach((input) => {
			this._formValues[input.name] = input.value;
		});
		return this._formValues;
	}

	setEventListeners() {
		super.setEventListeners();
		this._form.addEventListener('submit', (evt) => {
			evt.preventDefault();
			this.handleFormSubmit(this._getInputValues());
			this.close();
		});
	}
	close() {
		super.close();
		this._form.reset();
	}
}
