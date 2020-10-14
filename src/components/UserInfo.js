export default class UserInfo {
	constructor({ name, about, avatar }) {
		this._userName = name;
		this._userAbout = about;
		this._userAvatar = avatar;
	}

	getUserData() {
		this._userProfileData = {};
		this._userProfileData.name = this._userName.textContent;
		this._userProfileData.about = this._userAbout.textContent;
		return this._userProfileData;
	}

	getUserId() {
		return this._userId;
	}

	setUserData(name, about, userId, avatar) {
		this._userName.textContent = name;
		this._userAbout.textContent = about;
		this._userId = userId;
		this._userAvatar.src = avatar;
	}
}
