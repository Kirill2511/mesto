import './index.css'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'
import UserInfo from '../components/UserInfo.js'

import {
  initialCard,
  popupNameInput,
  popupAboutInput,
  popupProfileName,
  popupProfileAbout,
  profileEditButton,
  profileAddButton,
  popupFormCard,
  popupFormEdit,
  popupButtonAddCard,
  popupButtonEditProfile,
  cardTitleInput,
  cardUrlInput,
  popupParameter
} from '../utils/constants.js'

// ФУНКЦИИ
const handleProfileFormSubmit = (formValues) => {
  userInfo.setUserInfo(formValues)
}

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
  popupButtonEditProfile.classList.remove('popup__button_disabled')

  profilePopup.open()
}

//  Карточки
const handleCardClick = (evt) => {
  popupWithImage.open(evt)
}

const createCard = (item) => {
  return new Card(item, '#template-card', handleCardClick).generateCard()
}

// Загрузка стартовых карточек
const cardsList = new Section(
  {
    items: initialCard.reverse(),
    renderer: (item) => {
      cardsList.addItem(createCard(item))
    }
  },
  '.elements__container'
)

const addNewCard = () => {
  cardsList.addItem(
    createCard({
      name: cardTitleInput.value,
      link: cardUrlInput.value
    })
  )
}

// Рендер новой карточки
const renderCardPopup = () => {
  popupButtonAddCard.disabled = true
  popupButtonAddCard.classList.add('popup__button_disabled')
  cardTitleInput.value = ''
  cardUrlInput.value = ''
  cardValidator.clearError()

  cardPopup.open()
}

const profileValidator = new FormValidator(popupParameter, popupFormEdit) // валидация инпутов попапа "Редактировать профиль"
const cardValidator = new FormValidator(popupParameter, popupFormCard) // валидация инпутов попапа "Добавить карточку"
const popupWithImage = new PopupWithImage('.popup_card-image') // попап с картинкой
const profilePopup = new PopupWithForm('.popup_edit-profile', handleProfileFormSubmit) // попап с формой "Редактировать профиль"
const cardPopup = new PopupWithForm('.popup_add-card', addNewCard) // попап с формой "Добавить карточку"

// СЛУШАТЕЛИ
profileEditButton.addEventListener('click', renderProfilePopup) // Рендер данных профиля
profileAddButton.addEventListener('click', renderCardPopup) // Рендер новой карточки

// ВЫЗОВ ФУНКЦИЙ
cardsList.renderItems() // Загрузка карточек
profileValidator.enableValidation() // Валидация полей у попапа "Редактировать профиль"
cardValidator.enableValidation() // Валидация полей у попапа "Добавить карточку"
