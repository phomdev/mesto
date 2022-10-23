// Объект-список классов для валидации
const classListForm = {
  // Выбираем форму, инпуты и кнопку сабмита
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  // Классы для скрытия кнопки, оформления текста ошибкок и скрытия ошибок (через visibility)
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input_type_visible',
};

// Функция показа ошибок валидации
const showValidationError = function (formItem, inputItem, errorMessage, settings) {
  const errorItem = formItem.querySelector(`.${inputItem.id}-error`)
  inputItem.classList.add(settings.inputErrorClass);
  // Передаём текст ошибки
  errorItem.textContent = errorMessage;
  // Показываем текст ошибок (через visibility)
  errorItem.classList.add(settings.errorClass);
};
// Функция скрытия ошибок валидации
const hideValidationError = function (formItem, inputItem, settings) {
  const errorItem = formItem.querySelector(`.${inputItem.id}-error`)
  inputItem.classList.remove(settings.inputErrorClass);
  // Скрываем текст ошибок (через visibility)
  errorItem.classList.remove(settings.errorClass);
  // Очищаем ошибки
  errorItem.textContent = '';
};
// Функция проверки валидации форм
const checkInputValidity = function (formItem, inputItem, settings) {
  if (inputItem.validity.valid === false) {
    showValidationError(formItem, inputItem, inputItem.validationMessage, settings);
  } else {
    hideValidationError(formItem, inputItem, settings);
  }
};
// Функция проверки всех input
const setEventListeners = function (formItem, settings) {
  const inputList = Array.from(formItem.querySelectorAll(settings.inputSelector));
  const buttonItem = formItem.querySelector(settings.submitButtonSelector);
  toggleButtonState(formItem, buttonItem, settings);
  inputList.forEach((inputItem) => {
    inputItem.addEventListener('input', function () {
      checkInputValidity(formItem, inputItem, settings);
      toggleButtonState(formItem, buttonItem, settings);
    });
  });
}
// Функция обхода input на ошибки
const hasInvalidInput = function (inputList) {
  return inputList.some((item) => {
    return !item.validity.valid;
  });
}
// Общая функция запуска проверки валидации
const enableValidationCheck = function (settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formItem) => {
    setEventListeners(formItem, settings);
  });
}
// Функция активации submit кнопки после валидации
const toggleButtonState = function (formItem, buttonItem, settings) {
  // Объявляем массив для корректной работы some
  const inputList = Array.from(formItem.querySelectorAll(settings.inputSelector));
  if (hasInvalidInput(inputList)) {
    // Отключаем кнопку при ошибке валидации
    buttonItem.classList.add(settings.inactiveButtonClass);
    buttonItem.setAttribute('disabled', true);
  } else {
    // Включаем кнопку при ошибке валидации
    buttonItem.classList.remove(settings.inactiveButtonClass);
    buttonItem.removeAttribute('disabled');
  }
}
// Запускаем валидацию
enableValidationCheck(classListForm);