let popupOpenButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__button-close');

// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_about');
// Находим форму в DOM
let formElement = document.querySelector('.popup__container');
// Выберите элементы, куда должны быть вставлены значения полей
let accaunt_name = document.querySelector('.profile__name');
let accaunt_job = document.querySelector('.profile__about');

function popupOpen() {
    popup.classList.add('popup_opened');
    nameInput.value = accaunt_name.textContent;
    jobInput.value = accaunt_job.textContent;
}

function popupClose() {
    popup.classList.remove('popup_opened');
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
        evt.preventDefault(); 
                // Эта строчка отменяет стандартную отправку формы.
                // Так мы можем определить свою логику отправки.
                // О том, как это делать, расскажем позже.
    
                // Получите значение полей jobInput и nameInput из свойства value
        let new_name = nameInput.value;
                //console.log(new_name);
        let new_job = jobInput.value;
    
                // Вставьте новые значения с помощью textContent
        accaunt_name.textContent = new_name;
        accaunt_job.textContent = new_job;
        popupClose(); 
}


popupOpenButton.addEventListener('click', popupOpen);
popupCloseButton.addEventListener('click', popupClose);

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);