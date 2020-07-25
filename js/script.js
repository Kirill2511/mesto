const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const cards = document.querySelector(".elements__container");
const cardTemplate = document.querySelector("#template-card").content;

for (let i = 0; i < initialCards.length; i++) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".element__image");
  const cardName = cardElement.querySelector(".element__title");

  cardImage.src = initialCards[i].link;
  cardName.textContent = initialCards[i].name;
  cards.append(cardElement);
}

const popup = document.querySelectorAll(".popup");
const nameInput = document.querySelector(".popup__name");
const aboutInput = document.querySelector(".popup__about");
const profileName = document.querySelector(".profile__title");
const profileAbout = document.querySelector(".profile__subtitle");
const image = document.querySelector(".popup__image");
const aboutImage = document.querySelector(".popup__card-about");
const edit = document.querySelector(".popup__edit-profile");
const addCard = document.querySelector(".popup__add-card");
const zoomCard = document.querySelector(".popup__card-image");
const formCard = document.querySelector(".popup__fields-card");
const formElement = document.querySelector(".popup__fields");

document.addEventListener("click", function (e) {
  // Открытие и закрытие по кнопке редактирования профиля
  if (e.target.classList.contains("profile__edit-button")) {
    edit.classList.toggle("popup_opened");
    edit.classList.toggle("popup_close");
    // Открытие и закрытие по кнопке добавить
  } else if (e.target.classList.contains("profile__add-button")) {
    addCard.classList.toggle("popup_opened");
    addCard.classList.toggle("popup_close");
    // Открытие картинки на экран
  } else if (e.target.classList.contains("element__image")) {
    zoomCard.classList.toggle("popup_opened");
    zoomCard.classList.toggle("popup_close");
    Image.src = e.target.src;
    aboutImage.textContent = e.target.parentNode.textContent;
    // Лайк
  } else if (e.target.classList.contains("element__heart")) {
    e.target.classList.toggle("element__heart_active");
    // Удаление
  } else if (e.target.classList.contains("element__delete")) {
    cards.removeChild(e.target.closest(".element"));
  }
});

// Открытие, закрытие попата
function popupClose() {
  for (let i = 0; popup.length > i; i++) {
    popup[i].classList.remove("popup_opened");
    popup[i].classList.add("popup_close");
  }
}

// Изменение имени и описания
function formSubmitHandler(e) {
  e.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  popupClose();
}

// Внесение изменений в имени и описания
function change() {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
}

change();

// Закрытие окна по крестику или по фону
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("popup__close-icon")) {
    popupClose();
  } else if (e.target.classList.contains("popup")) {
    popupClose();
  }
});

// Сохранение имени и описания
formElement.addEventListener("submit", formSubmitHandler);

// Добавление карточки
function addNewCard(e) {
  e.preventDefault();
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector(".element__title").textContent = document.querySelector(".popup__input-name").value;
  cardElement.querySelector(".element__image").src = document.querySelector(".popup__input-url").value;
  cards.prepend(cardElement);
  popupClose();
  document.querySelector(".popup__input-name").value = "";
  document.querySelector(".popup__input-url").value = "";
}

formCard.addEventListener("submit", addNewCard);
