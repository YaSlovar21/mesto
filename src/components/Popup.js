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
                console.log(evt.target);
            }
        }
    }

    open() {
        this._modal.classList.add('popup_opened');
        this._modal.addEventListener('keydown',  this._handleEscButton);
        this._modal.addEventListener("mousedown", this._handleOverlayClick);
    }

    close() {
        this._modal.classList.remove('popup_opened');
        this._modal.removeEventListener('keydown',  this._handleEscButton);
        this._modal.removeEventListener("mousedown", this._handleOverlayClick);
    }

    setEventListeners(){
        this._modal
            .querySelector('.popup__button-close')
            .addEventListener('click', () => {
                this.close();
            })
    }
}