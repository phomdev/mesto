// Получаем элемент иконки редактирования профиля
const editProfileIcon = document.querySelector('.profile__editor');
// Получаем элемент иконки добавления места
const addCardIcon = document.querySelector('.profile__add-mesto');
// Получаем popup редактирования профиля
const popupProfile = document.querySelector('#profile-popup');
// Получаем popup добавления карточки
const popupCards = document.querySelector('#cards-popup');
// Получаем popup увеличения картинки
const popupImageZoom = document.querySelector('#image-popup');
// Получаем элемент иконки закрытия popup редактирования профиля
const popupProfileCloseIcon = popupProfile.querySelector('.popup__close');
// Получаем элемент иконки закрытия popup добавления карточки
const popupCardsCloseIcon = popupCards.querySelector('.popup__close');
// Получаем элемент иконки закрытия popup увеличения картинки
const popupImageZoomCloseIcon = popupImageZoom.querySelector('.popup__close');
// Получаем имя профиля
const profileName = document.querySelector('.profile__name');
// Получаем описание профиля
const profileDescription = document.querySelector('.profile__description');
// Получаем input имени
const nameInput = popupProfile.querySelector('.popup__input_item_name');
// Получаем input названия карточки
const nameCardInput = popupCards.querySelector('.popup__input_item_name');
// Получаем input описания
const descriptionInput = popupProfile.querySelector('.popup__input_item_description');
// Получаем input ссылки на изображение карточки
const linkCardInput = popupCards.querySelector('.popup__input_item_description');
// Получаем секцию хранения карточек
const cardsArea = document.querySelector('.cards');

// Функция открытия popup
const popupOpen = function (popupName) {
  popupName.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
}
// Функция закрытия popup
const popupClose = function (popupName) {
  popupName.classList.remove('popup_opened');
}
// Функция добавления карточки
const addCards = function (name, link) {
  const contentCardTemplate = document.querySelector('#card-template').content;
  const copyCardTemplate = contentCardTemplate.querySelector('.cards__item').cloneNode(true);

  copyCardTemplate.querySelector('.cards__description').textContent = name;
  copyCardTemplate.querySelector('.cards__image').src = link;

  // Добавляем возможность лайкать карточку
  copyCardTemplate.querySelector('.cards__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('cards__like_active');
  });
  // Добавляем возможность удалять карточку по клику
  copyCardTemplate.querySelector('.cards__delete').addEventListener('click', function (evt) {
    evt.target.closest('.cards__item').remove();
  });
  // Добавляем возможность увеличения картинки при клике
  const getZoomImages = function () {
    popupImageZoom.querySelector('.popup__description').textContent = name;
    popupImageZoom.querySelector('.popup__image').src = link;
    popupOpen(popupImageZoom);
  }

  copyCardTemplate.querySelector('.cards__image').addEventListener('click', getZoomImages);

  return copyCardTemplate;
}
// Функция сохранения карточек
const integrationCard = function (evt) {
  evt.preventDefault();
  cardsArea.prepend(addCards(nameCardInput.value, linkCardInput.value));
  popupClose(popupCards);
}
// Функция наполнения страницы начальными карточками
const integrationInitialCards = function () {
  initialCards.forEach(function (card) {
    cardsArea.append(addCards(card.name, card.link));
  });
}
// Вызываем функцию для добавления начальных карточек при загрузке страницы
integrationInitialCards();
// Функция сохранения введённых в форму данных (имени и описания)
const formSubmitHandler = function (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  popupClose(popupProfile);
}

// Открываем popup редактирования профиля
editProfileIcon.addEventListener('click', () => popupOpen(popupProfile));
// Открываем popup добавления карточки
addCardIcon.addEventListener('click', () => popupOpen(popupCards));
// Закрываем popup редактирования профиля
popupProfileCloseIcon.addEventListener('click', () => popupClose(popupProfile));
// Закрываем popup добавления карточки
popupCardsCloseIcon.addEventListener('click', () => popupClose(popupCards));
// Закрываем popup увеличения изображения
popupImageZoomCloseIcon.addEventListener('click', () => popupClose(popupImageZoom));
// Обновляем данные формы при нажатии кнопки сохранения
popupProfile.addEventListener('submit', formSubmitHandler);
// Обновляем данные формы при нажатии кнопки добавления карточки
popupCards.addEventListener('submit', integrationCard);