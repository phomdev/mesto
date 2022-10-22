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
// Получаем описание zoom картинки
const popupImageZoomDescription = popupImageZoom.querySelector('.popup__description');
// Получаем ссылку zoom картинки
const popupImageZoomImage = popupImageZoom.querySelector('.popup__image');
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
// находим все крестики проекта по универсальному селектору
const closeButtons = document.querySelectorAll('.popup__close');
// находим все popup элементы
const popupElements = document.querySelectorAll('.popup');

// Общая функция открытия popup
const openPopup = function (popupName) {
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
  if (evt.keyCode === 27) {
    const popupOpened = document.querySelector('.popup_opened')
    closePopup(popupOpened);
  }
}
// Функция добавления карточки
const addCards = function (name, link) {
  const contentCardTemplate = document.querySelector('#card-template').content;
  const copyCardTemplate = contentCardTemplate.querySelector('.cards__item').cloneNode(true);
  const cardsImage = copyCardTemplate.querySelector('.cards__image');
  const cardDescription = copyCardTemplate.querySelector('.cards__description');

  cardDescription.textContent = name;
  cardsImage.src = link;
  cardsImage.alt = name;

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
    popupImageZoomDescription.textContent = name;
    popupImageZoomImage.src = link;
    popupImageZoomImage.alt = name;
    openPopup(popupImageZoom);
  }

  cardsImage.addEventListener('click', getZoomImages);

  return copyCardTemplate;
}
// Функция сохранения карточек
const addNewCard = function (evt) {
  evt.preventDefault();
  cardsArea.prepend(addCards(nameCardInput.value, linkCardInput.value));
  evt.target.reset()
  closePopup(popupCards);
}
// Функция наполнения страницы начальными карточками
const renderInitialCards = function () {
  initialCards.forEach(function (card) {
    cardsArea.append(addCards(card.name, card.link));
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

// Открываем popup редактирования профиля и передаём сохранённые данные
editProfileIcon.addEventListener('click', openPopupProfile);
// Открываем popup добавления карточки
addCardIcon.addEventListener('click', () => openPopup(popupCards));
// Обработчик закрытия popup на крестик
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});
// Обработчик закрытия popup нажатием за область формы
popupElements.forEach((popupElement) => {
  popupElement.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popupElement);
    }
  });
});
// Обновляем данные формы при нажатии кнопки сохранения
popupProfile.addEventListener('submit', handleProfileFormSubmit);
// Обновляем данные формы при нажатии кнопки добавления карточки
popupCards.addEventListener('submit', addNewCard);