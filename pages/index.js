import { initialCards, cardTemplateSelector, imageModal } from '../utils/constants.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';



const accountName = document.querySelector(".profile__name");
const accountJob = document.querySelector(".profile__about");







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
  button.addEventListener("click", function (evt) {
    const popupToClose = evt.target.closest(".popup");
    closeModal(popupToClose);
  });
});

function openProfileModal() {
  openModal(profileModal);
  nameInput.value = accountName.textContent;
  jobInput.value = accountJob.textContent;
}


function openCardModal() {
  //зачистить поля ошибок для первого открытия попапа
  //cardAddModal.querySelectorAll('.popup__input').forEach((input) => {
  //  input.classList.remove('popup__input_type_error');
  //});
  openModal(cardAddModal);

  //nameInput.value = accountName.textContent;
  //jobInput.value = accountJob.textContent;
}

export function popupImageOpen(desc, link) {
  popupImage.src = link;
  popupImageDesc.textContent = desc;
  openModal(imageModal);
}

//новая версия popupImageOpen
function handleCardClick(desc, link) {
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

function createCard(name, link) {
  const card = new Card(name, link, cardTemplateSelector);
  const cardToAdd = card.generateCard();

  return cardToAdd;
}

initialCards.reverse().forEach((element) => {
  const card = createCard(element.name, element.link);
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

  const card = createCard(name.value, link.value);
  addCard(card, cardsContainer);

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



