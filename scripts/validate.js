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
const showValidationError = function (formItem, inputItem, errorMessage) {
  const errorItem = formItem.querySelector(`.${inputItem.id}-error`)
  inputItem.classList.add(classListForm.inputErrorClass);
  // Передаём текст ошибки
  errorItem.textContent = errorMessage;
  // Показываем текст ошибок (через visibility)
  errorItem.classList.add(classListForm.errorClass);
};
// Функция скрытия ошибок валидации
const hideValidationError = function (formItem, inputItem) {
  const errorItem = formItem.querySelector(`.${inputItem.id}-error`)
  inputItem.classList.remove(classListForm.inputErrorClass);
  // Скрываем текст ошибок (через visibility)
  errorItem.classList.remove(classListForm.errorClass);
  // Очищаем ошибки
  errorItem.textContent = '';
};
// Функция проверки валидации форм
const checkInputValidity = function (formItem, inputItem) {
  if (inputItem.validity.valid === false) {
    showValidationError(formItem, inputItem, inputItem.validationMessage);
  } else {
    hideValidationError(formItem, inputItem);
  }
};
// Функция проверки всех input
const setEventListeners = function (formItem) {
  const inputList = Array.from(formItem.querySelectorAll(classListForm.inputSelector));
  const buttonItem = formItem.querySelector(classListForm.submitButtonSelector);
  toggleButtonState(inputList, buttonItem);
  inputList.forEach((inputItem) => {
      inputItem.addEventListener('input', function () {
      checkInputValidity(formItem, inputItem);
      toggleButtonState(inputList, buttonItem);
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
const enableValidationCheck = function () {
  const formList = Array.from(document.querySelectorAll(classListForm.formSelector));
  formList.forEach((formItem) => {
      formItem.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formItem);
  });
}
// Функция активации submit кнопки после валидации
const toggleButtonState = function (inputList, buttonItem) {
  if (hasInvalidInput(inputList)) {
    // Отключаем кнопку при ошибке валидации
    buttonItem.classList.add(classListForm.inactiveButtonClass);
  } else {
    // Включаем кнопку при ошибке валидации
    buttonItem.classList.remove(classListForm.inactiveButtonClass);
  }
}
// Запускаем валидацию
enableValidationCheck();