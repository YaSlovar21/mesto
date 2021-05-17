import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor({formSubmitHandler,formElement}, popupSelector) {
        super(popupSelector);
        //this._modal = document.querySelector(popupSelector);
        this._formSubmitHandler = formSubmitHandler;
        this._formElement = this._modal.querySelector(formElement);
        console.log('1' + this._modal.querySelector(formElement));

        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._formSubmitHandler();
        });
    }

    //собираем поля формы
    _getInputValues() {

    }

    open() {
        super.open();
    }
    close() {
        super.close();
        this._formElement.reset();
    }

    _setEventListeners() {
        super._setEventListeners();
        
    }
}