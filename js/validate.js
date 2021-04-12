// создать классы
// popup__input-error_visible
// popup__input_type_error  // подправить цвет
// popup__button-save_disabled

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error_visible');
  };
  
  const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__input-error_visible');
    errorElement.textContent = '';
  };
  
  const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  };
  
  const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add('popup__button-save_disabled');
    } else {
      buttonElement.classList.remove('popup__button-save_disabled');
    }
  };
  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }
  
  //переработать логику

  const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.form__input'));
    const buttonElement = formElement.querySelector('.form__submit');
    toggleButtonState(inputList, buttonElement);
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  };
  
  const enableValidation = (parameters) => {
    const formList = Array.from(document.querySelectorAll(parameters.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      
      const fieldsetList = Array.from(formElement.querySelectorAll('.form__set'));
      fieldsetList.forEach((fieldSet) => {
            setEventListeners(fieldSet);
      });
    });
  };
  
  enableValidation();

  enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: '.popup__button-save_disabled',
    inputErrorClass: '.popup__input_type_error',
    errorClass: '.popup__error_visible'
  });