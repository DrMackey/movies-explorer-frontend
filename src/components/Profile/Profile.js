import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { currentUserContext } from "../contexts/CurrentUserContext.js";
import "./Profile.css";

export default function Profile({ userData, onUpdateUser, onSignOut }) {
  const currentUser = React.useContext(currentUserContext);
  const [name, setName] = useState(currentUser.name ?? "");
  const [email, setEmail] = useState(currentUser.email ?? "");
  const mailformat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const [errors, setErrors] = useState({});
  const [onChangeButton, setOnChangeButton] = useState(true);
  const [test, setTest] = useState({
    "nickname": false,
    "email": false,
  });

  useEffect(() => {
    hundleButton(Object.values(test));
  }, [test]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      email,
    });
  }

  function formValidate(e) {
    const { name, value } = e.target;

    if (name === "nickname") {
      return nameFormValidate(name, value);
    } else if (name === "email") {
      return emailFormValidate(name, value);
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
    } else if (value.length >= 40) {
      setErrors({ ...errors, [name]: "Слишком длинное имя" });
      return false;
    } else if (userData.name === value) {
      setErrors({
        ...errors,
        [name]: "Имя не может совпадать с текущим",
      });
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
      setErrors({ ...errors, [name]: "Слишком короткий E-mail" });
      return false;
    } else if (value.length >= 40) {
      setErrors({ ...errors, [name]: "Слишком длинний E-mail" });
      return false;
    } else if (userData.email === value) {
      setErrors({
        ...errors,
        [name]: "Почта не может совпадать с текущей",
      });
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

  function handleChangeName(e) {
    const { name, value } = e.target;

    setName(e.target.value);
    setTest({ ...test, [name]: formValidate(e) });
  }

  function handleChangeEmail(e) {
    const { name, value } = e.target;

    setEmail(e.target.value);
    setTest({ ...test, [name]: formValidate(e) });
  }

  function hundleButton(data) {
    if (!data.includes(false)) {
      setOnChangeButton(false);
      return;
    }
    setOnChangeButton(true);
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  return (
    <main className="profile">
      <div className="profile__container">
        <div className="profile__wrapper-title">
          <h1 className="profile__title">Привет, {userData.name}!</h1>
        </div>
        <form
          className="profile__form"
          id="profile-edit"
          onSubmit={handleSubmit}
        >
          <fieldset className="profile__set">
            <label className="profile__field">
              <p className="profile__input-title">Имя</p>
              <input
                type="text"
                className={`profile__input ${
                  errors.nickname ? "profile__input_error" : ""
                }`}
                id="nickname"
                name="nickname"
                defaultValue={userData.name}
                required
                minLength="2"
                maxLength="40"
                onChange={handleChangeName}
              />
              <span className="profile__input-error email-input-error">
                {errors.nickname}
              </span>
            </label>

            <label className="profile__field">
              <p className="profile__input-title">E-mail</p>
              <input
                type="email"
                className={`profile__input ${
                  errors.email ? "profile__input_error" : ""
                }`}
                id="email"
                name="email"
                defaultValue={userData.email}
                required
                minLength="2"
                maxLength="40"
                onChange={handleChangeEmail}
              />
              <span className="profile__input-error email-input-error">
                {errors.email}
              </span>
            </label>
          </fieldset>
          <div className="profile__button-сontainer">
            <button
              className={`profile__button ${
                onChangeButton ? "profile__button_disabled" : ""
              } button `}
              type="submit"
              form="profile-edit"
              disabled={onChangeButton}
            >
              Редактировать
            </button>
          </div>
        </form>
        <Link to="/signin" className="profile__signout" onClick={onSignOut}>
          Выйти из аккаунта
        </Link>
      </div>
    </main>
  );
}
