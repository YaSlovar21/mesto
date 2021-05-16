export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        
        this._handleEscButton = (evt) => {
            if (evt.key === ESC_CODE) {
                this. ();
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
        this._popupSelector.classList.add('popup_opened');
        document.addEventListener('keydown', )
    }

    close() {

    }

    _setEventListeners(){
        this._popupSelector
            .querySelector('.button-close')
            .addEventListener('click', () => {
                this.close();
            })
    }
}