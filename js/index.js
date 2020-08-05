const cards = document.querySelector('.elements__container')

const nameInput = document.querySelector('.popup__name')
const aboutInput = document.querySelector('.popup__about')

const profileName = document.querySelector('.profile__title')
const profileAbout = document.querySelector('.profile__subtitle')

const image = document.querySelector('.popup__image')
const aboutImage = document.querySelector('.popup__card-about')
const edit = document.querySelector('.popup_edit-profile')
const addCard = document.querySelector('.popup_add-card')
const zoomCard = document.querySelector('.popup_card-image')
const formCard = document.querySelector('.popup__fields-card')
const formElement = document.querySelector('.popup__fields')
const popupButton = document.querySelector('.popup__button')

const cardTemplate = document.querySelector('#template-card').content

const cardTitleInput = document.querySelector('.popup__input-name')
const cardUrlInput = document.querySelector('.popup__input-url')

// массив из полей формы
const arrayInputs = (formElement) => Array.from(formElement.querySelectorAll('.popup__item'))

// Функция открытия и закрытия попата
function popupClose (popup) {
  popup.classList.toggle('popup_opened')

  if (popup.classList.contains('popup_opened')) {
    document.addEventListener('click', close)
    document.addEventListener('keydown', closeEsc)
  } else {
    document.removeEventListener('click', close)
    document.removeEventListener('keydown', closeEsc)
  }
}

// Закрыть по крестику и кликом по фону
function close (evt) {
  if (evt.target.classList.contains('popup__close-icon') || evt.target.classList.contains('popup')) {
    popupClose(evt.target.closest('.popup'))
  }
}

// Закрыть кнопкой Esc
function closeEsc (evt) {
  const popupOpened = document.querySelector('.popup_opened')
  if (evt.key === 'Escape' && popupOpened) {
    popupClose(popupOpened)
  }
}

// Убрать ошибку, если пользователь закрыл попап и при этом ввел невалидные данные
function clearError (formElement) {
  arrayInputs(formElement).forEach((inputElement) =>
    hideInputError(formElement, inputElement, PopupParameter.inputErrorClass, PopupParameter.errorClass)
  )
}

// Открытие по кнопке редактирования профиля
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('profile__edit-button')) {
    nameInput.value = profileName.textContent
    aboutInput.value = profileAbout.textContent
    clearError(edit)
    popupClose(edit)
    popupButton.classList.remove('popup__button_disabled')
  }
})

// Изменение имени и описания
function formSubmitHandler (e) {
  e.preventDefault()
  profileName.textContent = nameInput.value
  profileAbout.textContent = aboutInput.value
  popupClose(edit)
}

// Сохранение имени и описания
formElement.addEventListener('submit', formSubmitHandler)

// Открытие по кнопке добавить
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('profile__add-button')) {
    popupClose(addCard)
  }
})

// Открытие картинки на экран
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('element__image')) {
    popupClose(zoomCard)
    image.src = e.target.src
    aboutImage.textContent = e.target.parentNode.textContent
  }
})

// Добавление карточки
function addNewCard (e) {
  e.preventDefault()
  cards.prepend(
    createCards({
      name: cardTitleInput.value,
      link: cardUrlInput.value
    })
  )
  popupClose(addCard)
}

formCard.addEventListener('submit', addNewCard)

// Перебор массива
initialCards.reverse().forEach((data) => {
  renderCard(data)
})

// Рендер карточки
function renderCard (card) {
  cards.prepend(createCards(card))
}

// Лайк
document.addEventListener('click', function (event) {
  if (event.target.classList.contains('element__heart')) {
    event.target.classList.toggle('element__heart_active')
  }
})

// Удалить карточку
document.addEventListener('click', function (event) {
  if (event.target.classList.contains('element__delete')) {
    cards.removeChild(event.target.closest('.element'))
  }
})

// Создание карточки
function createCards (initialCards) {
  const cardElement = cardTemplate.cloneNode(true)
  const cardImage = cardElement.querySelector('.element__image')
  const cardName = cardElement.querySelector('.element__title')

  cardImage.src = initialCards.link
  cardImage.alt = initialCards.name
  cardName.textContent = initialCards.name

  return cardElement
}
