export default class UserInfo {
  constructor (userName, userAbout, userAvatar) {
    this._name = userName
    this._about = userAbout
    this._avatar = userAvatar
  }

  getUserInfo () {
    return {
      username: this._name.textContent,
      description: this._about.textContent
    }
  }

  setUserAvatar ({ avatar }) {
    this._avatar.src = avatar
  }

  setUserInfo ({ name, about }) {
    this._avatar.alt = name
    this._name.textContent = name
    this._about.textContent = about
  }
}
