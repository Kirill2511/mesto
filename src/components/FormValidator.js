export default class FormValidator {
  constructor (parameter, formElement) {
    this._inputSelector = parameter.inputSelector
    this._submitButtonSelector = parameter.submitButtonSelector
    this._inactiveButtonClass = parameter.inactiveButtonClass
    this._inputErrorClass = parameter.inputErrorClass
    this._errorClass = parameter.errorClass
    this._formElement = formElement
  }

  clearError () {
    Array.from(this._formElement.querySelectorAll('.popup__item')).forEach(inputElement => this._hideInputError(inputElement))
  }

  // Скрыть сообщение об ошибке
  _showInputError (inputElement, errorMessage) {
    // Находим элемент ошибки внутри самой функции, тогда функция будет работать с любым полем внутри формы
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`)
    inputElement.classList.add(this._inputErrorClass)
    errorElement.textContent = errorMessage
    errorElement.classList.add(this._errorClass)
  }

  // Показать сообщение об ошибке
  _hideInputError (inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`)
    inputElement.classList.remove(this._inputErrorClass)
    errorElement.classList.remove(this._errorClass)
    errorElement.textContent = ''
  }

  // Проверить валидность поля
  _checkInputValidity (inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage)
    } else {
      this._hideInputError(inputElement)
    }
  }

  // Функция проверяет одновременную валидность всех полей одной формы
  _hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid
    })
  }

  // Функция активации кнопки ("отправить" или "сохранить")
  _toggleButtonState (inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass)
      buttonElement.disabled = true
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass)
      buttonElement.disabled = false
    }
  }

  // Функция добавляет обработчики всем полям формы и активирует кнопку
  _setEventListeners () {
    // Находим все поля внутри формы, и сделаем из них массив
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector))
    // Находим в текущей форме кнопку отправки
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector)
    inputList.forEach((inputElement) => {
      // Обходим массив и каждому полю добавляем обработчик события input
      inputElement.addEventListener('input', () => {
        // проверка полей на валидность и проверка кнопки
        this._checkInputValidity(inputElement)
        this._toggleButtonState(inputList, buttonElement)
      })
    })
  }

  // Добавить обработчик всем формам
  enableValidation () {
    this._setEventListeners()
  }
}
