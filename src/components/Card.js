export default class Card {
  constructor ({ link, name, _id, likes }, cardSelector, api, { cardUserId, initialUserId, renderConfirmPopup, renderImgPopup }) {
    this._link = link
    this._name = name
    this._cardId = _id
    this._likes = likes
    this._cardSelector = cardSelector
    this._api = api
    this._cardUserId = cardUserId
    this._initialUserId = initialUserId
    this._renderConfirmPopup = renderConfirmPopup
    this._renderImgPopup = renderImgPopup

    this._handleCardClick = this._handleCardClick.bind(this)
    this._handleLikeButton = this._handleLikeButton.bind(this)
    this._handleDeleteButton = this._handleDeleteButton.bind(this)
  }

  // Вернуть разметку
  _getTemplate () {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true)

    this._card = cardElement
  }

  // Взять константы
  _getConst () {
    this._buttonLike = this._card.querySelector('.element__heart')
    this._image = this._card.querySelector('.element__image')
    this._imgName = this._card.querySelector('.element__title')
    this._countLikes = this._card.querySelector('.card__count-likes')
  }

  _handleCardClick () {
    this._renderImgPopup({
      link: this._link,
      name: this._name
    })
  }

  // Поставить лайк
  _handleLikeButton () {
    if (!this._buttonLike.classList.contains('element__heart_active')) { // +
      this._api.putLike(this._cardId)
        .then(item => {
          this._countLikes.textContent = item.likes.length
          this._buttonLike.classList.toggle('element__heart_active') // +
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      this._api.deleteLike(this._cardId)
        .then(item => {
          this._countLikes.textContent = item.likes.length
          this._buttonLike.classList.toggle('element__heart_active') // +
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  // Активировать лайк
  _activateLike () {
    this._likes.forEach(item => {
      if (item._id === this._initialUserId) {
        this._buttonLike.classList.add('element__heart_active') // +
      }
    })
  }

  // Установить слушатели событий
  _setEventListeners () {
    this._buttonLike.addEventListener('click', this._handleLikeButton)
    this._image.addEventListener('click', this._handleCardClick)
  }

  // Удалить карточку
  _deleteComponent () {
    if (this._cardUserId === this._initialUserId) {
      this._buttonDelete = this._card.querySelector('.element__delete')
      this._buttonDelete.classList.remove('element__delete_invisible')
      this._buttonDelete.addEventListener('click', this._handleDeleteButton)
    }
  }

  _deleteCard () {
    this._api.deleteCard(this._cardId)
      .then(() => {
        this._buttonLike.removeEventListener('click', this._handleLikeButton)
        this._buttonDelete.removeEventListener('click', this._handleDeleteButton)
        this._image.removeEventListener('click', this._handleCardClick)

        this._buttonDelete.closest('.element').remove()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  _handleDeleteButton () {
    this._renderConfirmPopup(this._deleteCard.bind(this))
  }

  // Подготовить карточку к публикации
  generateCard () {
    this._getTemplate()
    this._getConst()
    this._deleteComponent()
    this._setEventListeners()
    this._activateLike()

    this._image.src = this._link
    this._image.alt = this._name
    this._imgName.textContent = this._name
    this._countLikes.textContent = this._likes.length

    return this._card
  }
}
