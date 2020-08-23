import {
  initialCard,
  cards,
  popupNameInput,
  popupAboutInput,
  popupProfileName,
  popupProfileAbout,
  profileEditButton,
  profileAddButton,
  popupEditProfile,
  popupAddCard,
  popupFormCard,
  popupFormElement,
  popupButton,
  cardTitleInput,
  cardUrlInput,
  popupParameter
} from './constants.js'
import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js'

const profileValidator = new FormValidator(popupParameter, popupFormElement)
const cardValidator = new FormValidator(popupParameter, popupFormCard)

// Функция открытия и закрытия попата
export function openOrClosePopup (popup) {
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
profileEditButton.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('profile__edit-button')) {
    popupNameInput.value = popupProfileName.textContent
    popupAboutInput.value = popupProfileAbout.textContent
    profileValidator.clearError(popupEditProfile)
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
    cardValidator.clearError(popupAddCard)
    openOrClosePopup(popupAddCard)
  }
})

// Добавление карточки
function addNewCard (evt) {
  evt.preventDefault()
  const card = new Card(
    {
      name: cardTitleInput.value,
      link: cardUrlInput.value
    },
    '#template-card'
  ).generateCard()
  cards.prepend(card)

  openOrClosePopup(popupAddCard)
}

popupFormCard.addEventListener('submit', addNewCard)

// Перебор массива
initialCard.reverse().forEach((data) => {
  const card = new Card(data, '#template-card')
  const cardElement = card.generateCard()
  cards.prepend(cardElement)
})

// Вызов функций
profileValidator.enableValidation()
cardValidator.enableValidation()
