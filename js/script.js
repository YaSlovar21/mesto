/*

callback = document.querySelector('.up-footer__call');
popup_all = document.querySelector('#popupCards.popup');
popup_all_close_button = document.querySelector('#popupCards .popup__button-close');

callback.addEventListener('click', function(element) {
  popup_all.classList.add('popup_opened');
});

popup_all_close_button.addEventListener('click', function(element) {
  popup_all.classList.remove('popup_opened');
});

*/




let popupOpenButton = document.querySelector('.profile__edit-button');

let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__button-close');

// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_about');


// Находим форму в DOM
let formElement = document.querySelector('.popup__container');
// Выберите элементы, куда должны быть вставлены значения полей
let accauntName = document.querySelector('.profile__name');
let accauntJob = document.querySelector('.profile__about');

function popupOpen() {
    popup.classList.add('popup_opened');
    nameInput.value = accauntName.textContent;
    jobInput.value = accauntJob.textContent;
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
        let newName = nameInput.value;
                //console.log(newName);
        let newJob = jobInput.value;
    
                // Вставьте новые значения с помощью textContent
        accauntName.textContent = newName;
        accauntJob.textContent = newJob;
        popupClose(); 
}


popupOpenButton.addEventListener('click', popupOpen);
popupCloseButton.addEventListener('click', popupClose);

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);



//Спринт 5

const cardsContainer = document.querySelector('.elements');

const addCardButton = document.querySelector('.popup__button-save_type_card'); //vremenno

const initialCards = [
        {
          name: 'Архыз',
          link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
        },
        {
          name: 'Челябинская область',
          link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
        },
        {
          name: 'Иваново',
          link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
        },
        {
          name: 'Камчатка',
          link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
        },
        {
          name: 'Холмогорский район',
          link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
        },
        {
          name: 'Байкал',
          link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
        }
      ];



function addCard(name, link){
        const cardTemplate = document.querySelector('#card-template').content;
        const cardElement = cardTemplate.querySelector('.elements__item').cloneNode(true);

        cardElement.querySelector('.elements__image').src = link;
        cardElement.querySelector('.elements__heading').textContent = name;

        cardElement.querySelector('.elements__like').addEventListener('click', function (evt) {
                evt.target.classList.toggle('elements__like_liked');
        });

        cardElement.querySelector('.elements__delete-button').addEventListener('click', function (evt) {
                const cardItem = this.closest('.elements__item');
                cardItem.remove();
        });

        cardsContainer.append(cardElement);
}

//обработчик кнопки добавления новой карточки
addCardButton.addEventListener('click', function() {
        const name = document.querySelector('.popup__input_type_place');
        const link = document.querySelector('.popup__input_type_link');

        addCard(name.value, link.value);

        name.value = '';
        link.value = '';
});


initialCards.forEach(element => {
        addCard(element.name, element.link);
});