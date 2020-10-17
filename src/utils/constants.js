// Профиль
const profile = document.querySelector('.profile');
export const profileName = profile.querySelector('.profile__title');
export const profileJob = profile.querySelector('.profile__subtitle');
export const profileAvatar = profile.querySelector('.profile__avatar');
export const profileButtonAdd = profile.querySelector('.profile__add-button');
export const profileButtonEdit = profile.querySelector('.profile__edit-button');
export const profileButtonAvatar = profile.querySelector('.profile__edit-avatar');

// попап "Редактировать Аватар"
export const popupEditAvatar = document.querySelector('.popup__edit-avatar');
export const popupButtonAvatar = popupEditAvatar.querySelector('.popup__button');

// попап "Редактировать профиль"
export const popupEdit = document.querySelector('.popup_edit-profile');
export const popupFormEditProfile = popupEdit.querySelector('.popup__fields-edit');
export const nameInput = popupFormEditProfile.querySelector('.popup__name');
export const jobInput = popupFormEditProfile.querySelector('.popup__about');
export const popupButtonEdit = popupFormEditProfile.querySelector('.popup__button_edit-profile');

// попап "Добавить карточку"
export const popupAddCard = document.querySelector('.popup_add-card');
export const popupInputNewCardLink = popupAddCard.querySelector('.popup__input-url');
export const popupButtonAddCard = popupAddCard.querySelector('.popup__button_add-image');

// попап "Удаления карточки"
export const popupDeleteCard = document.querySelector('.popup__card-delete');

// попап "Зум"
export const popupZoomCard = document.querySelector('.popup_card-image');
export const closePopupImage = popupZoomCard.querySelector('.popup__close');

// Array of Initial Cards
export const initialCards = [];

export const popupParameter = {
	formSelector: '.popup__fields',
	inputSelector: '.popup__item',
	submitButtonSelector: '.popup__button',
	inactiveButtonClass: 'popup__button_disabled',
	inputErrorClass: 'popup__input_type_error',
	errorClass: 'popup__input-error_active',
};
