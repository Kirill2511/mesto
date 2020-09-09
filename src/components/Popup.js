export default class Popup {
  constructor (popupSelector) {
    this._popupSelector = document.querySelector(popupSelector)
    this._handleEscClose = this._handleEscClose.bind(this)
    this._clickClose = this._clickClose.bind(this)
  }

  _handleEscClose (evt) {
    if (evt.key === 'Escape') {
      this.close()
    }
  }

  _clickClose (evt) {
    if (evt.target.classList.contains('popup__close-icon') || evt.target.classList.contains('popup')) {
      this.close()
    }
  }

  _setEventListeners () {
    this._popupSelector.addEventListener('click', this._clickClose)
    document.addEventListener('keydown', this._handleEscClose)
  }

  _removeEventListeners () {
    this._popupSelector.removeEventListener('click', this._clickClose)
    document.removeEventListener('keydown', this._handleEscClose)
  }

  open () {
    this._popupSelector.classList.add('popup_opened')
    this._setEventListeners()
  }

  close () {
    this._popupSelector.classList.remove('popup_opened')
    this._removeEventListeners()
  }
}
