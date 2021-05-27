export default class UserInfo {
    constructor({userNameSelector, userAboutSelector, avatarSelector}) {
        this._accountName = document.querySelector(userNameSelector);
        this._accountAbout = document.querySelector(userAboutSelector);
        this._avatar = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        return {
            name: this._accountName.textContent,
            about: this._accountAbout.textContent,
            avatar: this._avatar.src,
        }
    }

    setUserInfo(data) {
        if (data.name) {
            this._accountName.textContent = data.name;
        }
        if (data.about) {
            this._accountAbout.textContent = data.about;
        }
        if (data.avatar) {
            this._avatar.src = data.avatar; //при редактировании имя и описания тут НУЛЛ
        }
    }

    updateAvatar(link) {
        if (link) {
            this._avatar.src = link;
        }
    }
}