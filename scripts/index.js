// Получаем элемент иконки редактирования
const editProfile = document.querySelector('.profile__editor');
// Получаем popup редактирования профиля
const popupEditProfile = document.querySelector('.popup-edit');
// Получаем элемент иконки закрытия popup
const popupClose = popupEditProfile.querySelector('.popup-edit__close');
// Получаем имя профиля
let profileName = document.querySelector('.profile__name');
// Получаем описание профиля
let profileDescription = document.querySelector('.profile__description');
// Получаем input имени
let nameInput = popupEditProfile.querySelector('.popup-edit__input_name');
// Получаем input описания
let descriptionInput = popupEditProfile.querySelector('.popup-edit__input_description');

// Функция для добавления класса в popup
const popupToggle = function () {
  popupEditProfile.classList.toggle('popup-edit_opened');
}
// Функция сохранения введённых в форму данных (имени и описания)
const formSubmitHandler = function (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  popupToggle();
}

// Добавляем класс в popup при клике на иконку редактирования профиля
editProfile.addEventListener('click', popupToggle);
// Удаляем класс из popup при клике на иконку закрытия popup
popupClose.addEventListener('click', popupToggle);
// Обновляем данные формы при нажатии кнопки сохранения
popupEditProfile.addEventListener('submit', formSubmitHandler);