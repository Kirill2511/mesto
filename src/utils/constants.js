// Профиль
const profile = document.querySelector('.profile');
export const profileName = profile.querySelector('.profile__title');
export const profileJob = profile.querySelector('.profile__subtitle');
export const profileAvatar = profile.querySelector('.profile__avatar');
export const openModalAdd = profile.querySelector('.profile__add-button');
export const openModalEdit = profile.querySelector('.profile__edit-button');
export const profileAvatarButton = profile.querySelector('.profile__edit-avatar');

// попап "Редактировать Аватар"
export const modalAvatar = document.querySelector('.popup__edit-avatar');
export const popupFormAvatar = modalAvatar.querySelector('.popup__form-avatar');
export const popupInputAvatarLink = modalAvatar.querySelector('.popup__input_avatar-link');
export const avatarSubmit = modalAvatar.querySelector('.popup__button');

// Карточки
export const cardContainer = document.querySelector('.elements__container');

// попап "Редактировать профиль"
export const modalEdit = document.querySelector('.popup_edit-profile');
export const popupFormEditProfile = modalEdit.querySelector('.popup__fields-edit');
export const nameInput = popupFormEditProfile.querySelector('.popup__name');
export const jobInput = popupFormEditProfile.querySelector('.popup__about');
export const modalEditSave = popupFormEditProfile.querySelector('.popup__button_edit-profile');

// попап "Добавить карточку"
export const modalAdd = document.querySelector('.popup_add-card');
export const popupFormCardNew = modalAdd.querySelector('.popup__fields-card');
export const popupInputNewCard = modalAdd.querySelector('.popup__input-name');
export const popupInputNewCardLink = modalAdd.querySelector('.popup__input-url');
export const modalAddSave = modalAdd.querySelector('.popup__button_add-image');

// попап "Удаления карточки"
export const modalDelete = document.querySelector('.popup__card-delete');
export const popupButtonConfirm = modalDelete.querySelector('.popup__button_card-delete');

// попап "Зум"
export const modalImage = document.querySelector('.popup_card-image');
export const closeModalImage = modalImage.querySelector('.modal__close-button');
export const modalImageFull = modalImage.querySelector('.popup__image');
export const modalImageCaption = modalImage.querySelector('.popup__card-about');

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

export const baseUrl = 'https://mesto.nomoreparties.co/v1/cohort-16';
export const authorization = '4a48037a-5d1b-4b03-8646-b4d3a5383564';
