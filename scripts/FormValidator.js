class FormValidator {
    // Первый - объект с классами для валидации, второй - объект для валидации
  constructor(objectList, elementValidation) {
    this._objectList = objectList;
    this._elementValidation = elementValidation;
    // Submit кнопка в форме
    this._submitButton = this._elementValidation.querySelector(this._objectList.submitButtonSelector)
    this._inputList = Array.from(this._elementValidation.querySelectorAll(this._objectList.inputSelector));
  }

  // Метод показа ошибок валидации
  _showValidationError(inputItem, errorMessage) {
    const errorItem = this._elementValidation.querySelector(`.${inputItem.id}-error`)
    inputItem.classList.add(this._objectList.inputErrorClass);
    // Передаём текст ошибки
    errorItem.textContent = errorMessage;
    // Показываем текст ошибок (через visibility)
    errorItem.classList.add(this._objectList.errorClass);
  }
  // Метод скрытия ошибок валидации
  _hideValidationError(inputItem) {
    const errorItem = this._elementValidation.querySelector(`.${inputItem.id}-error`)
    inputItem.classList.remove(this._objectList.inputErrorClass);
    // Скрываем текст ошибок (через visibility)
    errorItem.classList.remove(this._objectList.errorClass);
    // Очищаем ошибки
    errorItem.textContent = '';
  }
  // Метод проверки валидации форм
  _checkInputValidity(inputItem) {
    if (inputItem.validity.valid === false) {
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
  // Метод активации submit кнопки после валидации
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      // Отключаем кнопку при ошибке валидации
      this._submitButton.setAttribute('disabled', 'true');
      this._submitButton.classList.add(this._objectList.inactiveButtonClass);
    } else {
      // Включаем кнопку при ошибке валидации
      this._submitButton.classList.remove(this._objectList.inactiveButtonClass);
      this._submitButton.removeAttribute('disabled');
    }
  }
}

// Экспортируем класс валидации в файл index.js
export { FormValidator };