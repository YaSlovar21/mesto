export const initialCards = [
    {
      name: "Архыз",
      link:
        "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link:
        "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link:
        "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link:
        "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link:
        "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link:
        "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
  ];

//кнопки для открытия попапа


export const cardTemplateSelector = "#card-template";

export const ESC_CODE = 'Escape';

//3 попапа
export const profileModalSelector = '.popup-profile';
export const cardAddModalSelector = '.popup-card';
export const popupImageSelector = '.popup-viewport';
export const popupAvatarSelector = '.popup-avatar';
export const popupConfirmSelector = '.popup-confirmation';

export const formProfile= document.forms.formProfile;
export const formCardAdd = document.querySelector('#formCard');
export const formAvatar = document.forms.Avatar;
export const formConfirm = document.forms.ConfirmDelete;

export const profileSubmitButton = formProfile.querySelector('.popup__button-save');
export const changeAvaSubmitButton = formAvatar.querySelector('.popup__button-save');
export const confirmDeleteSubmitButton = formConfirm.querySelector('.popup__button-save');
export const buttonCard = formCardAdd.querySelector(".popup__button-save");

//контейнер для Section
export const cardsContainerSelector = '.elements';

export const popupProfileOpenButton = document.querySelector(".profile__edit-button");
export const popupCardOpenButton = document.querySelector(".profile__add-button");
export const avatarChangeButton = document.querySelector(".profile__avatar-change-button");





export const nameInput = document.querySelector(".popup__input_type_name");
export const jobInput = document.querySelector(".popup__input_type_about");

export const formValidatorConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
}