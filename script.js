const initialCards = [
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
];

let content = document.querySelector('.content');
let formElement = document.querySelector('.popup');
let editButton = content.querySelector('.profile__edit-button');
let closeIcon = document.querySelector('.popup__close-icon');

function popupDisplay() {
    formElement.classList.toggle('popup_opened')
}

function formSubmitHandler(evt) {
    evt.preventDefault();

    let nameInput = document.querySelector('.popup__name');
    let aboutInput = document.querySelector('.popup__about');
    let newName;
    let newAbout;

    newName = nameInput.value;
    newAbout = aboutInput.value;

    let profileName = content.querySelector('.profile__title');
    let profileAbout = content.querySelector('.profile__subtitle');

    profileName.textContent = newName;
    profileAbout.textContent = newAbout;

    popupDisplay();
}

editButton.addEventListener('click', popupDisplay);
closeIcon.addEventListener('click', popupDisplay);

formElement.addEventListener('submit', formSubmitHandler);