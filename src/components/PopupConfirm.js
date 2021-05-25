import Popup from './Popup.js';

export default class PopupConfirm extends Popup {
    constructor({formSubmitHandler,formElement}, popupSelector) {
        super(popupSelector);
        this._formElement = this._modal.querySelector(formElement);
    }

    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._formSubmitHandler();
        });
    }

    setDefaultSubmitHandler(handleDeleteSubmit) {
        this._formSubmitHandler = handleDeleteSubmit;
    }
}