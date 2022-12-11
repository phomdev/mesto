// Объект со списком классов формы для валидации
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

// Экспортируем массив с карточками и объект с селекторами валидации в файл index.js
export { classListForm };