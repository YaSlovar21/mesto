import logo from '../images/logo-mesto.svg';
import addbutton from '../images/profile-plus.svg';
import profiltAva  from '../images/profile__avatar.jpg';

import '../pages/index.css';

import { //initialCards,
  profileModalSelector,
  cardAddModalSelector,
  popupImageSelector,
  popupAvatarSelector,
  popupConfirmSelector,
  cardsContainerSelector,
  cardTemplateSelector,

  popupProfileOpenButton, 
  popupCardOpenButton,
  avatarChangeButton,
  buttonCard, //кнопка сабмита формы добавления карточки 

  //используются только при открытии формы измнения данных о пользователе
  nameInput, //поле ввода формы изменения данных о профиле
  jobInput   //поле ввода формы изменения данных о профиле
} from '../utils/constants.js';

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupConfirm from '../components/PopupConfirm.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Api from '../components/Api.js';


const popupConfirmDelete = new PopupConfirm({
  formSubmitHandler: () => {
    Promise.resolve().catch(err => console.log(err));
  },
  formElement: '#formConfirmDelete',
}, popupConfirmSelector)

popupConfirmDelete.setEventListeners();

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-24',
  headers: {
    authorization: '7ca5b34f-d430-4580-a7ad-8a26fa855204',
    'Content-Type': 'application/json'
  }
}); 

const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userAboutSelector: '.profile__about',
  avatarSelector: '.profile__avatar',
});

//новая версия popupImageOpen
//function handleImageClick(desc, link) {
 // popupImage.open({
//    link: link,
//    name: desc,
//  })
//}

function likeAction(id, isLike, card) {
  if (isLike) {
    api
      .removeLike(id)
      .then((res) => {
        card.like = res.likes.length;
      })
      .catch((err) => console.log(err))
      .finally(() => {
        card.isLike = false;
        //card.handleLikeIcon();
      });
  } else {
    api
      .addLike(id)
      .then((res) => {
        card.like = res.likes.length;
      })
      .catch((err) => console.log(err))
      .finally(() => {
        card.isLike = true;
        //card.handleLikeIcon();
      });
  }
}

function createCard(name, link, likesSum, ownerId, cardId, likesArr) {
  //gо сути на вход подается cardData
  //проверяем на мой лайк среди likes
  //добавляем свойство cardData.isLike = true or false

  //проверяем моя ли карточка, добавляем cardData.isMine = true или false
  const card = new Card(name, link, cardTemplateSelector, {
    handleImageClick: (desc, link) => {
        popupImage.open({
          link: link,
          name: desc,
        });
    },
    isMineCard: (ownerId) => {
      if (ownerId === userInfo.myId) {
        console.log(card);
        return true;
      } else {
        return false;
      }
    },
    isLiked: (likesArr) => {
      if (likesArr.indexOf(userInfo.myId) != -1) {
        return true;
      } else {
        return false;
      }
    },
    handleLikeClick: (id, isLiked) => {
      likeAction(id, isLiked, card);
    },
    handleDeleteClick: (id) => {
      popupConfirmDelete.open();
      popupConfirmDelete.setDefaultSubmitHandler(()=> {
        api.deleteCard(id)
          .catch(err => console.log(err))
          .finally(() => {
            card.removeFromDom();
            popupConfirmDelete.close();
          });
      });
    },
    }, likesSum, ownerId, cardId, likesArr);
  const cardToAdd = card.generateCard();
  return cardToAdd;
}


const cardList = new Section({
  renderer: (item) => {
    //этой точке знаем все данные карточки
    const likesSum = item.likes.length;
    const card = createCard(item.name, item.link, likesSum, item.owner._id, item._id, item.likesArr);
    cardList.setItem(card);
  }
}, cardsContainerSelector);


//cardList.renderItems();
api.getInitialCards()
  .then(cards => {
    cardList.renderItems(cards);
  })
  .catch((error) => {
    console.log(error);
  })

api.getInfoUser()
  .then(userData => {
    //console.log(userData);
    userInfo.setUserInfo(userData);
    userInfo.myId = userData._id; //правильно ли???????
    console.log(userInfo);
  })
  .catch((error) => {
    console.log(error);
  })

const profileModal = new PopupWithForm({
  formSubmitHandler: (formProfileData) => {
    const newName = formProfileData.name;
    const newAbout = formProfileData.about;
    api.setInfoUser(newName, newAbout)
      .then(() => {
        userInfo.setUserInfo({
          name: newName,
          about: newAbout,
        })
        profileModal.close();
      })
      .catch((err) => console.log(err));
    //reset в классе!!
  },
  formElement: '#formProfile', 
}, profileModalSelector)

profileModal.setEventListeners();

const cardAddModal = new PopupWithForm({
  formSubmitHandler: (formCardData) => {
    api.addCard(formCardData.name, formCardData.link)
      .then((response) => {
        console.log(response);
        let card = createCard(response.name, response.link);
        cardList.setItem(card);
      })
      .catch(error => console.log(error));

    cardAddModal.close();
    buttonCard.classList.add('popup__button-save_disabled');
    buttonCard.setAttribute('disabled', true);
  },
  formElement: '#formCard',
}, cardAddModalSelector)

cardAddModal.setEventListeners();

//картинка+подпись в модальном imageModal
const popupImage = new PopupWithImage({
  popupImageSelector: '.popup__image',
  popupImageDescSelector: '.popup__image-description'
}, popupImageSelector)

popupImage.setEventListeners();


const popupAvatarChange = new PopupWithForm({
  formSubmitHandler: (formAvatarData) => {
    console.log(formAvatarData);
    api.updateProfileImage(formAvatarData.link)
      .then((response) => {
        console.log(response);
        userInfo.updateAvatar(response.avatar);
      })
      .catch((error) => {
        console.log(error);
      });
    popupAvatarChange.close();
  },
  formElement: '#formAvatar',
}, popupAvatarSelector);

popupAvatarChange.setEventListeners();



popupProfileOpenButton.addEventListener("click", () => {
  const profileInfo = userInfo.getUserInfo();
  nameInput.value = profileInfo.name;
  jobInput.value = profileInfo.about;
  profileModal.open();
});
popupCardOpenButton.addEventListener("click", ()=> {
  cardAddModal.open();
});
avatarChangeButton.addEventListener("click", () => {
  popupAvatarChange.open();
})


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



