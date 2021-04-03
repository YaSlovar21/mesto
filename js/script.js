const accauntName = document.querySelector('.profile__name');
const accauntJob = document.querySelector('.profile__about');


let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_about');

const popupBack = document.querySelector('.popup');
const popupFormEdit = document.querySelector('#formProfile.popup__form');
const popupAddCard = document.querySelector('#formCard.popup__form');

const popupCloseButton = document.querySelector('.popup__button-close');
const popupProfileOpenButton = document.querySelector('.profile__edit-button');
const popupCardOpenButton = document.querySelector('.profile__add-button');

const popupImageContainer = document.querySelector('.popup__image-view');
const popupImage = popupImageContainer.querySelector('.popup__image');
const popupImageDesc = popupImageContainer.querySelector('.popup__image-description');


function popupOpen (){
        popupBack.classList.add('popup_opened');
        ///popupType.classList.add('popup_opened');
}

function popupClose (){
        popupBack.classList.remove('popup_opened');
        if (popupFormEdit.classList.contains('popup_opened')) {
                popupFormEdit.classList.remove('popup_opened');
        }
        if (popupAddCard.classList.contains('popup_opened')) {
                popupAddCard.classList.remove('popup_opened');
        }
        if (popupImageContainer.classList.contains('popup_opened')) {
                popupImageContainer.classList.remove('popup_opened');
                popupBack.classList.remove('popup_darked');
        }
}

function popupImageOpen (desc, link){
        popupImage.src=link;
        popupImageDesc.textContent = desc;
        popupOpen();
        popupBack.classList.add('popup_darked');
        popupImageContainer.classList.add('popup_opened');
}

popupProfileOpenButton.addEventListener('click', function () {
        popupOpen();
        nameInput.value = accauntName.textContent;
        jobInput.value = accauntJob.textContent;
        popupFormEdit.classList.add('popup_opened');
});

popupCardOpenButton.addEventListener('click', function () {
        popupOpen();
        popupAddCard.classList.add('popup_opened');
});

popupCloseButton.addEventListener('click', popupClose);

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
        cardElement.querySelector('.elements__image').alt = name;
        cardElement.querySelector('.elements__heading').textContent = name;

        cardElement.querySelector('.elements__like').addEventListener('click', function (evt) {
                evt.target.classList.toggle('elements__like_liked');
        });

        cardElement.querySelector('.elements__delete-button').addEventListener('click', function (evt) {
                const cardItem = this.closest('.elements__item');
                cardItem.remove();
        });
        cardElement.querySelector('.elements__image').addEventListener('click', function(evt){
                //console.log(evt.target.src);
                //console.log(evt.target.alt);
                popupImageOpen (evt.target.alt, evt.target.src);
        });
        cardsContainer.prepend(cardElement);
}


initialCards.reverse().forEach(element => {
        addCard(element.name, element.link);
});




const formProfile = document.querySelector('#formProfile');
const formCard = document.querySelector('#formCard');

function formProfileSubmitHandler(evt) {
        evt.preventDefault(); 

        let nameInput = document.querySelector('.popup__input_type_name');
        let jobInput = document.querySelector('.popup__input_type_about');

        let newName = nameInput.value;
        let newJob = jobInput.value;
    
        // Вставьте новые значения с помощью textContent
        accauntName.textContent = newName;
        accauntJob.textContent = newJob;
        popupClose(); 
        //ОЧИСТИТЬ ФОРМУ!!! 
        nameInput.value= '';
        jobInput.value= '';
}

function formCardSubmitHandler(evt) {
        evt.preventDefault(); 
        
        let name = document.querySelector('.popup__input_type_place');
        let link = document.querySelector('.popup__input_type_link');
        addCard(name.value,link.value);

        popupClose(); 
        //ОЧИСТИТЬ ФОРМУ!!!
        name.value = '';
        link.value = ''; 
}


formProfile.addEventListener('submit', formProfileSubmitHandler);
formCard.addEventListener('submit', formCardSubmitHandler);