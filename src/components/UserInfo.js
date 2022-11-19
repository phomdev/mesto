class UserInfo {
  // Принимает объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе
  constructor({ usernameSelector, userDescriptionSelector }) {
    this._username = document.querySelector(usernameSelector);
    this._userDescription = document.querySelector(userDescriptionSelector);
  }
  // Метод возвращает объект с данными пользователя
  getUserInfo() {
    return {
      username: this._username.textContent,
      description: this._userDescription.textContent
    };
  }
  // Метод принимает новые данные пользователя и добавляет их на страницу
  setUserInfo({ username, description }) {
    this._username.textContent = username;
    this._userDescription.textContent = description;
  }
}

export { UserInfo };