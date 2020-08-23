import { popupAboutImage, popupImage, popupZoomCard } from './constants.js'
import { openOrClosePopup } from './index.js'

export class Card {
  constructor (data, cardElements) {
    this._name = data.name
    this._link = data.link
    this._cardElements = cardElements
  }

  // Разметка карточки
  _getTemplate () {
    const card = document.querySelector(this._cardElements).content.querySelector('.element').cloneNode(true)

    return card
  }

  // Удалить карточку
  _deleteCard (evt) {
    const card = evt.target.closest('.element')

    card.remove()
  }

  // Лайк
  _likeCard (evt) {
    evt.target.classList.toggle('element__heart_active')
  }

  // Зум картинки
  _zoomCard (evt) {
    popupAboutImage.textContent = evt.target.alt
    popupImage.src = evt.target.src
    popupImage.alt = evt.target.alt
    openOrClosePopup(popupZoomCard)
  }

  // Обработка событий
  _setEventListeners () {
    this._card.querySelector('.element__delete').addEventListener('click', this._deleteCard)
    this._card.querySelector('.element__heart').addEventListener('click', this._likeCard)
    this._card.querySelector('.element__image').addEventListener('click', this._zoomCard)
  }

  // Генерация карточки
  generateCard () {
    this._card = this._getTemplate()

    this._card.querySelector('.element__title').textContent = this._name
    this._card.querySelector('.element__image').src = this._link
    this._card.querySelector('.element__image').alt = this._name

    this._setEventListeners()

    return this._card
  }
}
