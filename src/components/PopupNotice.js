import { Popup } from "./Popup.js";

class PopupNotice extends Popup {
  // Получает селектор, объект и карточку.
  constructor(popupSelector, { callbackNotice }) {
    super(popupSelector);
    // this._popupItem находится в родительском классе
    this._submitButton = this._popupItem.querySelector('.popup__form');
    this._callbackNotice = callbackNotice;
  }
  // Получаем данные и наследуем open из родительского класса
  open(cardObject, cardId) {
    this._cardObject = cardObject;
    this._cardId = cardId;
    super.open();
  }
  // Навешиваем обработчики на кнопку подтверждения, наследуем из родителя остальные
  setEventListeners() {
    this._submitButton.addEventListener('submit', (evt) => { evt.preventDefault(); this._callbackNotice(this._cardObject, this._cardId) })
    super.setEventListeners();
  }
}
// Экспортируем класс в index.js
export { PopupNotice };