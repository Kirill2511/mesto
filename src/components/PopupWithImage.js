import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor (popupSelector) {
    super(popupSelector)
    this._popupImage = this._popupSelector.querySelector('.popup__image')
    this._popupCardName = this._popupSelector.querySelector('.popup__card-about')
  }

  open (evt) {
    super.open()
    this._popupCardName.textContent = evt.target.alt
    this._popupImage.src = evt.target.src
    this._popupImage.alt = evt.target.alt
  }
}
