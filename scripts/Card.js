// Импорт переменных из файла index.js для работы медота увеличения изображения в карточке
import { openPopup, popupImageZoom as popupZoom, popupImageZoomDescription as popupDescription, popupImageZoomImage as popupImage } from './index.js';

class Card {
  // Первый - объект с названием и изображением карточки, второй - template шаблон карточки
  constructor(object, templateElem) {
    this._name = object.name;
    this._image = object.link;
    this._template = templateElem;
  }
  // Метод лайка карточки
  _addLikeCard = (event) => {
    event.target.classList.toggle('cards__like_active');
  }
  // Метод удаления карточки
  _deleteCard = (event) => {
    event.target.closest('.cards__item').remove();
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
    // Клонируем темплейт для карточки
    const elementCard = document.querySelector(this._template).content.querySelector('.cards__item').cloneNode(true);
    elementCard.querySelector('.cards__description').textContent = this._name;
    elementCard.querySelector('.cards__image').src = this._image;
    elementCard.querySelector('.cards__image').alt = this._name;
    // Навешиваем обработчики на экземпляр класса
    this._addEventHandler(elementCard);
    // Возвращаем готовый экземпляр
    return elementCard;
  }
  // Подготавливаем обработчики для экземпляра
  _addEventHandler = (elementCard) => {
    elementCard.querySelector('.cards__like').addEventListener('click', event => this._addLikeCard(event))
    elementCard.querySelector('.cards__delete').addEventListener('click', event => this._deleteCard(event));
    elementCard.querySelector('.cards__image').addEventListener('click', () => this._getZoomImages())
  }
}
// Экспортируем класс в index.js
export { Card };