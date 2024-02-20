import React from "react";
import { Link } from "react-router-dom";
import "./Portfolio.css";

export default function Portfolio() {
  return (
    <section className="portfolio">
      <div className="portfolio__container">
        <h2 className="portfolio__title">Портфолио</h2>
        <ul className="portfolio__list">
          <li className="portfolio__item">
            <Link
              to="https://github.com/DrMackey/russian-travel?tab=readme-ov-file"
              className="portfolio__link"
              target="_blank"
            >
              <p className="portfolio__link-title">Статичный сайт</p>
              <p className="portfolio__link-title-arrow">↗</p>
            </Link>
          </li>
          <li className="portfolio__item">
            <Link
              to="https://drmackey.github.io/how-to-learn/"
              className="portfolio__link"
              target="_blank"
            >
              <p className="portfolio__link-title">Адаптивный сайт</p>
              <p className="portfolio__link-title-arrow">↗</p>
            </Link>
          </li>
          <li className="portfolio__item">
            <Link
              to="https://github.com/DrMackey/react-mesto-api-full-gha"
              className="portfolio__link"
              target="_blank"
            >
              <p className="portfolio__link-title">Одностраничное приложение</p>
              <p className="portfolio__link-title-arrow">↗</p>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
