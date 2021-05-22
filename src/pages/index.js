import logo from '../images/logo-mesto.svg';
import addbutton from '../images/profile-plus.svg';
import profiltAva  from '../images/profile__avatar.jpg';

import '../pages/index.css';

import { initialCards,
  profileModalSelector,
  cardAddModalSelector,
  popupImageSelector,
  cardsContainerSelector,
  cardTemplateSelector,
  popupProfileOpenButton, 
  popupCardOpenButton,
  buttonCard, //кнопка сабмита формы добавления карточки 

  //используются только при открытии формы измнения данных о пользователе
  nameInput, //поле ввода формы изменения данных о профиле
  jobInput   //поле ввода формы изменения данных о профиле
} from '../utils/constants.js';

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';


//const accountName = document.querySelector(".profile__name");
//const accountJob = document.querySelector(".profile__about");
const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userAboutSelector: '.profile__about'
});

function createCard(name, link) {
  const card = new Card(name, link, cardTemplateSelector, handleImageClick);
  const cardToAdd = card.generateCard();
  return cardToAdd;
}

const cardList = new Section({
  data: initialCards,
  renderer: (item) => {
    const card = createCard(item.name, item.link);
    //addCard(card, cardsContainer);
    cardList.setItem(card);
  }
}, cardsContainerSelector);


cardList.renderItems(initialCards);

const profileModal = new PopupWithForm({
  formSubmitHandler: (formProfileData) => {
    const newName = formProfileData.name;
    const newAbout = formProfileData.about;
    userInfo.setUserInfo({
      name: newName,
      about: newAbout,
    })
    profileModal.close();
    //reset в классе!!
  },
  formElement: '#formProfile', 
}, profileModalSelector)

profileModal.setEventListeners();

const cardAddModal = new PopupWithForm({
  formSubmitHandler: (formCardData) => {
    const card = createCard(formCardData.name, formCardData.link);

    cardList.setItem(card);
    cardAddModal.close();

    buttonCard.classList.add('popup__button-save_disabled');
    buttonCard.setAttribute('disabled', true);
  },
  formElement: '#formCard',
}, cardAddModalSelector)

cardAddModal.setEventListeners();

//картинка+подпись в модальном imageModal
//const popupImage = imageModal.querySelector(".popup__image");
//const popupImageDesc = imageModal.querySelector(".popup__image-description");
const popupImage = new PopupWithImage({
  popupImageSelector: '.popup__image',
  popupImageDescSelector: '.popup__image-description'
}, popupImageSelector)

popupImage.setEventListeners();

//новая версия popupImageOpen
function handleImageClick(desc, link) {
  popupImage.open({
    link: link,
    name: desc,
  })
}

popupProfileOpenButton.addEventListener("click", () => {
  const profileInfo = userInfo.getUserInfo();
  nameInput.value = profileInfo.name;
  jobInput.value = profileInfo.about;
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



