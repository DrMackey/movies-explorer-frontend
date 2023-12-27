import React from "react";
import { Link } from "react-router-dom";
import "./Profile.css";

export default function Profile() {
  return (
    <main className="profile">
      <div className="profile__container">
        <div className="profile__wrapper-title">
          <h1 className="profile__title">Привет, Виталий!</h1>
        </div>
        <form className="profile__form" id="profile-edit">
          <fieldset className="profile__set">
            <label className="profile__field">
              <p className="profile__input-title">Имя</p>
              <input
                type="text"
                className="profile__input"
                id="nickname"
                name="nickname"
                placeholder="Виталий"
                required
                minLength="2"
                maxLength="200"
              />
            </label>
            <label className="profile__field">
              <p className="profile__input-title">E-mail</p>
              <input
                type="email"
                className="profile__input"
                id="email"
                name="email"
                placeholder="pochta@yandex.ru"
                required
                minLength="2"
                maxLength="40"
              />
            </label>
          </fieldset>
          <div className="profile__button-сontainer">
            <button className="profile__button" type="submit" form="form-auth">
              Редактировать
            </button>
          </div>
        </form>
        <Link to="/signin" className="profile__signout">
          Выйти из аккаунта
        </Link>
      </div>
    </main>
  );
}
