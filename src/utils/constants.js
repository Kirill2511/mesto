const initialCard = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]

const cards = document.querySelector('.elements__container')

const popupNameInput = document.querySelector('.popup__name')
const popupAboutInput = document.querySelector('.popup__about')

const popupProfileName = document.querySelector('.profile__title')
const popupProfileAbout = document.querySelector('.profile__subtitle')

const profileEditButton = document.querySelector('.profile__edit-button')
const profileAddButton = document.querySelector('.profile__add-button')

const popupFormCard = document.querySelector('.popup__fields-card')
const popupFormElement = document.querySelector('.popup__fields')
const popupButton = document.querySelector('.popup__button')
const popupButtonAddCard = document.querySelector('.popup__button_add-image')

const cardTitleInput = document.querySelector('.popup__input-name')
const cardUrlInput = document.querySelector('.popup__input-url')

const popupParameter = {
  formSelector: '.popup__fields',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

export {
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
}