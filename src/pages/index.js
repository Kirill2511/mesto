import './index.css';
import Card from '../components/Card.js';

import {
	popupParameter,
	popupEdit,
	popupZoomCard,
	popupAddCard,
	profileButtonEdit,
	profileButtonAdd,
	nameInput,
	jobInput,
	profileJob,
	profileName,
	popupButtonAddCard,
	popupButtonEdit,
	popupDeleteCard,
	profileButtonAvatar,
	popupEditAvatar,
	popupButtonAvatar,
	profileAvatar,
	initialCards,
} from '../utils/constants.js';

import FormValidator from '../components/FormValidator.js';

import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';

// Валидация форм
const profileValidator = new FormValidator(popupParameter, popupEdit);
profileValidator.enableValidation();

const cardValidator = new FormValidator(popupParameter, popupAddCard);
cardValidator.enableValidation();

const avatarValidator = new FormValidator(popupParameter, popupEditAvatar);
avatarValidator.enableValidation();

// Api
const api = new Api({
	url: 'https://mesto.nomoreparties.co/v1/cohort-16',
	headers: {
		authorization: '4a48037a-5d1b-4b03-8646-b4d3a5383564',
		'Content-Type': 'application/json',
	},
});

// Создание попат зума
const imgPopup = new PopupWithImage(popupZoomCard);

// Информация о пользователе
const userProfile = new UserInfo({
	name: profileName,
	about: profileJob,
	avatar: profileAvatar,
});

// Получаем информацию с сервера
Promise.all([api.getUserInfo(), api.getInitialCards()])
	.then((values) => {
		const [userData, items] = values;
		userProfile.setUserData(userData.name, userData.about, userData._id, userData.avatar);
		const initialCardList = new Section(
			{
				items: items,
				renderer: (item) => {
					const card = new Card(
						{
							data: item,
							handleCardClick: globalHandleCardClick,
							handleLikeClick: globalHandleLikeCardClick,
							handleDeleteButtonClick: globalHandleDeleteCardClick,
						},
						userProfile.getUserId(),
						'#template-card',
					);
					const cardElement = card.generateCard();
					initialCardList.setItem(cardElement);
				},
			},
			'.elements__container',
		);
		initialCardList.renderItems();
	})
	.catch((err) => {
		console.log(err);
	});

// Открытие попата зума
const globalHandleCardClick = (data) => {
	imgPopup.open(data);
};

// Лайк и дизлайк
const globalHandleLikeCardClick = (card) => {
	if (card.isLiked()) {
		api
			.dislikeCard(card.id())
			.then((data) => {
				card.setLikesInfo(data);
			})
			.catch((err) => {
				console.log(err);
			});
	}
	else {
		api
			.likeCard(card.id())
			.then((data) => {
				card.setLikesInfo(data);
			})
			.catch((err) => {
				console.log(err);
			});
	}
};

// Удаление карточки
const globalHandleDeleteCardClick = (card) => {
	confirmPopup.open();
	confirmPopup.handlerSubmit(() => {
		confirmPopup.loading(true);
		api
			.deleteCard(card.id())
			.then((data) => {
				card.deleteElement(data);
				confirmPopup.close();
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				confirmPopup.loading(false);
			});
	});
};

// Рендер новой карточки
const renderCard = (item) => {
	const card = new Card(
		{
			data: item,
			handleCardClick: globalHandleCardClick,
			handleLikeClick: globalHandleLikeCardClick,
			handleDeleteButtonClick: globalHandleDeleteCardClick,
		},
		userProfile.getUserId(),
		'#template-card',
	);
	const cardElement = card.generateCard();
	addCardsList.addItem(cardElement);
	return card;
};

// Раздел для карточек
const addCardsList = new Section(
	{
		items: initialCards,
	},
	'.elements__container',
);

// Попат новой карточки
const cardPopup = new PopupWithForm(
	{
		handleFormSubmit: (item) => {
			cardPopup.loading(true);
			api
				.postNewCard(item)
				.then((item) => {
					renderCard(item);
					cardPopup.close();
				})
				.catch((err) => console.log(err))
				.finally(() => {
					cardPopup.loading(false);
				});
		},
	},
	popupAddCard,
);

// Попат редактирования информамции
const profilePopupEdit = new PopupWithForm(
	{
		handleFormSubmit: ({ name, about }) => {
			profilePopupEdit.loading(true);
			api
				.setUserInfo({
					name: name,
					about: about,
				})
				.then((res) => {
					userProfile.setUserData(res.name, res.about, res._id, res.avatar);
					profilePopupEdit.close();
				})
				.catch((err) => console.log(err))
				.finally(() => {
					profilePopupEdit.loading(false);
				});
		},
	},
	popupEdit,
);

// Попат обновление аватара
const avatarPopup = new PopupWithForm(
	{
		handleFormSubmit: ({ avatar }) => {
			avatarPopup.loading(true);
			api
				.setUserAvatar({
					avatar: avatar,
				})
				.then((res) => {
					userProfile.setUserData(res.name, res.about, res._id, res.avatar);
					avatarPopup.close();
				})
				.catch((err) => console.log(err))
				.finally(() => {
					avatarPopup.loading(false);
				});
		},
	},
	popupEditAvatar,
);

// Попат подтверждения удаления
const confirmPopup = new PopupWithConfirm(popupDeleteCard);

// Слушатели
imgPopup.setEventListeners();
cardPopup.setEventListeners();
profilePopupEdit.setEventListeners();
confirmPopup.setEventListeners();
avatarPopup.setEventListeners();

profileButtonAdd.addEventListener('click', () => {
	cardPopup.open();
	cardValidator.hideAllErrors();
	cardValidator.removeButtonActive(popupButtonAddCard);
});

profileButtonEdit.addEventListener('click', () => {
	const profileInfo = userProfile.getUserData();

	nameInput.value = profileInfo.name;
	jobInput.value = profileInfo.about;

	profileValidator.hideAllErrors();
	profileValidator.addButtonActive(popupButtonEdit);
	profilePopupEdit.open();
});

profileButtonAvatar.addEventListener('click', () => {
	avatarPopup.open();
	avatarValidator.hideAllErrors();
	avatarValidator.removeButtonActive(popupButtonAvatar);
});
