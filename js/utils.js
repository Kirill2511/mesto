// Функция открытия и закрытия попата
function openOrClosePopup (popup) {
  popup.classList.toggle('popup_opened')

  if (popup.classList.contains('popup_opened')) {
    document.addEventListener('click', closePopup)
    document.addEventListener('keydown', closePopupEsc)
  } else {
    document.removeEventListener('click', closePopup)
    document.removeEventListener('keydown', closePopupEsc)
  }
}

// Закрыть по крестику и кликом по фону
function closePopup (evt) {
  if (evt.target.classList.contains('popup__close-icon') || evt.target.classList.contains('popup')) {
    openOrClosePopup(evt.target.closest('.popup'))
  }
}

// Закрыть кнопкой Esc
function closePopupEsc (evt) {
  const popupClose = document.querySelector('.popup_opened')
  if (evt.key === 'Escape' && popupClose) {
    openOrClosePopup(popupClose)
  }
}

export { openOrClosePopup }
