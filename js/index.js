const cards = document.querySelector('.elements__container')

const popupNameInput = document.querySelector('.popup__name')
const popupAboutInput = document.querySelector('.popup__about')

const popupProfileName = document.querySelector('.profile__title')
const popupProfileAbout = document.querySelector('.profile__subtitle')

const popupImage = document.querySelector('.popup__image')
const popupAboutImage = document.querySelector('.popup__card-about')
const popupEditProfile = document.querySelector('.popup_edit-profile')
const popupAddCard = document.querySelector('.popup_add-card')
const popupZoomCard = document.querySelector('.popup_card-image')
const popupFormCard = document.querySelector('.popup__fields-card')
const popupFormElement = document.querySelector('.popup__fields')
const popupButton = document.querySelector('.popup__button')

const cardTemplate = document.querySelector('#template-card').content

const cardTitleInput = document.querySelector('.popup__input-name')
const cardUrlInput = document.querySelector('.popup__input-url')

// массив из полей формы
const arrayInputs = (formElement) => Array.from(formElement.querySelectorAll('.popup__item'))

// Функция открытия и закрытия попата
function popupToggle (popup) {
  popup.classList.toggle('popup_opened')

  if (popup.classList.contains('popup_opened')) {
    document.addEventListener('click', closeBackgroundAndIcon)
    document.addEventListener('keydown', closeEsc)
  } else {
    document.removeEventListener('click', closeBackgroundAndIcon)
    document.removeEventListener('keydown', closeEsc)
  }
}

// Закрыть по крестику и кликом по фону
function closeBackgroundAndIcon (evt) {
  if (evt.target.classList.contains('popup__close-icon') || evt.target.classList.contains('popup')) {
    popupToggle(evt.target.closest('.popup'))
  }
}

// Закрыть кнопкой Esc
function closeEsc (evt) {
  const popupOpened = document.querySelector('.popup_opened')
  if (evt.key === 'Escape' && popupOpened) {
    popupToggle(popupOpened)
  }
}

// Открытие по кнопке редактирования профиля
document.querySelector('.profile__edit-button').addEventListener('click', (e) => {
  if (e.target.classList.contains('profile__edit-button')) {
    popupNameInput.value = popupProfileName.textContent
    popupAboutInput.value = popupProfileAbout.textContent
    clearError(popupEditProfile)
    popupToggle(popupEditProfile)
    popupButton.classList.remove('popup__button_disabled')
  }
})

// Изменение имени и описания
function formSubmitHandler (e) {
  e.preventDefault()
  popupProfileName.textContent = popupNameInput.value
  popupProfileAbout.textContent = popupAboutInput.value
  popupToggle(popupEditProfile)
}

// Сохранение имени и описания
popupFormElement.addEventListener('submit', formSubmitHandler)

// Открытие по кнопке добавить
document.querySelector('.profile__add-button').addEventListener('click', (e) => {
  if (e.target.classList.contains('profile__add-button')) {
    popupToggle(popupAddCard)
  }
})

// Добавление карточки
function addNewCard (e) {
  e.preventDefault()
  cards.prepend(
    createCard({
      name: cardTitleInput.value,
      link: cardUrlInput.value
    })
  )
  popupToggle(popupAddCard)
}

popupFormCard.addEventListener('submit', addNewCard)

// Перебор массива
initialCards.reverse().forEach((data) => {
  renderCard(data)
})

// Рендер карточки
function renderCard (card) {
  cards.prepend(createCard(card))
}

// Создание карточки
function createCard (initialCards) {
  const cardElement = cardTemplate.cloneNode(true)
  const cardImage = cardElement.querySelector('.element__image')
  const cardName = cardElement.querySelector('.element__title')
  const cardCell = cardElement.querySelector('.element')

  const cardDeleteButton = cardElement.querySelector('.element__delete')
  const cardHeartButton = cardElement.querySelector('.element__heart')

  cardImage.src = initialCards.link
  cardImage.alt = initialCards.name
  cardName.textContent = initialCards.name

  // Удалить карточку
  cardDeleteButton.addEventListener('click', () => {
    cardCell.remove()
  })

  // Лайк
  cardHeartButton.addEventListener('click', () => {
    cardHeartButton.classList.toggle('element__heart_active')
  })

  // Открытие картинки на экран
  cardImage.addEventListener('click', (evt) => {
    popupAboutImage.textContent = evt.target.alt
    popupImage.src = evt.target.src
    popupImage.alt = evt.target.alt
    popupToggle(popupZoomCard)
  })

  return cardElement
}
