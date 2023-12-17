import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

export default function Main() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();
  if (pathname === "/signup" || pathname === "/signin") return null;

  function onChangeVisible() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <>
      <header
        className={`header ${pathname === "/" ? "header_main-page" : ""}`}
      >
        <Link to="/" className="header__logo" />
        <nav className="header__desc-menu">
          <ul className="header__desc-list">
            <li className="header__desc-item">
              <Link to="/movies" className="header__desc-item-link">
                Фильмы
              </Link>
            </li>
            <li className="header__desc-item">
              <Link to="/saved-movies" className="header__desc-item-link">
                Сохранённые фильмы
              </Link>
            </li>
          </ul>
          <Link to="/profile" className="header__profile-link">
            <p className="header__profile-link-title">Аккаунт</p>
            <div
              className={`header__profile-icon ${
                pathname === "/" ? "header__profile-icon-main" : ""
              }`}
            ></div>
          </Link>
        </nav>
        <button className="header__button" onClick={onChangeVisible}></button>
      </header>
      <div
        className={`header__menu-wrapper ${
          isMenuOpen ? "" : "header__menu-wrapper_closed"
        }`}
      ></div>
      <section
        className={`header__menu ${isMenuOpen ? "" : "header__menu_closed"}`}
      >
        <button
          className="header__close-button"
          onClick={onChangeVisible}
        ></button>
        <ul className="header__list">
          <li className="header__item">
            <Link
              to="/"
              className="header__item-link"
              onClick={onChangeVisible}
            >
              Главная
            </Link>
          </li>
          <li className="header__item">
            <Link
              to="/movies"
              className="header__item-link header__item-link_active"
              onClick={onChangeVisible}
            >
              Фильмы
            </Link>
          </li>
          <li className="header__item">
            <Link
              to="/saved-movies"
              className="header__item-link"
              onClick={onChangeVisible}
            >
              Сохранённые фильмы
            </Link>
          </li>
        </ul>
        <div className="header__profile-container">
          <Link
            to="/profile"
            className="header__profile-link"
            onClick={onChangeVisible}
          >
            <p className="header__profile-link-title">Аккаунт</p>
            <div className="header__profile-icon"></div>
          </Link>
        </div>
      </section>
    </>
  );
}
