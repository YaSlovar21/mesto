import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor({formSubmitHandler,formElement}, popupSelector) {
        super(popupSelector);
        this._formSubmitHandler = formSubmitHandler;
        this._formElement = this._modal.querySelector(formElement);
    }

    //собираем поля формы
    _getInputValues() {
        // достаём все элементы полей
        this._inputList = this._formElement.querySelectorAll('.popup__input');
        console.log(this._inputList);

        // создаём пустой объект
        this._formValues = {};
          
            // добавляем в этот объект значения всех полей
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        console.log(this._formValues);
        // возвращаем объект значений
        return this._formValues;
    }
    

    close() {
        super.close();
        this._formElement.reset();
    }

    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._formSubmitHandler(this._getInputValues());
        });
    }
}