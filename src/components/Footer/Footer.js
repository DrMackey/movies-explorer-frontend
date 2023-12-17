import React from "react";
import { Link, useLocation } from "react-router-dom";

import "./Footer.css";

export default function SavedMovies() {
  const { pathname } = useLocation();
  if (
    pathname === "/profile" ||
    pathname === "/signup" ||
    pathname === "/signin"
  )
    return null;

  return (
    <footer className="footer">
      <h2 className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h2>
      <div className="footer__link-wrapper">
        <ul className="footer__list">
          <li className="footer__item">
            <Link
              to="https://practicum.yandex.ru/"
              className="footer__link"
              target="_blank"
            >
              Яндекс.Практикум
            </Link>
          </li>
          <li className="footer__item">
            <Link
              to="https://github.com/DrMackey"
              className="footer__link"
              target="_blank"
            >
              Github
            </Link>
          </li>
        </ul>
        <p className="footer__copyright">&copy; 2020</p>
      </div>
    </footer>
  );
}
