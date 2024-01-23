import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

export default function Header({ onChangeScroll, isLogin }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();
  if (pathname === "/signup" || pathname === "/signin") return null;

  function onChangeVisible() {
    onChangeScroll();
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <>
      <header
        className={`header ${pathname === "/" ? "header_main-page" : ""}`}
      >
        <Link to="/" className="header__logo" />
        {isLogin ? (
          <>
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
            <button
              className="header__button"
              onClick={onChangeVisible}
            ></button>
          </>
        ) : (
          <nav className="header__nav">
            <Link to="/signup" className="header__register-link">
              Регистрация
            </Link>
            <Link to="/signin" className="header__login-link">
              Войти
            </Link>
          </nav>
        )}
      </header>
      <div
        className={`menu-wrapper ${isMenuOpen ? "" : "menu-wrapper_closed"}`}
      ></div>
      <section
        className={`navigation ${isMenuOpen ? "" : "navigation_closed"}`}
      >
        <button
          className="navigation__close-button"
          onClick={onChangeVisible}
        ></button>
        <ul className="navigation__list">
          <li className="navigation__item">
            <Link
              to="/"
              className="navigation__item-link"
              onClick={onChangeVisible}
            >
              Главная
            </Link>
          </li>
          <li className="navigation__item">
            <Link
              to="/movies"
              className="navigation__item-link navigation__item-link_active"
              onClick={onChangeVisible}
            >
              Фильмы
            </Link>
          </li>
          <li className="navigation__item">
            <Link
              to="/saved-movies"
              className="navigation__item-link"
              onClick={onChangeVisible}
            >
              Сохранённые фильмы
            </Link>
          </li>
        </ul>
        <div className="navigation__profile-container">
          <Link
            to="/profile"
            className="navigation__profile-link"
            onClick={onChangeVisible}
          >
            <p className="navigation__profile-link-title">Аккаунт</p>
            <div className="navigation__profile-icon"></div>
          </Link>
        </div>
      </section>
    </>
  );
}
