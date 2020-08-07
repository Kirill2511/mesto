const popupParameter = {
  formSelector: '.popup__fields',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

// Убрать ошибку, если пользователь закрыл попап и при этом ввел невалидные данные
function clearError (formElement) {
  arrayInputs(formElement).forEach((inputElement) =>
    hideInputError(formElement, inputElement, popupParameter.inputErrorClass, popupParameter.errorClass)
  )
}

// Функция добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {
  // Находим элемент ошибки внутри самой функции, тогда функция будет работать с любым полем внутри формы
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`)
  inputElement.classList.add(popupParameter.inputErrorClass)
  errorElement.textContent = errorMessage
  errorElement.classList.add(popupParameter.errorClass)
}
// Функция удаляет класс с ошибкой
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`)
  inputElement.classList.remove(popupParameter.inputErrorClass)
  errorElement.classList.remove(popupParameter.errorClass)
  errorElement.textContent = ''
}
// Функция проверяет валидность поля
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage)
  } else {
    hideInputError(formElement, inputElement)
  }
}
// Функция проверяет одновременную валидность всех полей одной формы
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  })
}
// Функция активации кнопки ("отправить" или "сохранить")
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(popupParameter.inactiveButtonClass)
    buttonElement.disabled = true
  } else {
    buttonElement.classList.remove(popupParameter.inactiveButtonClass)
    buttonElement.disabled = false
  }
}

// Функция добавляет обработчики всем полям формы и активирует кнопку
const setEventListeners = (formElement) => {
  // Находим все поля внутри формы, и сделаем из них массив
  const inputList = Array.from(formElement.querySelectorAll(popupParameter.inputSelector))
  // Находим в текущей форме кнопку отправки
  const buttonElement = formElement.querySelector(popupParameter.submitButtonSelector)
  inputList.forEach((inputElement) => {
    // Обходим массив и каждому полю добавляем обработчик события input
    inputElement.addEventListener('input', () => {
      // проверка полей на валидность и проверка кнопки
      checkInputValidity(formElement, inputElement)
      toggleButtonState(inputList, buttonElement)
    })
  })
}

// Функция валидации всех форм
const enableValidation = () => {
  const forms = Array.from(document.querySelectorAll(popupParameter.formSelector))
  forms.forEach((formElement) => {
    formElement.addEventListener('submit', (event) => {
      event.preventDefault()
    })
    setEventListeners(formElement)
  })
}
enableValidation(popupParameter)
