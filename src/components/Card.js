export default class Card {
  constructor (data, cardSelector, handleCardClick) {
    this._name = data.name
    this._link = data.link
    this._cardSelector = cardSelector
    this._handleCardClick = handleCardClick
    this._likeCard = this._likeCard.bind(this)
    this._deleteCard = this._deleteCard.bind(this)
  }

  // Разметка карточки
  _getTemplate () {
    return document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true)
  }

  // Удалить карточку
  _deleteCard () {
    this._card.remove()
  }

  // Лайк
  _likeCard () {
    this._card.querySelector('.element__heart').classList.toggle('element__heart_active')
  }

  // Обработка событий
  _setEventListeners () {
    this._card.querySelector('.element__delete').addEventListener('click', this._deleteCard)
    this._card.querySelector('.element__heart').addEventListener('click', this._likeCard)
    this._card.querySelector('.element__image').addEventListener('click', this._handleCardClick)
  }

  // Генерация карточки
  generateCard () {
    this._card = this._getTemplate()

    this._imgage = this._card.querySelector('.element__image')
    this._imageTitle = this._card.querySelector('.element__title')

    this._imageTitle.textContent = this._name
    this._imgage.src = this._link
    this._imgage.alt = this._name

    this._setEventListeners()

    return this._card
  }
}
