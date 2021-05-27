import logo from '../images/logo-mesto.svg';
import addbutton from '../images/profile-plus.svg';
import profiltAva  from '../images/profile__avatar.jpg';

import '../pages/index.css';

import { 
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
  profileSubmitButton, //сабмит формы изм. профиля
  changeAvaSubmitButton,
  confirmDeleteSubmitButton,
  //используются только при открытии формы измнения данных о пользователе
  nameInput, //поле ввода формы изменения данных о профиле
  jobInput,   //поле ввода формы изменения данных о профиле

  formValidatorConfig,
  formProfile,
  formCardAdd,
  formAvatar,
  formConfirm,

} from '../utils/constants.js';

import {
  renderLoading
} from '../utils/utils.js';

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupConfirm from '../components/PopupConfirm.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Api from '../components/Api.js';
//import { from } from 'core-js/core/array';

console.log(profileSubmitButton, changeAvaSubmitButton);

console.log(formCardAdd);
const formValidatorProfile = new FormValidator(formValidatorConfig, formProfile);
formValidatorProfile.enableValidation();
const formValidatorCard = new FormValidator(formValidatorConfig, formCardAdd);
formValidatorCard.enableValidation();
const formValidatorAvatar = new FormValidator(formValidatorConfig, formAvatar);
formValidatorAvatar.enableValidation();
const formValidatorConfirm = new FormValidator(formValidatorConfig, formConfirm);
formValidatorConfirm.enableValidation();


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

const cardList = new Section({
  renderer: (item) => {
    //в этой точке знаем все данные карточки
    //const card = createCard(item.name, item.link, likesSum, item.owner._id, item._id, item.likesArr);
    const card = createCard(item);
    cardList.setItem(card);
  }
}, cardsContainerSelector);

Promise.all([api.getInfoUser(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    userInfo.myId = userData._id; //правильно ли???????
    console.log(userInfo.myId);
    cardList.renderItems(cards);
  })
  .catch((error) => {
    console.log(error);
  });

//новая версия popupImageOpen
//function handleImageClick(desc, link) {
 // popupImage.open({
//    link: link,
//    name: desc,
//  })
//}

//function createCard(name, link, likesSum, ownerId, cardId, likesArr) {
function createCard(cardJson) {
  //gо сути на вход подается Json карточки
  //проверяем на мой лайк среди likes
  //добавляем свойство cardData.isLike = true or false
  const likesSum = cardJson.likes.length;
  const likesArr = cardJson.likes;
  const name = cardJson.name;
  const link = cardJson.link;
  const cardId = cardJson._id;
  const ownerId = cardJson.owner._id;
  let isMyCard = false;
  let isLikedbyMe = false;

  if (ownerId == userInfo.myId) {
    isMyCard = true;
  }
  //если в likes мой лайк
  likesArr.forEach((like) => {
    if (like._id === userInfo.myId) {
      isLikedbyMe = true;
    }
  })
  //передаем булевое значение лайка для создания карточки, там записываем в приватное свойство, которое используем в handleLikeClick 
  console.log(isLikedbyMe); 
  const card = new Card(name, link, cardTemplateSelector, {
    handleImageClick: (desc, link) => {
        popupImage.open({
          link: link,
          name: desc,
        });
    },
    isMineCard: isMyCard,                     //используются только при создании карточки!
    isLiked: isLikedbyMe,                     //используются только при создании карточки!
    handleLikeClick: (id, _isLiked) => {
      if (_isLiked) {
        api.removeLike(id)
          .then((response) => {
            console.log(response);
            card.updateLikesCount(response.likes.length);
          })
          .catch((err) => console.log(err))
          .finally(() => {
            card.setIsLiked(false);
            card.toogleLikeInDom();
          });
      }
      else {
        api.addLike(id)
          .then((response) => {
            console.log(response.likes.length);
            card.updateLikesCount(response.likes.length);
          })
          .catch((err) => console.log(err))
          .finally(() => {
            card.setIsLiked(true);
            card.toogleLikeInDom();
          });
      }
    },
    handleDeleteClick: (id) => {
      popupConfirmDelete.open();
      popupConfirmDelete.setDefaultSubmitHandler(()=> {
        renderLoading(true, confirmDeleteSubmitButton, 'Удалить', 'Удаление...');
        api.deleteCard(id)
          .then(()=> {
            card.removeFromDom();
            popupConfirmDelete.close();
          })
          .catch(err => console.log(err))
          .finally(() => {
            renderLoading(false, confirmDeleteSubmitButton, 'Удалить', 'Удаление...');
          });
      });
    },
    }, likesSum, ownerId, cardId, likesArr);
  const cardToAdd = card.generateCard();
  return cardToAdd;
}

const popupConfirmDelete = new PopupConfirm({
    formSubmitHandler: () => {
      //отправлять индивидуальный submithandler
    },
    //formElement: '#formConfirmDelete',
}, popupConfirmSelector)

const profileModal = new PopupWithForm({
  formSubmitHandler: (formProfileData) => {
    const newName = formProfileData.name;
    const newAbout = formProfileData.about;
    renderLoading(true, profileSubmitButton, 'Сохранить', 'Сохранение...'); //вынести фразы в отдельный объект? elem: profileSubmBut, onLoadText:' ....
    api.setInfoUser(newName, newAbout)
      .then((response) => {
        userInfo.setUserInfo({
          name: newName,
          about: newAbout,
          avatar: response.avatar,
        })
        console.log(response);
        profileModal.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        formValidatorProfile.disableSaveButton();
        renderLoading(false, profileSubmitButton, 'Сохранить', 'Сохранение...');
      });
    //reset в классе!!
  },
  formCleanError: () => {
    formValidatorProfile.cleanAllErrors();
  },
}, profileModalSelector)

const cardAddModal = new PopupWithForm({
  formSubmitHandler: (formCardData) => {
    renderLoading(true, buttonCard, 'Добавить', 'Добавление...');
    //можно в принципе дисэйблить все кнопки на время выполнения запроса
    api.addCard(formCardData.name, formCardData.link)
      .then((cardJson) => {
        console.log(cardJson);
        const card = createCard(cardJson);
        cardList.setItem(card);
        cardAddModal.close();
        
      })
      .catch(error => console.log(error))
      .finally(() => {
        
        //ЗАЧЕМ здесь дисэйблить кнопку а в других нет, забыл...
        //buttonCard.classList.add('popup__button-save_disabled');
        //buttonCard.setAttribute('disabled', true);
        formValidatorCard.disableSaveButton();
        renderLoading(false, buttonCard, 'Добавить', 'Добавление...');
      });
    //если дисэйблить кнопку здесь, то это произойдет раньше асинхронного запроса на сохранение
  },
  formCleanError: () => {
    formValidatorCard.cleanAllErrors();
  },
}, cardAddModalSelector)


//картинка+подпись в модальном imageModal
const popupImage = new PopupWithImage({
  popupImageSelector: '.popup__image',
  popupImageDescSelector: '.popup__image-description'
}, popupImageSelector)


const popupAvatarChange = new PopupWithForm({
  formSubmitHandler: (formAvatarData) => {
    console.log(formAvatarData);
    renderLoading(true, changeAvaSubmitButton, 'Сохранить', 'Сохранение...');
    api.updateProfileImage(formAvatarData.link)
      .then((response) => {
        console.log(response);
        userInfo.updateAvatar(response.avatar);
        popupAvatarChange.close();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        renderLoading(false, changeAvaSubmitButton, 'Сохранить', 'Сохранение...');
      });
    
  },
  formCleanError: () => {
    formValidatorAvatar.cleanAllErrors();
  },
}, popupAvatarSelector);

popupAvatarChange.setEventListeners();
popupImage.setEventListeners();
cardAddModal.setEventListeners();
profileModal.setEventListeners();
popupConfirmDelete.setEventListeners();


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


