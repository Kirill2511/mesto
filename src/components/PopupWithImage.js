import Popup from './Popup.js';

export default class ModalWithImage extends Popup {
	constructor(modalSelector) {
		super(modalSelector);
		this._modalImage = this._modal.querySelector('.popup__image');
		this._modalCaption = this._modal.querySelector('.popup__card-about');
	}

	open({ name, link }) {
		super.open();
		super.setEventListeners();
		const image = this._modalImage;
		const caption = this._modalCaption;
		image.src = link;
		image.alt = name;
		caption.textContent = name;
	}
}
