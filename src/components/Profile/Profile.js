import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { currentUserContext } from "../contexts/CurrentUserContext.js";
import "./Profile.css";

export default function Profile({
  onUpdateUser,
  onSignOut,
  isChangeEditButton,
  setIsChangeEditButton,
  onChangeButton,
  setOnChangeButton,
}) {
  const currentUser = React.useContext(currentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const mailformat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const [errors, setErrors] = useState({});

  const [isInputsStatus, setIsInputsStatus] = useState({
    "nickname": false,
    "email": false,
  });

  useEffect(() => {
    hundleButton(Object.values(isInputsStatus));
  }, [isInputsStatus]);

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();

    if (name === currentUser.name && email === currentUser.email) {
      setIsChangeEditButton(false);
    } else {
      onUpdateUser(dataValidate());
      // setName("");
      // setEmail("");
    }
  }

  function dataValidate() {
    const newName = name ? name : currentUser.name;
    const newEmail = email ? email : currentUser.email;

    return { newName, newEmail };
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
      setErrors({ ...errors, [name]: "Поле не может быть пустым" });
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
    } else if (value === currentUser.name && email === currentUser.email) {
      setErrors({
        ...errors,
        [name]: "Данные не могут совпадать с текущими",
        "email": "Данные не могут совпадать с текущими",
      });
      setIsInputsStatus({ ...isInputsStatus, "email": false });
      return false;
    }

    setErrors({ ...errors, [name]: "", "email": "" });
    return true;
  }

  function emailFormValidate(nameInput, value) {
    if (value.length === 0) {
      setErrors({ ...errors, [nameInput]: "Поле не может быть пустым" });
      return false;
    } else if (value.length <= 2) {
      setErrors({ ...errors, [nameInput]: "Слишком короткий E-mail" });
      return false;
    } else if (value.length >= 40) {
      setErrors({ ...errors, [nameInput]: "Слишком длинний E-mail" });
      return false;
    } else if (name === currentUser.name && value === currentUser.email) {
      setErrors({
        ...errors,
        [nameInput]: "Данные не могут совпадать с текущими",
        "nickname": "Данные не могут совпадать с текущими",
      });
      setIsInputsStatus({ ...isInputsStatus, "nickname": false });
      return false;
    } else if (!value.match(mailformat)) {
      setErrors({
        ...errors,
        [nameInput]: "Почта не соответствует маске mail@mail.com",
      });
      return false;
    }

    setErrors({ ...errors, [nameInput]: "", "nickname": "" });
    return true;
  }

  function handleChangeName(e) {
    const { name } = e.target;

    setName(e.target.value);
    setIsInputsStatus({ ...isInputsStatus, [name]: formValidate(e) });
  }

  function handleChangeEmail(e) {
    const { name } = e.target;

    setEmail(e.target.value);
    setIsInputsStatus({ ...isInputsStatus, [name]: formValidate(e) });
  }

  function hundleButton(data) {
    if (!data.includes(true)) {
      setOnChangeButton(true);
      return;
    }
    setOnChangeButton(false);
  }

  function onChangeEditButton() {
    setIsChangeEditButton(true);
  }

  return (
    <main className="profile">
      <div className="profile__container">
        <div className="profile__wrapper-title">
          <h1 className="profile__title">Привет, {currentUser.name}!</h1>
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
                // placeholder={currentUser.name}
                value={name}
                minLength="2"
                maxLength="40"
                onChange={handleChangeName}
                disabled={!isChangeEditButton}
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
                // placeholder={currentUser.email}
                value={email}
                minLength="2"
                maxLength="40"
                onChange={handleChangeEmail}
                disabled={!isChangeEditButton}
              />
              <span className="profile__input-error email-input-error">
                {errors.email}
              </span>
            </label>
          </fieldset>
        </form>
        <div className="profile__button-сontainer">
          {isChangeEditButton ? (
            <>
              <div></div>
              <button
                className={`profile__button ${
                  onChangeButton ? "profile__button_disabled" : ""
                } button `}
                type="submit"
                form="profile-edit"
                disabled={onChangeButton}
              >
                Сохранить
              </button>
            </>
          ) : (
            <>
              <button
                className={`profile__edit-button button`}
                onClick={onChangeEditButton}
              >
                Редактировать
              </button>
              <Link to="/" className="profile__signout" onClick={onSignOut}>
                Выйти из аккаунта
              </Link>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
