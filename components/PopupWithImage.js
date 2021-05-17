import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor({popupImageSelector, popupImageDescSelector}, popupSelector) {
        super(popupSelector)
        this._popupImage = document.querySelector(popupImageSelector);
        this._popupImageDesc = document.querySelector(popupImageDescSelector);
    }

    open(data) {
        this._popupImage.src = data.link;
        this._popupImage.alt = data.name;
        this._popupImageDesc.textContent = data.name;
        super.open();
    }
}