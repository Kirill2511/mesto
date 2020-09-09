import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor (popupSelector, handleFormSubmit) {
    super(popupSelector)
    this._handleFormSubmit = handleFormSubmit
    this._handleBtnSubmit = this._handleBtnSubmit.bind(this)
    this._reset = this._popupSelector.querySelector('.popup__fields')
  }

  _getInputValues () {
    // собирает данные всех полей формы
    this._formValues = {}
    this._inputList = Array.from(this._popupSelector.querySelectorAll('.popup__item'))
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value
    })

    return this._formValues
  }

  _handleBtnSubmit (evt) {
    evt.preventDefault()
    this._handleFormSubmit(this._getInputValues())
    this.close()
  }

  _setEventListeners () {
    super._setEventListeners()
    this._popupSelector.addEventListener('submit', this._handleBtnSubmit)
  }

  close () {
    this._popupSelector.removeEventListener('submit', this._handleBtnSubmit)
    this._reset.reset()
    super.close()
  }
}
