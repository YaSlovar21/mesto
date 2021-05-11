//избавиться от сильной связи в 8й работе
import {popupImageOpen} from '../pages/index.js';

export default class Card {
    constructor(name, link, cardSelector) {
        this._name = name;
        this._link = link;
        this._cardSelector = cardSelector;
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
        this._setEventListeners();
  
        this._element.querySelector(".elements__image").src = this._link;
        this._element.querySelector(".elements__image").alt = this._name;
        this._element.querySelector(".elements__heading").textContent = this._name;
  
        return this._element;
    }
  
    _handleLikeClick() {
        this._element.querySelector(".elements__like").classList.toggle("elements__like_liked");
    }
    _handleImageClick() {
        popupImageOpen(this._name, this._link);
    }
    _handleDeleteClick() {
        //const cardItem = this._element.closest(".elements__item");
        this._element.remove();
    }
  
    _setEventListeners() {
      this._element.querySelector(".elements__like").addEventListener("click", () => {
        this._handleLikeClick();
      });
      this._element.querySelector(".elements__image").addEventListener("click", () => {
        this._handleImageClick();
      });
      this._element.querySelector(".elements__delete-button").addEventListener("click", () => {
        this._handleDeleteClick()
      });
    }
  }