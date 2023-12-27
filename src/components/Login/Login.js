import React from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import logo from "../../images/logo.svg";

export default function Login() {
  return (
    <main className="login">
      <div className="login__container">
        <div className="login__container-title">
          <img className="login__logo" src={logo} alt="Логотип." />
          <h1 className="login__title">Рады видеть!</h1>
        </div>

        <form className="login__form" id="form-auth">
          <fieldset className="login__set">
            <label className="login__field">
              <h2 className="login__title-input">E-mail</h2>
              <input
                type="email"
                className="login__input"
                id="email"
                name="email"
                required
                minLength="2"
                maxLength="40"
              />
              <span className="login__input-error email-input-error"></span>
            </label>
            <label className="login__field">
              <h2 className="login__title-input">Пароль</h2>
              <input
                type="password"
                className="login__input"
                id="password"
                name="password"
                required
                minLength="2"
                maxLength="200"
              />
              <span className="login__input-error password-input-error"></span>
            </label>
          </fieldset>
          <div className="login__button-container">
            <button
              className="login__button button"
              type="submit"
              form="form-auth"
            >
              Войти
            </button>
            <div className="login__container-link">
              <p className="login__title-link">Ещё не зарегистрированы?</p>
              <Link to="/signup" className="login__link">
                Регистрация
              </Link>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
