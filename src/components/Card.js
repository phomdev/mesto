class Card {
  // Первый - объект с названием и изображением карточки, второй - template шаблон карточки
  constructor(object, templateElem, handleCardClick) {
    this._name = object.name;
    this._image = object.link;
    this._template = templateElem;
    this._handleCardClick = handleCardClick;
    this._elementCard = document.querySelector(this._template).content.querySelector('.cards__item').cloneNode(true);
    this._elementImages = this._elementCard.querySelector('.cards__image');
    this._elementName = this._elementCard.querySelector('.cards__description');
    this._likeIcon = this._elementCard.querySelector('.cards__like');
    this._deleteIcon = this._elementCard.querySelector('.cards__delete');
  }
  // Метод лайка карточки
  _addLikeCard = (event) => {
    event.target.classList.toggle('cards__like_active');
  }
  // Метод удаления карточки
  _deleteCard() {
    this._elementCard.remove();
  }
  // Метод создания карточки
  makeCard() {
    this._elementName.textContent = this._name;
    this._elementImages.src = this._image;
    this._elementImages.alt = this._name;
    // Навешиваем обработчики на экземпляр класса
    this._addEventHandler();
    // Возвращаем готовый экземпляр
    return this._elementCard;
  }
  // Подготавливаем обработчики для экземпляра
  _addEventHandler = () => {
    this._likeIcon.addEventListener('click', event => this._addLikeCard(event))
    this._deleteIcon.addEventListener('click', event => this._deleteCard(event));
    this._elementImages.addEventListener('click', () => this._handleCardClick(this._name, this._image));
  }
}
// Экспортируем класс в index.js
export { Card };