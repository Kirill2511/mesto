import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor (popupSelector, handleFormSubmit) {
    super(popupSelector)
    this._handleFormSubmit = handleFormSubmit
    this._popupButton = popupSelector.querySelector('.popup__button')

    this._generateHandleSubmit = this._generateHandleSubmit.bind(this)
  }

  _getInputValues () {
    this._inputList = Array.from(this._popupSelector.querySelectorAll('.popup__item'))
    this._formValues = {}
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value
    })

    return this._formValues
  }

  _renderLoading (isLoading, text) {
    if (isLoading) {
      this._popupButton.textContent = `${text}...`
    } else {
      this._popupButton.textContent = text
    }
  }

  _generateHandleSubmit () {
    const thisText = this._popupButton.textContent

    return (evt) => {
      evt.preventDefault()
      this._renderLoading(true, thisText)
      this._handleFormSubmit(this._getInputValues())
        .then(() => {
          this.close()
          evt.target.reset()
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => this._renderLoading(false, thisText))
    }
  }

  _setEventListeners () {
    super._setEventListeners()
    this._HandleSubmitButton = this._generateHandleSubmit()
    this._popupSelector.addEventListener('submit', this._HandleSubmitButton)
  }

  open () {
    this._setEventListeners(this._handleFormSubmit)
    this._popupSelector.classList.add('popup_opened')
  }

  close () {
    this._popupSelector.removeEventListener('submit', this._HandleSubmitButton)
    super.close()
  }
}
