//избавиться от сильной связи в 8й работе
//import {popupImageOpen} from '../pages/index.js';

export default class Card {
    constructor(name, link, cardSelector, {handleImageClick, isMineCard}, likesSum, ownerId) {
        this._name = name;
        this._link = link;
        this._cardSelector = cardSelector;
        this._handleImageClick = handleImageClick;
        this._isMineCard = isMineCard;

        this._likesSum = likesSum;

        this._ownerId = ownerId;
    }
    
    _getTemplate() {
        const cardElement = document
          .querySelector(this._cardSelector)
          .content
          .querySelector(".elements__item")
          .cloneNode(true);
  
        return cardElement;
    }
  
    generateCard() {
        this._element = this._getTemplate();
        

        this._cardImage = this._element.querySelector('.elements__image');
        this._cardHeading = this._element.querySelector(".elements__heading");
        this._cardLike = this._element.querySelector(".elements__like");
        this._cardLikeSum = this._element.querySelector(".elements__likes");
        this._deleteIcon = this._element.querySelector(".elements__delete-button");

        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardHeading.textContent = this._name;

        if (this._likesSum === 0) {
          this._cardLikeSum.style.display = 'none';
        }
        if (!this._isMineCard(this._ownerId)) {
          this._deleteIcon.style.display = 'none';
        }
        
        this._cardLikeSum.textContent = this._likesSum;

        this._setEventListeners();
        return this._element;
    }
  
    _handleLikeClick() {
        this._element.querySelector(".elements__like").classList.toggle("elements__like_liked");
    }
 
    _handleDeleteClick() {
        //const cardItem = this._element.closest(".elements__item");
        this._element.remove();
    }
  
    _setEventListeners() {
      this._cardLike.addEventListener("click", () => {
        this._handleLikeClick();
      });
      this._cardImage.addEventListener("click", () => {
        this._handleImageClick(this._name, this._link)
      });
      this._element.querySelector(".elements__delete-button").addEventListener("click", () => {
        this._handleDeleteClick()
      }); 
    }
  }