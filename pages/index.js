import { initialCards,
  profileModalSelector,
  cardAddModalSelector,
  popupImageSelector,
  cardsContainerSelector,
  cardTemplateSelector} from '../utils/constants.js';

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';


const popupProfileOpenButton = document.querySelector(".profile__edit-button");
const popupCardOpenButton = document.querySelector(".profile__add-button");


const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_about");


//const accountName = document.querySelector(".profile__name");
//const accountJob = document.querySelector(".profile__about");
const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userAboutSelector: '.profile__about'
});

const profileModal = new PopupWithForm({
  formSubmitHandler: (evt) => {
    //evt.preventDefault();
    const newName = nameInput.value;
    const newAbout = jobInput.value;

    //accountName.textContent = newName;
    //accountJob.textContent = newJob;
    userInfo.setUserInfo({
      name: newName,
      about: newAbout,
    })
    profileModal.close();
    //reset в классе!!
    //formProfile.reset();
  },
  formElement: '#formProfile', 
}, profileModalSelector)


const cardAddModal = new PopupWithForm({
  formSubmitHandler: () => {
    //evt.preventDefault();
    const name = document.querySelector(".popup__input_type_place");
    const link = document.querySelector(".popup__input_type_link");
    const buttonCard = document.querySelector(".popup__button-save_type_card");

    const card = createCard(name.value, link.value);
    addCard(card, cardsContainer);

    cardAddModal.close();
    buttonCard.classList.add('popup__button-save_disabled');
    buttonCard.setAttribute('disabled', true);

    //formCard.reset();
  },
  formElement: '#formCard',
}, cardAddModalSelector)


//картинка+подпись в модальном imageModal
//const popupImage = imageModal.querySelector(".popup__image");
//const popupImageDesc = imageModal.querySelector(".popup__image-description");
const popupImage = new PopupWithImage({
  popupImageSelector: '.popup__image',
  popupImageDescSelector: '.popup__image-description'
}, popupImageSelector)

//новая версия popupImageOpen
function handleImageClick(desc, link) {
  popupImage.open({
    link: link,
    name: desc,
  })
}

function createCard(name, link) {
  const card = new Card(name, link, cardTemplateSelector, handleImageClick);
  const cardToAdd = card.generateCard();
  return cardToAdd;
}

function addCard(card, container) {
  container.prepend(card);
}

const cardsContainer = document.querySelector(".elements");

const cardList = new Section({
  data: initialCards,
  renderer: (item) => {
    const card = createCard(item.name, item.link);
    addCard(card, cardsContainer);
  }
}, cardsContainerSelector);


cardList.renderItems(initialCards);


popupProfileOpenButton.addEventListener("click", () => {
  profileModal.open();
});
popupCardOpenButton.addEventListener("click", ()=> {
  cardAddModal.open();
});

const formList = Array.from(document.querySelectorAll('.popup__form'));
formList.forEach((formElement) => {
  const formValidator = new FormValidator({
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_visible'
  }, formElement);
  formValidator.enableValidation();
}); 



