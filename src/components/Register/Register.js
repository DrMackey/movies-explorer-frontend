import React from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import logo from "../../images/logo.svg";

export default function Regitster() {
  return (
    <section className="register">
      <div className="login__container">
        <div className="register__container-title">
          <img className="register__logo" src={logo} alt="Логотип." />
          <h1 className="register__title">Добро пожаловать!</h1>
        </div>

        <form className="register__form" id="form-auth">
          <fieldset className="register__set">
            <label className="register__field">
              <h2 className="register__title-input">Имя</h2>
              <input
                type="text"
                className="register__input"
                id="name"
                name="name"
                required
                minLength="2"
                maxLength="40"
              />
              <span className="register__input-error email-input-error"></span>
            </label>
            <label className="register__field">
              <h2 className="register__title-input">E-mail</h2>
              <input
                type="email"
                className="register__input"
                id="email"
                name="email"
                required
                minLength="2"
                maxLength="40"
              />
              <span className="register__input-error email-input-error"></span>
            </label>
            <label className="register__field">
              <h2 className="register__title-input">Пароль</h2>
              <input
                type="password"
                className="register__input register__input_error"
                id="password"
                name="password"
                required
                minLength="2"
                maxLength="200"
              />
              <span className="register__input-error password-input-error">
                Что-то пошло не так...
              </span>
            </label>
          </fieldset>
          <div className="register__button-container">
            <button
              className="register__button button"
              type="submit"
              form="form-auth"
            >
              Зарегистрироваться
            </button>
            <div className="register__container-link">
              <p className="register__title-link">Уже зарегистрированы?</p>
              <Link to="/signin" className="register__link">
                Войти
              </Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
