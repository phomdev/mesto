class FormValidator {
    // Первый - объект с классами для валидации, второй - объект для валидации
  constructor(validationSettings, formElement) {
    this._validationSettings = validationSettings;
    this._formElement = formElement;
    // Submit кнопка в форме
    this._submitButton = this._formElement.querySelector(this._validationSettings.submitButtonSelector)
    this._inputList = Array.from(this._formElement.querySelectorAll(this._validationSettings.inputSelector));
  }
  // Метод показа ошибок валидации
  _showValidationError(inputItem, errorMessage) {
    const errorItem = this._formElement.querySelector(`.${inputItem.id}-error`)
    inputItem.classList.add(this._validationSettings.inputErrorClass);
    // Передаём текст ошибки
    errorItem.textContent = errorMessage;
    // Показываем текст ошибок (через visibility)
    errorItem.classList.add(this._validationSettings.errorClass);
  }
  // Метод скрытия ошибок валидации
  _hideValidationError(inputItem) {
    const errorItem = this._formElement.querySelector(`.${inputItem.id}-error`)
    inputItem.classList.remove(this._validationSettings.inputErrorClass);
    // Скрываем текст ошибок (через visibility)
    errorItem.classList.remove(this._validationSettings.errorClass);
    // Очищаем ошибки
    errorItem.textContent = '';
  }
  // Метод сброса валидации форм
  resetValidate() {
    this._inputList.forEach((inputItem) => { this._hideValidationError(inputItem); })
    this._toggleButtonState();
  }
  // Метод проверки валидации форм
  _checkInputValidity(inputItem) {
    if (!inputItem.validity.valid) {
      // Показываем ошибки
      this._showValidationError(inputItem, inputItem.validationMessage);
    } else {
      // Скрываем ошибки
      this._hideValidationError(inputItem);
    }
  }
  // Метод проверки всех input
  _setEventListeners() {
    // Проверяем submit кнопку
    this._toggleButtonState();
    // Проходим по массиву инпутов и проверяем их
    this._inputList.forEach((inputItem) => {
      inputItem.addEventListener('input', () => {
        this._checkInputValidity(inputItem);
        this._toggleButtonState();
      });
    });
  }
  // Метод обхода input на ошибки
  _hasInvalidInput() {
    return this._inputList.some((inputItem) => {
      return !inputItem.validity.valid;
    });
  }
  // Публичный метод, который включает валидацию форм
  enableValidationCheck() {
    this._setEventListeners();
  }
  // Отключаем submit кнопку в popup
  _disableSubmitButton() {
    this._submitButton.setAttribute('disabled', 'true');
    this._submitButton.classList.add(this._validationSettings.inactiveButtonClass);
  }
  // Включаем submit кнопку в popup
  _enableSubmitButton() {
    this._submitButton.classList.remove(this._validationSettings.inactiveButtonClass);
    this._submitButton.removeAttribute('disabled');
  }
  // Метод активации submit кнопки после валидации
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      // Отключаем кнопку при ошибке валидации
      this._disableSubmitButton();
    } else {
      // Включаем кнопку
      this._enableSubmitButton();
    }
  }
}
// Экспортируем класс валидации в файл index.js
export { FormValidator };