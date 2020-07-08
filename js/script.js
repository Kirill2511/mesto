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

editButton.addEventListener('click', popupDisplay);
closeIcon.addEventListener('click', popupDisplay);

function formSubmitHandler(evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileAbout.textContent = aboutInput.value;

    popupDisplay();
}

formElement.addEventListener('submit', formSubmitHandler);