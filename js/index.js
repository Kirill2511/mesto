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
import { openOrClosePopup } from './utils.js'

const profileValidator = new FormValidator(popupParameter, popupFormElement)
const cardValidator = new FormValidator(popupParameter, popupFormCard)

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
