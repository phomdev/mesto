// Импорт переменных из файла index.js для работы медота увеличения изображения в карточке
import { openPopup, popupImageZoom as popupZoom, popupImageZoomDescription as popupDescription, popupImageZoomImage as popupImage } from './index.js';

class Card {
  // Первый - объект с названием и изображением карточки, второй - template шаблон карточки
  constructor(object, templateElem) {
    this._name = object.name;
    this._image = object.link;
    this._template = templateElem;
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
  // Метод увеличения изображения карточки
  _getZoomImages() {
    popupDescription.textContent = this._name;
    popupImage.src = this._image;
    popupImage.alt = this._name;
    openPopup(popupZoom);
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
    this._elementImages.addEventListener('click', () => this._getZoomImages())
  }
}
// Экспортируем класс в index.js
export { Card };