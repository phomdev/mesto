class Card {
  // 1. Объект карточки. 2. Template элемент. 3. Id пользователя 4. Объект данных 5. Handle объект
  constructor(cardObject, templateElem, userId, authorData, handleActions) {
    // Данные с карточками и template элемент
    this._card = cardObject;
    this._cardName = this._card.name;
    this._cardImage = this._card.link;
    this._cardTemplate = templateElem;
    // Данные для пользователя
    this._userId = userId;
    this._cardId = authorData.cardId;
    this._authorId = authorData.authorId;
    // Handle данные
    this._cardZoom = handleActions.handleCardZoom;
    this._cardDelete = handleActions.handleCardDelete;
    this._putLike = handleActions.handleCardLike;
    this._removeLike = handleActions.handleCardDeleteLike;
  }
  // Метод клонирования и получения доступа к template
  _createCard() {
    // Возврат без переменной, так как объявление переменной будет избыточной (Local variable is redundant)
    return document.querySelector(this._cardTemplate).content.querySelector('.cards__item').cloneNode(true);
  }
  // Метод удаления карточки
  deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }
  // Общий метод реализации и отображения лайков и их количества
  renderCardLike(card) {
    this._likeArea = card.likes;
    if (this._likeArea.length === 0) {
      this.likeSelector.textContent = '';
    } else {
      // Брать количество лайков из ответа сервера
      this.likeSelector.textContent = this._likeArea.length;
    }
    if (this._likedCard()) {
      this._likeIcon.classList.add('cards__like_active');
    } else {
      this._likeIcon.classList.remove('cards__like_active');
    }
  }
  // Метод проверки наличия лайка на карточке
  _likedCard() {
    // Возврат без переменной, так как объявление переменной будет избыточной (Local variable is redundant)
    return this._likeArea.find((userLike) => userLike._id === this._userId);
  }

  // Метод обработки добавления и снятия лайков
  _interactLike() {
    if (this._likedCard()) {
      this._removeLike(this._cardId);
    } else {
      this._putLike(this._cardId);
    }
  }
  // Метод создания карточки
  makeCard() {
    this._cardElement = this._createCard();
    this._elementImages = this._cardElement.querySelector('.cards__image');
    this._elementName = this._cardElement.querySelector('.cards__description');
    this._likeIcon = this._cardElement.querySelector('.cards__like');
    this._deleteIcon = this._cardElement.querySelector('.cards__delete');
    this.likeSelector = this._cardElement.querySelector('.cards__like-counter');
    // Передаём данные в карточку
    this._elementName.textContent = this._cardName;
    this._elementImages.src = this._cardImage;
    this._elementImages.alt = this._cardName;
    this.renderCardLike(this._card);
    // Навешиваем обработчики на экземпляр класса
    this._addEventHandlers();
    // Возвращаем готовый экземпляр
    return this._cardElement;
  }
  // Подготавливаем обработчики для экземпляра
  _addEventHandlers = () => {
    this._likeIcon.addEventListener('click', () => this._interactLike())
    this._elementImages.addEventListener('click', () => this._cardZoom(this._cardName, this._cardImage));
    if (this._userId === this._authorId) {
      this._deleteIcon.addEventListener('click', () =>  this._cardDelete(this, this._cardId));
    } else {
      this._deleteIcon.remove();
    }
  }
}
// Экспортируем класс в index.js
export { Card };