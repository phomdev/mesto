class FormValidator {
    // Первый - объект с классами для валидации, второй - объект для валидации
  constructor(objectList, elementValidation) {
    this._object = objectList;
    this._element = elementValidation;
    // Submit кнопка в форме
    this._submitElement = this._element.querySelector(this._object.submitButtonSelector)
  }

  // Метод показа ошибок валидации
  _showValidationError(inputItem, errorMessage) {
    const errorItem = this._element.querySelector(`.${inputItem.id}-error`)
    inputItem.classList.add(this._object.inputErrorClass);
    // Передаём текст ошибки
    errorItem.textContent = errorMessage;
    // Показываем текст ошибок (через visibility)
    errorItem.classList.add(this._object.errorClass);
  }
  // Метод скрытия ошибок валидации
  _hideValidationError(inputItem) {
    const errorItem = this._element.querySelector(`.${inputItem.id}-error`)
    inputItem.classList.remove(this._object.inputErrorClass);
    // Скрываем текст ошибок (через visibility)
    errorItem.classList.remove(this._object.errorClass);
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
    // Массив инпутов для обработки
    const inputList = Array.from(this._element.querySelectorAll(this._object.inputSelector));
    // Проверяем submit кнопку
    this._toggleButtonState();
    // Проходим по массиву инпутов и проверяем их
    inputList.forEach((inputItem) => {
      inputItem.addEventListener('input', () => {
        this._checkInputValidity(inputItem);
        this._toggleButtonState();
      });
    });
  }
  // Метод обхода input на ошибки
  _hasInvalidInput() {
    return Array.from(this._element.querySelectorAll(this._object.inputSelector)).some((inputItem) => {
      return !inputItem.validity.valid;
    });
  }
  // Публичный метод, который включает валидацию форм
  enableValidationCheck() {
    const formList = Array.from(document.querySelectorAll(this._object.formSelector));
    formList.forEach((formItem) => {
      this._setEventListeners(formItem);
    });
  }
  // Метод активации submit кнопки после валидации
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      // Отключаем кнопку при ошибке валидации
        this._submitElement.setAttribute('disabled', 'true');
        this._submitElement.classList.add(this._object.inactiveButtonClass);
    } else {
      // Включаем кнопку при ошибке валидации
      this._submitElement.classList.remove(this._object.inactiveButtonClass);
      this._submitElement.removeAttribute('disabled');
    }
  }
}

// Экспортируем класс валидации в файл index.js
export { FormValidator };