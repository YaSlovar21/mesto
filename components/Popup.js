import {ESC_CODE} from '../utils/constants.js';

export default class Popup {
    constructor(popupSelector) {
        this._modal = document.querySelector(popupSelector);
        
        this._handleEscButton = (evt) => {
            if (evt.key === ESC_CODE) {
                this.close();
            }
        }
        
        this._handleOverlayClick = (evt) => {
            if (evt.target.classList.contains('popup_opened')) {
                this.close();
            }
        }
        this._setEventListeners();
    }

    open() {
        this._modal.classList.add('popup_opened');
        document.addEventListener('keydown',  this._handleEscButton);
        document.addEventListener("click", this._handleOverlayClick);
    }

    close() {
        this._modal.classList.remove('popup_opened');
        document.removeEventListener('keydown',  this._handleEscButton);
        document.removeEventListener("click", this._handleOverlayClick);
    }

    _setEventListeners(){
        this._modal
            .querySelector('.popup__button-close')
            .addEventListener('click', () => {
                this.close();
            })
    }
}