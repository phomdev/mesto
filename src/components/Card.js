class Card {
  // Первый - объект с названием и изображением карточки, второй - template шаблон карточки
  constructor(dataObject, templateElem, handleCardClick) {
    this._name = dataObject.name;
    this._image = dataObject.link;
    this._template = templateElem;
    this._handleCardClick = handleCardClick;
  }
  //
  _createCard() {
    // Возврат без переменной, так как объявление переменной будет избыточной (Local variable is redundant)
    return document.querySelector(this._template).content.querySelector('.cards__item').cloneNode(true);
  }
  // Метод лайка карточки
  _likeCard = (event) => {
    event.target.classList.toggle('cards__like_active');
  }
  // Метод удаления карточки
  _deleteCard() {
    this._cardElement.remove();
  }
  // Метод создания карточки
  makeCard() {
    this._cardElement = this._createCard();
    this._elementImages = this._cardElement.querySelector('.cards__image');
    this._elementName = this._cardElement.querySelector('.cards__description');
    this._likeIcon = this._cardElement.querySelector('.cards__like');
    this._deleteIcon = this._cardElement.querySelector('.cards__delete');
    this._elementName.textContent = this._name;
    this._elementImages.src = this._image;
    this._elementImages.alt = this._name;
    // Навешиваем обработчики на экземпляр класса
    this._addEventHandlers();
    // Возвращаем готовый экземпляр
    return this._cardElement;
  }
  // Подготавливаем обработчики для экземпляра
  _addEventHandlers = () => {
    this._likeIcon.addEventListener('click', event => this._likeCard(event))
    this._deleteIcon.addEventListener('click', event => this._deleteCard(event));
    this._elementImages.addEventListener('click', () => this._handleCardClick(this._name, this._image));
  }
}
// Экспортируем класс в index.js
export { Card };