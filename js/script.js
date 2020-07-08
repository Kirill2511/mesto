let content = document.querySelector('.content');
let formElement = document.querySelector('.popup');
let editButton = content.querySelector('.profile__edit-button');
let closeIcon = document.querySelector('.popup__close-icon');

let nameInput = document.querySelector('.popup__name');
let aboutInput = document.querySelector('.popup__about');

let profileName = content.querySelector('.profile__title');
let profileAbout = content.querySelector('.profile__subtitle');

function popupDisplay() {
    formElement.classList.toggle('popup_close')
}

function formSubmitHandler(evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileAbout.textContent = aboutInput.value;

    popupDisplay();
}

editButton.addEventListener('click', popupDisplay);

nameInput.value = profileName.textContent;
aboutInput.value = profileAbout.textContent;

formElement.addEventListener('submit', formSubmitHandler);

closeIcon.addEventListener('click', popupDisplay);