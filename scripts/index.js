// Импортируем список с карточками и селекторами валидации, класс для валидации, класс для создания экземпляров карточки
import { objectListCard, classListForm } from './objectList.js';
import { FormValidator } from './FormValidator.js';
import { Card } from "./Card.js";

// Получаем элемент иконки редактирования профиля
const profileEditingIcon = document.querySelector('.profile__editor');
// Получаем элемент иконки добавления места
const iconAddCard = document.querySelector('.profile__add-mesto');
// Получаем popup редактирования профиля
const popupProfile = document.querySelector('#profile-popup');
// Получаем форму редактирования профиля
const formProfile = popupProfile.querySelector('.popup__form');
// Получаем popup добавления карточки
const popupCards = document.querySelector('#cards-popup');
// Получаем форму добавления карточки
const formCards = popupCards.querySelector('.popup__form');
// Получаем popup увеличения картинки
export const popupImageZoom = document.querySelector('#image-popup');
// Получаем описание zoom картинки
export const popupImageZoomDescription = popupImageZoom.querySelector('.popup__description');
// Получаем ссылку zoom картинки
export const popupImageZoomImage = popupImageZoom.querySelector('.popup__image');
// Получаем имя профиля
const profileName = document.querySelector('.profile__name');
// Получаем описание профиля
const profileDescription = document.querySelector('.profile__description');
// Получаем input имени
const nameInput = popupProfile.querySelector('#username-input');
// Получаем input названия карточки
const nameCardInput = popupCards.querySelector('#place-name-input');
// Получаем input описания
const descriptionInput = popupProfile.querySelector('#description-input');
// Получаем input ссылки на изображение карточки
const linkCardInput = popupCards.querySelector('#place-image-input');
// Получаем секцию хранения карточек
const cardsArea = document.querySelector('.cards');
// Находим все popup элементы
const popupElements = document.querySelectorAll('.popup');

// Общая функция открытия popup
export const openPopup = function (popupName) {
  popupName.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupThroughEsc)
}
// Функция открытия popup профиля
const openPopupProfile = function () {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openPopup(popupProfile);
}
// Функция закрытия popup
const closePopup = function (popupName) {
  popupName.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupThroughEsc);
}
// Функция закрытия popup по нажатию на ESC
const closePopupThroughEsc = function (evt) {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector('.popup_opened')
    closePopup(popupOpened);
  }
}
// Функция рендера карточек
const renderCard = function (object, template) {
  const card = new Card(object, template);
  return card.makeCard();
}
// Функция сохранения карточек
const addNewCard = function (evt) {
  evt.preventDefault();
  // Добавляем экземпляр класса, в качестве объекта используется безымянный объект
  // имя: данные из формы,
  // ссылка: данные из формы
  cardsArea.prepend(renderCard({
    name: nameCardInput.value,
    link: linkCardInput.value
  }, '#card-template'));
  evt.target.reset();
  closePopup(popupCards);
  addCardValidate.disableSubmitButton();
}
// Функция наполнения страницы начальными карточками
const renderInitialCards = function () {
  objectListCard.forEach(function (card) {
    cardsArea.append(renderCard(card, '#card-template'));
  });
}
// Вызываем функцию для добавления начальных карточек при загрузке страницы
renderInitialCards();
// Функция сохранения введённых в форму данных (имени и описания)
const handleProfileFormSubmit = function (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(popupProfile);
}

// Запускаем валидацию на форму добавления карточки и редактирования профиля
const addCardValidate = new FormValidator(classListForm, popupCards);
addCardValidate.enableValidationCheck();
const editProfileValidate = new FormValidator(classListForm, formProfile);
editProfileValidate.enableValidationCheck();
// Открываем popup редактирования профиля и передаём сохранённые данные
profileEditingIcon.addEventListener('click', openPopupProfile);
// Открываем popup добавления карточки
iconAddCard.addEventListener('click', () => openPopup(popupCards));
// Обработчик закрытия popup нажатием за область формы
popupElements.forEach( popupElement => {
  popupElement.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close')) {
      closePopup(popupElement);
    }
  });
});
// Обновляем данные формы при нажатии кнопки сохранения
formProfile.addEventListener('submit', handleProfileFormSubmit);
// Обновляем данные формы при нажатии кнопки добавления карточки
formCards.addEventListener('submit', addNewCard);