import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import logo from "../../images/logo.svg";

export default function Regitster({ onRegister, onSetFormValue, onFormValue }) {
  const mailformat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const [errors, setErrors] = useState({});
  const [onChangeButton, setOnChangeButton] = useState(true);
  const [test, setTest] = useState({
    "name": false,
    "email": false,
    "password": false,
  });

  useEffect(() => {
    hundleButton(Object.values(test));
  }, [test]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setTest({ ...test, [name]: formValidate(e) });

    onSetFormValue({
      ...onFormValue,
      [name]: value,
    });
  };

  function formValidate(e) {
    const { name, value } = e.target;

    if (name === "name") {
      return nameFormValidate(name, value);
    } else if (name === "email") {
      return emailFormValidate(name, value);
    } else if (name === "password") {
      return passwordFormValidate(name, value);
    }
  }

  function nameFormValidate(name, value) {
    if (value.length === 0) {
      setErrors({ ...errors, [name]: "" });
      return false;
    } else if (value.length <= 2) {
      setErrors({ ...errors, [name]: "Слишком короткое имя" });
      return false;
    } else if (value.length >= 40) {
      setErrors({ ...errors, [name]: "Слишком длинное имя" });
      return false;
    }

    setErrors({ ...errors, [name]: "" });
    return true;
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

    onRegister();
  };

  return (
    <main className="register">
      <div className="login__container">
        <div className="register__container-title">
          <img className="register__logo" src={logo} alt="Логотип." />
          <h1 className="register__title">Добро пожаловать!</h1>
        </div>

        <form className="register__form" id="form-auth" onSubmit={handleSubmit}>
          <fieldset className="register__set">
            <label className="register__field">
              <h2 className="register__title-input">Имя</h2>
              <input
                type="text"
                className={`register__input ${
                  errors.name ? "register__input_error" : ""
                }`}
                id="name"
                name="name"
                required
                minLength="2"
                maxLength="40"
                onChange={handleChange}
                noValidate
              />
              <span className="register__input-error email-input-error">
                {errors.name}
              </span>
            </label>
            <label className="register__field">
              <h2 className="register__title-input">E-mail</h2>
              <input
                type="email"
                className={`register__input ${
                  errors.email ? "register__input_error" : ""
                }`}
                id="email"
                name="email"
                required
                minLength="2"
                maxLength="40"
                onChange={handleChange}
                noValidate
              />
              <span className="register__input-error email-input-error">
                {errors.email}
              </span>
            </label>
            <label className="register__field">
              <h2 className="register__title-input">Пароль</h2>
              <input
                type="password"
                className={`register__input ${
                  errors.password ? "register__input_error" : ""
                }`}
                id="password"
                name="password"
                required
                minLength="2"
                maxLength="200"
                onChange={handleChange}
                noValidate
              />
              <span className={`register__input-error `}>
                {errors.password}
              </span>
            </label>
          </fieldset>
          <div className="register__button-container">
            <button
              className={`register__button ${
                onChangeButton ? "register__button_disabled" : ""
              } button `}
              type="submit"
              form="form-auth"
              disabled={onChangeButton}
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
    </main>
  );
}
