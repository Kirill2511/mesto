import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
	constructor(popupSelector) {
		super(popupSelector);
		this._popupImage = this._popupSelector.querySelector('.popup__image');
		this._popupCardName = this._popupSelector.querySelector('.popup__card-about');
	}

	open({ name, link }) {
		super.open();
		super.setEventListeners();
		const image = this._popupImage;
		const caption = this._popupCardName;
		image.src = link;
		image.alt = name;
		caption.textContent = name;
	}
}
