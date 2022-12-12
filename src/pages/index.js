// Импорт списка с карточками и селекторами валидации, классов
import { classListForm } from '../components/utils/constants.js';
import { apiFindings } from '../components/utils/apiFindings.js';
import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupNotice } from '../components/PopupNotice.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
// Импорт стилей
import './index.css';
// Импорт задействованных в index переменных
import {
  profileEditingIcon, iconAddCard,
  formCards, formProfile,
  nameInput, descriptionInput,
  popupAvatarEditForm, iconAvatarEdit
} from '../components/utils/elements.js';
// Объявление экземпляра API
const apiConnect = new Api(apiFindings);
// Переменная для хранения ID пользователя
let userId;
// Получение данных пользователя
const userInfo = new UserInfo({
  usernameSelector: '.profile__name',
  userDescriptionSelector: '.profile__description',
  userAvatarSelector: '.profile__avatar'
});
// Объявление функции для добавления карточки
const renderCard = function (cardObject) {
  // Последним аргументом передаются всевозможные действия с карточкой
  const cardItem = new Card(cardObject, '#card-template', userId, { cardId: cardObject._id, authorId: cardObject.owner._id, }, {
    // Увеличение картинки
    handleCardZoom: (name, image) => { popupImageZoom.open(name, image) },
    // Удаление карточки
    handleCardDelete: (cardElement, cardId) => { popupNoticeDelete.open(cardElement, cardId) },
    // Добавление лайка
    handleCardLike: (cardId) => { apiConnect.putCardLike(cardId)
        .then((res) => {
          cardItem.renderCardLike(res);
        })
        .catch((err) => { console.log(`При лайке карточки возникла ошибка, ${err}`) })
    },
    // Удаление лайка
    handleCardDeleteLike: (cardId) => { apiConnect.deleteCardLike(cardId)
        .then((res) => {
          cardItem.renderCardLike(res);
        })
        .catch((err) => { console.log(`При дизлайке карточки возникла ошибка, ${err}`) })
    },
  });
  return cardItem.makeCard();
}
// Наполнение страницы карточками через API
const renderInitialCards = new Section({
  renderer: (cardObject) => {
    renderInitialCards.addItem(renderCard(cardObject));
  }
}, '.cards');
// Общий промис, срабатывающий при положительном результате обоих запросов
Promise.all([ apiConnect.getUserData(), apiConnect.getInitialCards() ]).then(([ userProfileData, cardObject ]) => {
    userId = userProfileData._id;
    userInfo.setUserInfo({ username: userProfileData.name, description: userProfileData.about });
    renderInitialCards.renderItems(cardObject.reverse());
    userInfo.setUserAvatar(userProfileData.avatar);
  })
  .catch((err) => { console.log(`Возникла глобальная ошибка, ${err}`) })
// Объявление popup всплывающего изображения
const popupImageZoom = new PopupWithImage('#image-popup');
popupImageZoom.setEventListeners();
// Объявление popup редактирования аватара
const popupEditeAvatar = new PopupWithForm('#avatar-popup', {
  callbackFormSubmit: (userProfileData) => { popupEditeAvatar.putSavingProcessText(); apiConnect.sendAvatarData(userProfileData)
      .then((res) => {
        userInfo.setUserAvatar(res.avatar);
        popupEditeAvatar.close();
      })
      .catch((err) => { console.log(`При обновлении аватара возникла ошибка, ${err}`) })
      .finally(() => {
        popupEditeAvatar.returnSavingProcessText();
      })
  }
});
popupEditeAvatar.setEventListeners();
// Объявление popup подтверждения удаления карточки
const popupNoticeDelete = new PopupNotice("#delete-card", {
  callbackNotice: (cardElement, cardId) => { apiConnect.deleteCard(cardId)
      .then(() => {
        cardElement.deleteCard();
        popupNoticeDelete.close();
      })
      .catch((err) => { console.log(`При удалении карточки возникла ошибка, ${err}`) })
  }
});
popupNoticeDelete.setEventListeners();
// Объявление popup редактирования профиля
const popupEditeProfile = new PopupWithForm('#profile-popup', {
  callbackFormSubmit: (userProfileData) => { popupEditeProfile.putSavingProcessText(); apiConnect.sendUserData(userProfileData)
      .then((res) => {
        userInfo.setUserInfo({ username: res.name, description: res.about });
        popupEditeProfile.close();
      })
      .catch((err) => { console.log(`При редактировании профиля возникла ошибка, ${err}`) })
      .finally(() => {
        popupEditeProfile.returnSavingProcessText();
      })
  }
});
popupEditeProfile.setEventListeners();
// Объявление popup добавления новой карточки
const popupAddCard = new PopupWithForm('#cards-popup', {
  callbackFormSubmit: (formValues) => { popupAddCard.putSavingProcessText(); apiConnect.addNewCard({ name: formValues.placename, link: formValues.placeimage })
      .then((card) => {
        renderInitialCards.addItem(renderCard(card));
        popupAddCard.close();
      })
      .catch((err) => { console.log(`При добавлении новой карточки возникла ошибка, ${err}`) })
      .finally(() => {
        popupAddCard.returnSavingProcessText();
      })
  }
});
popupAddCard.setEventListeners();
// Валидация popup
const cardItemValidate = new FormValidator(classListForm, formCards);
cardItemValidate.enableValidationCheck();
const profileEditeValidate = new FormValidator(classListForm, formProfile);
profileEditeValidate.enableValidationCheck();
const profileAvatarEditValidate = new FormValidator(classListForm, popupAvatarEditForm);
profileAvatarEditValidate.enableValidationCheck();
// Слушатель на иконку редактирования профиля
profileEditingIcon.addEventListener('click', function () {
  popupEditeProfile.open();
  profileEditeValidate.resetValidate();
  const actualUserInfo = userInfo.getUserInfo();
  nameInput.value = actualUserInfo.username;
  descriptionInput.value = actualUserInfo.description;
});
// Слушатель на иконку изменения аватара
iconAvatarEdit.addEventListener('click', function () {
  popupEditeAvatar.open();
  profileAvatarEditValidate.resetValidate();
});
// Слушатель на иконку добавления карточки
iconAddCard.addEventListener('click', function () {
  popupAddCard.open();
  cardItemValidate.resetValidate();
});