import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import logo from "../../images/logo.svg";

export default function Login({ onLogin, onSetFormValue, onFormValue }) {
  const mailformat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const [errors, setErrors] = useState({});
  const [onChangeButton, setOnChangeButton] = useState(true);
  const [isValidateForms, setIsValidateForms] = useState({
    "email": false,
    "password": false,
  });

  useEffect(() => {
    const { email } = onFormValue;
    if (email.length !== 0) {
      setIsValidateForms({ "email": true, "password": true });
    }
  }, []);

  useEffect(() => {
    hundleButton(Object.values(isValidateForms));
  }, [isValidateForms]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setIsValidateForms({
      ...isValidateForms,
      [name]: formValidate(name, value),
    });

    onSetFormValue({
      ...onFormValue,
      [name]: value,
    });
  };

  function formValidate(name, value) {
    if (name === "email") {
      return emailFormValidate(name, value);
    } else if (name === "password") {
      return passwordFormValidate(name, value);
    }
  }

  function emailFormValidate(name, value) {
    if (value.length === 0) {
      setErrors({ ...errors, [name]: "" });
      return false;
    } else if (value.length <= 2) {
      setErrors({ ...errors, [name]: "Слишком коротокая запись в" });
      return false;
    } else if (value.length >= 40) {
      setErrors({ ...errors, [name]: "Слишком длинная запись" });
      return false;
    } else if (!value.match(mailformat)) {
      setErrors({
        ...errors,
        [name]: "Почта не соответствует маске mail@mail.com",
      });
      return false;
    }

    setErrors({ ...errors, [name]: "" });
    return true;
  }

  function passwordFormValidate(name, value) {
    if (value.length === 0) {
      setErrors({ ...errors, [name]: "" });
      return false;
    } else if (value.length <= 7) {
      setErrors({ ...errors, [name]: "Пароль меньше 8 символов" });
      return false;
    } else if (value.length >= 40) {
      setErrors({ ...errors, [name]: "Слишком длинный пароль" });
      return false;
    }

    setErrors({ ...errors, [name]: "" });
    return true;
  }

  function hundleButton(data) {
    if (!data.includes(false)) {
      setOnChangeButton(false);
      return;
    }
    setOnChangeButton(true);
  }

  const handleSubmit = (e) => {
    formValidate(e);
    e.preventDefault();

    onLogin();
  };

  return (
    <main className="login">
      <div className="login__container">
        <div className="login__container-title">
          <img className="login__logo" src={logo} alt="Логотип." />
          <h1 className="login__title">Рады видеть!</h1>
        </div>
        <form className="login__form" id="form-auth" onSubmit={handleSubmit}>
          <fieldset className="login__set">
            <label className="login__field">
              <h2 className="login__title-input">E-mail</h2>
              <input
                type="email"
                className={`login__input ${
                  errors.email ? "login__input_error" : ""
                }`}
                id="email"
                name="email"
                required
                minLength="2"
                maxLength="40"
                value={onFormValue.email}
                onChange={handleChange}
              />
              <span className="login__input-error email-input-error">
                {errors.email}
              </span>
            </label>
            <label className="login__field">
              <h2 className="login__title-input">Пароль</h2>
              <input
                type="password"
                className={`login__input ${
                  errors.password ? "login__input_error" : ""
                }`}
                id="password"
                name="password"
                required
                minLength="2"
                maxLength="200"
                value={onFormValue.password}
                onChange={handleChange}
              />
              <span className="login__input-error password-input-error">
                {errors.password}
              </span>
            </label>
          </fieldset>
          <div className="login__button-container">
            <button
              className={`login__button ${
                onChangeButton ? "login__button_disabled" : ""
              } button `}
              type="submit"
              form="form-auth"
              disabled={onChangeButton}
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
