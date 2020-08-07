const cards = document.querySelector('.elements__container')

const popupNameInput = document.querySelector('.popup__name')
const popupAboutInput = document.querySelector('.popup__about')

const popupProfileName = document.querySelector('.profile__title')
const popupProfileAbout = document.querySelector('.profile__subtitle')

const profileEditButton = document.querySelector('.profile__edit-button')
const profileAddButton = document.querySelector('.profile__add-button')

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
function openOrClosePopup (popup) {
  popup.classList.toggle('popup_opened')

  if (popup.classList.contains('popup_opened')) {
    document.addEventListener('click', closePopup)
    document.addEventListener('keydown', closePopupEsc)
  } else {
    document.removeEventListener('click', closePopup)
    document.removeEventListener('keydown', closePopupEsc)
  }
}

// Закрыть по крестику и кликом по фону
function closePopup (evt) {
  if (evt.target.classList.contains('popup__close-icon') || evt.target.classList.contains('popup')) {
    openOrClosePopup(evt.target.closest('.popup'))
  }
}

// Закрыть кнопкой Esc
function closePopupEsc (evt) {
  const popupClose = document.querySelector('.popup_opened')
  if (evt.key === 'Escape' && popupClose) {
    openOrClosePopup(popupClose)
  }
}

// Открытие по кнопке редактирования профиля
profileEditButton.addEventListener('click', (e) => {
  if (e.target.classList.contains('profile__edit-button')) {
    popupNameInput.value = popupProfileName.textContent
    popupAboutInput.value = popupProfileAbout.textContent
    clearError(popupEditProfile)
    openOrClosePopup(popupEditProfile)
    popupButton.classList.remove('popup__button_disabled')
  }
})

// Изменение имени и описания
function formSubmitHandler (e) {
  e.preventDefault()
  popupProfileName.textContent = popupNameInput.value
  popupProfileAbout.textContent = popupAboutInput.value
  openOrClosePopup(popupEditProfile)
}

// Сохранение имени и описания
popupFormElement.addEventListener('submit', formSubmitHandler)

// Открытие по кнопке добавить
profileAddButton.addEventListener('click', (e) => {
  if (e.target.classList.contains('profile__add-button')) {
    openOrClosePopup(popupAddCard)
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
  openOrClosePopup(popupAddCard)
}

popupFormCard.addEventListener('submit', addNewCard)

// Перебор массива
initialCard.reverse().forEach((data) => {
  renderCard(data)
})

// Рендер карточки
function renderCard (card) {
  cards.prepend(createCard(card))
}

// Создание карточки
function createCard (initialCard) {
  const cardElement = cardTemplate.cloneNode(true)
  const cardImage = cardElement.querySelector('.element__image')
  const cardName = cardElement.querySelector('.element__title')
  const cardCell = cardElement.querySelector('.element')

  const cardDeleteButton = cardElement.querySelector('.element__delete')
  const cardHeartButton = cardElement.querySelector('.element__heart')

  cardImage.src = initialCard.link
  cardImage.alt = initialCard.name
  cardName.textContent = initialCard.name

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
    openOrClosePopup(popupZoomCard)
  })

  return cardElement
}
