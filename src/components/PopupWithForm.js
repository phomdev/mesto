import { Popup } from './Popup.js';

class PopupWithForm extends Popup {
  // Принимает в конструктор селектор popup и callback сабмита формы
  constructor(popupSelector, { callbackFormSubmit }) {
    super(popupSelector);
    this._callbackFormSubmit = callbackFormSubmit;
    // this._popupItem находится в родительском классе
    this._popupFormItem = this._popupItem.querySelector('.popup__form');
    this._inputList = Array.from(this._popupFormItem.querySelectorAll('.popup__input'));
    this._sendButton = this._popupItem.querySelector('.popup__submit');
    this._sendButtonText = this._sendButton.textContent;
  }
  // Метод собирает данные всех полей формы
  _getInputValues() {
    // Наполняем пустой массив данными через forEach
    const formValues = {};
    this._inputList.forEach(inputItem => {
      formValues[inputItem.name] = inputItem.value;
    });
    return formValues;
  }
  // Связываем с методом getInputValues, добавляем обработчик клика и обработчик сабмита формы
  setEventListeners() {
    // Перезаписывает родительский метод setEventListeners
    super.setEventListeners();
    this._popupFormItem.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._callbackFormSubmit(this._getInputValues());
    });
  }
  // Метод добавления кнопке текста в момент сохранения
  putSavingProcessText() {
    this._sendButton.textContent = 'Сохранение...';
  }
  // Метод добавления стандартного текста кнопке
  returnSavingProcessText() {
    this._sendButton.textContent = this._sendButtonText;
  }
  // Метод закрытия popup (перезаписывает родителя)
  close() {
    super.close();
    // Сбрасываем форму
    this._popupFormItem.reset();
  }
}
// Экспортируем класс в index.js
export { PopupWithForm };