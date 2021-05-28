export default class Card {
    constructor(name, link, cardSelector, {handleImageClick, isMineCard, isLiked, handleLikeClick, handleDeleteClick}, likesSum, ownerId, cardId, likesArr) {
        this._name = name;
        this._link = link;
        this._likesArr = likesArr;

        this._cardSelector = cardSelector;
        this._handleImageClick = handleImageClick;
        this._handleDeleteClick = handleDeleteClick;
        this._handleLikeClick = handleLikeClick;

        this._isMineCard = isMineCard;
        this._isLiked = isLiked;


        this._likesSum = likesSum;

        this._ownerId = ownerId;
        this._id = cardId;
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
        if (!this._isMineCard) {
          this._deleteIcon.style.display = 'none';
        }
        if (this._isLiked) {
          this._cardLike.classList.add('elements__like_liked');
        }
        this._cardLikeSum.textContent = this._likesSum;

        this._setEventListeners();
        return this._element;
    }
  
    updateLikesCount(newCount) {
      if (newCount === 0) {
        this._cardLikeSum.style.display = 'none';
      } else
      {
        this._cardLikeSum.style.display = 'block';
        this._cardLikeSum.textContent = newCount;
      }
    }
    setIsLiked(newBool) {
      this._isLiked = newBool;
    }
    removeFromDom() {
      this._element.remove();
    }

    toogleLikeInDom() {
      this._cardLike.classList.toggle("elements__like_liked");
    }
    _setEventListeners() {
      this._cardLike.addEventListener("click", () => {
        this._handleLikeClick(this._id, this._isLiked);
        
      });
      this._cardImage.addEventListener("click", () => {
        this._handleImageClick(this._name, this._link)
      });
      this._deleteIcon.addEventListener("click", () => {
        this._handleDeleteClick(this._id);
      }); 
    }
  }