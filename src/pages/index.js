// Импорт списка с карточками и селекторами валидации, классов
import { objectListCard, classListForm } from '../components/utils/constants.js';
import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
// Импорт стилей
import './index.css';
// Импорт задействованных в index переменных
import {
  profileEditingIcon, iconAddCard,
  formCards, formProfile,
  nameInput, descriptionInput
} from '../components/utils/elements.js';
// Объявление popup всплывающего изображения
const popupImageZoom = new PopupWithImage('#image-popup');
popupImageZoom.setEventListeners();
// Получение данных пользователя
const userInfo = new UserInfo({
  usernameSelector: '.profile__name',
  userDescriptionSelector: '.profile__description'
});
// Объявление popup редактирования профиля
const popupEditeProfile = new PopupWithForm('#profile-popup', {
  callbackFormSubmit: (profileData) => {
    userInfo.setUserInfo({
      username: profileData.username,
      description: profileData.description
    });
    popupEditeProfile.close();
  }
});
popupEditeProfile.setEventListeners();
// Объявление функции для popup всплывающего изображения ( нужна по ТЗ )
const handleCardClick = function (name, image) {
  popupImageZoom.open(name, image);
}
// Объявление функции для добавления карточки
const renderCard = function (cardData) {
  const renderCardItem = new Card(cardData, '#card-template', handleCardClick);
  return renderCardItem.makeCard();
}
// Наполнение страницы начальными карточками
const renderInitialCards = new Section({
  items: objectListCard,
  renderer: (cardData) => {
    renderInitialCards.addItem(renderCard(cardData));
  }
}, '.cards');
renderInitialCards.renderItems();
// Объявление popup добавления новой карточки
const popupAddCard = new PopupWithForm('#cards-popup', {
  callbackFormSubmit: (formValues) => {
    renderInitialCards.addItem(renderCard({
      name: formValues.placename,
      link: formValues.placeimage
    }));
    popupAddCard.close();
  }
});
popupAddCard.setEventListeners();
// Валидация popup
const addCardValidate = new FormValidator(classListForm, formCards);
addCardValidate.enableValidationCheck();
const editProfileValidate = new FormValidator(classListForm, formProfile);
editProfileValidate.enableValidationCheck();
// Слушатель на иконку редактирования профиля
profileEditingIcon.addEventListener('click', function () {
  popupEditeProfile.open();
  const actualUserInfo = userInfo.getUserInfo();
  nameInput.setAttribute('value', actualUserInfo.username);
  descriptionInput.setAttribute('value', actualUserInfo.description);
});
// Слушатель на иконку добавления карточки
iconAddCard.addEventListener('click', function () {
  popupAddCard.open();
  addCardValidate.disableSubmitButton();
});