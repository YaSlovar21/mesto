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
}

function closeModal(modal) {
  modal.classList.remove("popup_opened");
}

const closeButtons = document.querySelectorAll(".popup__button-close");
const closeButtonsArr = Array.from(closeButtons);
closeButtonsArr.forEach(function (button) {
  button.addEventListener("click", function () {
    let popupToClose = this.closest(".popup");
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

function popupImageOpen(desc, link) {
  popupImage.src = link;
  popupImageDesc.textContent = desc;
  openModal(imageModal);
}

popupProfileOpenButton.addEventListener("click", openProfileModal);
popupCardOpenButton.addEventListener("click", openCardModal);

//Спринт 5

const cardsContainer = document.querySelector(".elements");
const cardTemplate = document.querySelector("#card-template").content;

const initialCards = [
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

function createCard(name, link) {
  const cardElement = cardTemplate
    .querySelector(".elements__item")
    .cloneNode(true);

  cardElement.querySelector(".elements__image").src = link;
  cardElement.querySelector(".elements__image").alt = name;
  cardElement.querySelector(".elements__heading").textContent = name;

  cardElement
    .querySelector(".elements__like")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("elements__like_liked");
    });

  cardElement
    .querySelector(".elements__delete-button")
    .addEventListener("click", function (evt) {
      const cardItem = this.closest(".elements__item");
      cardItem.remove();
    });
  cardElement
    .querySelector(".elements__image")
    .addEventListener("click", function (evt) {
      //console.log(evt.target.src);
      //console.log(evt.target.alt);
      popupImageOpen(evt.target.alt, evt.target.src);
    });
  return cardElement;
}

function addCard(card, container) {
  container.prepend(card);
}

initialCards.reverse().forEach((element) => {
  const cardToAdd = createCard(element.name, element.link);
  addCard(cardToAdd, cardsContainer);
});

const formProfile = document.querySelector("#formProfile");
const formCard = document.querySelector("#formCard");

function formProfileSubmitHandler(evt) {
  evt.preventDefault();

  const newName = nameInput.value;
  const newJob = jobInput.value;

  accountName.textContent = newName;
  accountJob.textContent = newJob;

  closeModal(profileModal);

  nameInput.value = "";
  jobInput.value = "";
}

function formCardSubmitHandler(evt) {
  evt.preventDefault();

  const name = document.querySelector(".popup__input_type_place");
  const link = document.querySelector(".popup__input_type_link");

  const newCard = createCard(name.value, link.value);
  addCard(newCard, cardsContainer);

  closeModal(cardAddModal);

  name.value = "";
  link.value = "";
}

formProfile.addEventListener("submit", formProfileSubmitHandler);
formCard.addEventListener("submit", formCardSubmitHandler);


//Закрытие попап через OVERLAY и ESC

const modals = Array.from(document.querySelectorAll('.popup'));

modals.forEach(function(popup) {
  popup.addEventListener('click' , function(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      evt.target.classList.remove('popup_opened');
    }
  });
});

document.body.addEventListener('keydown', function(evt) {
  if (evt.key == 'Escape') {
    popupOpened = document.querySelector('.popup_opened');
    if (popupOpened) {
      popupOpened.classList.remove('popup_opened');
    }
  }
});
