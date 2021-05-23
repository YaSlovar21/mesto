//избавиться от сильной связи в 8й работе
//import {popupImageOpen} from '../pages/index.js';

export default class Card {
    constructor(name, link, cardSelector, handleImageClick) {
        this._name = name;
        this._link = link;
        this._cardSelector = cardSelector;
        this._handleImageClick = handleImageClick;
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
        //console.log(this._cardImage);

        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardHeading.textContent = this._name;
        
        this._setEventListeners();
        return this._element;
    }
  
    _handleLikeClick() {
        this._element.querySelector(".elements__like").classList.toggle("elements__like_liked");
    }
    //_handleImageClick() {
    //    popupImageOpen(this._name, this._link);
    //}
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