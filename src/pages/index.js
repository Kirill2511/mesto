import './index.css'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'
import UserInfo from '../components/UserInfo.js'

import {
  initialCard,
  cards,
  popupNameInput,
  popupAboutInput,
  popupProfileName,
  popupProfileAbout,
  profileEditButton,
  profileAddButton,
  popupFormCard,
  popupFormElement,
  popupButton,
  popupButtonAddCard,
  cardTitleInput,
  cardUrlInput,
  popupParameter
} from '../utils/constants.js'

// ФУНКЦИИ
const handleProfileFormSubmit = (formValues) => {
  userInfo.setUserInfo(formValues)
}

const addNewCard = () => {
  const inputValues = {
    name: cardTitleInput.value,
    link: cardUrlInput.value
  }

  const card = new Card(inputValues, '#template-card', handleCardClick).generateCard()
  cards.prepend(card)
}

const profileValidator = new FormValidator(popupParameter, popupFormElement) // валидация инпутов попапа "Редактировать профиль"
const cardValidator = new FormValidator(popupParameter, popupFormCard) // валидация инпутов попапа "Добавить карточку"
const popupWithImage = new PopupWithImage('.popup_card-image') // попап с картинкой
const profilePopup = new PopupWithForm('.popup_edit-profile', handleProfileFormSubmit) // попап с формой "Редактировать профиль"
const cardPopup = new PopupWithForm('.popup_add-card', addNewCard) // попап с формой "Добавить карточку"

const userInfo = new UserInfo({
  userName: popupProfileName,
  userDescription: popupProfileAbout
})

// Рендер данных профиля
const renderProfilePopup = () => {
  const profileElement = userInfo.getUserInfo()

  popupNameInput.value = profileElement.name
  popupAboutInput.value = profileElement.about

  profileValidator.clearError()
  popupButton.classList.remove('popup__button_disabled')

  profilePopup.open()
}

//  Карточки
const handleCardClick = (evt) => {
  popupWithImage.open(evt)
}

// Загрузка стартовых карточек
const cardsList = new Section(
  {
    items: initialCard,
    renderer: (item) => {
      const card = new Card(item, '#template-card', handleCardClick).generateCard()
      cardsList.addItem(card)
    }
  },
  '.elements__container'
)

// Рендер новой карточки
const renderCardPopup = () => {
  popupButtonAddCard.disabled = true
  popupButtonAddCard.classList.add('popup__button_disabled')
  cardTitleInput.value = ''
  cardUrlInput.value = ''
  cardValidator.clearError()

  cardPopup.open()
}

// СЛУШАТЕЛИ
profileEditButton.addEventListener('click', renderProfilePopup) // Рендер данных профиля
profileAddButton.addEventListener('click', renderCardPopup) // Рендер новой карточки

// ВЫЗОВ ФУНКЦИЙ
cardsList.renderItems() // Загрузка карточек
profileValidator.enableValidation() // Валидация полей у попапа "Редактировать профиль"
cardValidator.enableValidation() // Валидация полей у попапа "Добавить карточку"
