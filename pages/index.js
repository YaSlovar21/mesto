import { initialCards } from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';

const accountName = document.querySelector(".profile__name");
const accountJob = document.querySelector(".profile__about");

const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_about");

//кнопки для открытия попапа
const popupProfileOpenButton = document.querySelector(".profile__edit-button");
const popupCardOpenButton = document.querySelector(".profile__add-button");

//3 попапа
const profileModal = document.querySelector(".popup-profile");
const cardAddModal = document.querySelector(".popup-card");
const imageModal = document.querySelector(".popup-viewport");

//картинка+подпись в модальном imageModal
const popupImage = imageModal.querySelector(".popup__image");
const popupImageDesc = imageModal.querySelector(".popup__image-description");

function openModal(modal) {
  modal.classList.add("popup_opened");
  document.addEventListener('keydown',  closeByEsc);
}

function closeModal(modal) {
  modal.classList.remove("popup_opened");
  document.removeEventListener('keydown', closeByEsc);
}

const closeButtons = document.querySelectorAll(".popup__button-close");
const closeButtonsArr = Array.from(closeButtons);
closeButtonsArr.forEach(function (button) {
  button.addEventListener("click", function () {
    const popupToClose = this.closest(".popup");
    closeModal(popupToClose);
  });
});

function openProfileModal() {
  openModal(profileModal);
  nameInput.value = accountName.textContent;
  jobInput.value = accountJob.textContent;
}

function openCardModal() {
  openModal(cardAddModal);
  //nameInput.value = accountName.textContent;
  //jobInput.value = accountJob.textContent;
}

export function popupImageOpen(desc, link) {
  popupImage.src = link;
  popupImageDesc.textContent = desc;
  openModal(imageModal);
}

popupProfileOpenButton.addEventListener("click", openProfileModal);
popupCardOpenButton.addEventListener("click", openCardModal);

//Закрытие попап через OVERLAY и ESC
const modals = Array.from(document.querySelectorAll('.popup'));

modals.forEach(function(popup) {
  popup.addEventListener('mousedown' , function(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      closeModal(evt.target);
    }
  });
});

const ESC_CODE = 'Escape';

function closeByEsc(evt) {
  if (evt.key === ESC_CODE) {
    const openedModal = document.querySelector('.popup_opened');
    closeModal(openedModal); 
  }
} 



//-----------------Спринт 7-----------------

const cardsContainer = document.querySelector(".elements");
function addCard(card, container) {
  container.prepend(card);
}
initialCards.reverse().forEach((element) => {
  const cardToAdd =  new Card(element.name, element.link);
  const card = cardToAdd.generateCard();
  addCard(card, cardsContainer);
});

//-------------------------------------------


const formProfile = document.querySelector("#formProfile");
const formCard = document.querySelector("#formCard");

function formProfileSubmitHandler(evt) {
  evt.preventDefault();

  const newName = nameInput.value;
  const newJob = jobInput.value;

  accountName.textContent = newName;
  accountJob.textContent = newJob;

  closeModal(profileModal);

  formProfile.reset();
}

function formCardSubmitHandler(evt) {
  evt.preventDefault();

  const name = document.querySelector(".popup__input_type_place");
  const link = document.querySelector(".popup__input_type_link");
  const buttonCard = document.querySelector(".popup__button-save_type_card");

  const newCard =  new Card(name.value, link.value);
  const newCardToAdd = newCard.generateCard();
  addCard(newCardToAdd, cardsContainer);

  closeModal(cardAddModal);
  buttonCard.classList.add('popup__button-save_disabled');
  buttonCard.setAttribute('disabled', true);

  formCard.reset();
}

formProfile.addEventListener("submit", formProfileSubmitHandler);
formCard.addEventListener("submit", formCardSubmitHandler);


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
