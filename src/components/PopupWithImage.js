import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor (popupSelector) {
    super(popupSelector)
    this._popupImage = this._popupSelector.querySelector('.popup__image')
    this._popupCardName = this._popupSelector.querySelector('.popup__card-about')
  }

  open ({ link, name }) {
    super.open()
    this._popupImage.src = link
    this._popupImage.alt = name
    this._popupCardName.textContent = name
  }
}
