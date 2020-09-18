import './index.css'
import API from '../components/API.js'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithConfirm from '../components/PopupWithConfirm.js'
import UserInfo from '../components/UserInfo.js'

import {
  authorization,
  baseUrl,
  cardContainer,
  jobInput,
  nameInput,
  popupEditAvatar,
  popupButtonAddCard,
  popupButtonAvatar,
  popupButtonConfirm,
  popupButtonEdit,
  popupAddCard,
  popupDeleteCard,
  popupFormAvatar,
  popupFormCardNew,
  popupFormEditProfile,
  popupZoomCard,
  popupInputAvatarLink,
  popupInputNewCard,
  popupInputNewCardLink,
  popupParameter,
  popupEdit,
  profileAvatar,
  profileButtonAdd,
  profileButtonAvatar,
  profileButtonEdit,
  profileJob,
  profileName
} from '../utils/constants.js'

const api = new API({ baseUrl, authorization })

// Аватар
const handleAvatarFormSubmit = (formValues) => {
  return api.editUserAvatar(formValues).then((user) => profile.setUserAvatar(user))
}

const avatarPopup = new PopupWithForm(popupEditAvatar, handleAvatarFormSubmit)

const renderAvatarPopup = () => {
  popupButtonAvatar.disabled = true
  avatarValidator.clearError()
  popupInputAvatarLink.value = ''
  popupButtonAvatar.classList.add('popup__button_disabled')
  avatarPopup.open()
}

// Профиль
const profile = new UserInfo(profileName, profileJob, profileAvatar)

let initialUserId

function setInitialUserId (user) {
  initialUserId = user._id
}

function setInitialUser ({ avatar, name, about }) {
  profile.setUserInfo({ name, about })
  profile.setUserAvatar({ avatar })
}

api
  .getInitialUserInfo()
  .then((user) => {
    setInitialUserId(user)
    setInitialUser(user)
  })
  .catch((err) => {
    console.log(err)
  })

const handleProfileFormSubmit = (formValues) => {
  return api.editUserInfo(formValues).then((user) => profile.setUserInfo(user))
}

const profilePopup = new PopupWithForm(popupEdit, handleProfileFormSubmit)

const renderProfilePopup = () => {
  const { username, description } = profile.getUserInfo()
  nameInput.value = username
  jobInput.value = description

  profileValidator.clearError()
  popupButtonEdit.classList.remove('popup__button_disabled')

  const event = new Event('input')
  nameInput.dispatchEvent(event)
  jobInput.dispatchEvent(event)

  profilePopup.open()
}

// Инициализация картинок
const card = (cardItem) =>
  new Card(cardItem, '#template-card', api, {
    cardUserId: cardItem.owner._id,
    initialUserId: initialUserId,
    renderConfirmPopup: renderConfirmPopup,
    renderImgPopup: renderImgPopup
  })

const renderInitialCards = (cardList) => {
  const initialCardList = new Section(
    {
      items: cardList,
      renderer: (item) => {
        const cardElement = card(item).generateCard()
        initialCardList.addItem(cardElement)
      }
    },
    cardContainer
  )

  return initialCardList
}

api
  .getInitialCards()
  .then((cardList) => Promise.all(cardList))
  .then(renderInitialCards)
  .then((initialCardList) => initialCardList.renderItems())
  .catch((err) => {
    console.log(err)
  })

// Создать карточку
const addUserCard = (card, container) => {
  container.prepend(card)
}

const renderUserCard = (item) => {
  const cardElement = card(item).generateCard()
  addUserCard(cardElement, cardContainer)
}

const handleCardFormSubmit = (formValues) => {
  return api.postUserCard(formValues).then(renderUserCard)
}

const cardPopup = new PopupWithForm(popupAddCard, handleCardFormSubmit)

const renderCardPopup = () => {
  popupButtonAddCard.disabled = true
  popupButtonAddCard.classList.add('popup__button_disabled')
  popupInputNewCard.value = ''
  popupInputNewCardLink.value = ''
  cardValidator.clearError()
  cardPopup.open()
}

// Попат с зумом картинки
const imgPopup = new PopupWithImage(popupZoomCard)

const renderImgPopup = ({ link, name }) => {
  imgPopup.open({ link, name })
}

// Удаление карточки
const confirmPopup = new PopupWithConfirm(popupDeleteCard, popupButtonConfirm)

const renderConfirmPopup = (callback) => {
  confirmPopup.open(callback)
}

// Валидация форм
const profileValidator = new FormValidator(popupParameter, popupFormEditProfile)
const cardValidator = new FormValidator(popupParameter, popupFormCardNew)
const avatarValidator = new FormValidator(popupParameter, popupFormAvatar)

// СЛУШАТЕЛИ
profileButtonAdd.addEventListener('click', renderCardPopup)
profileButtonEdit.addEventListener('click', renderProfilePopup)
profileButtonAvatar.addEventListener('click', renderAvatarPopup)

// ВЫЗОВ ФУНКЦИЙ
profileValidator.enableValidation()
cardValidator.enableValidation()
avatarValidator.enableValidation()
