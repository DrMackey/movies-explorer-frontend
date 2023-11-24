import React from "react";
import { Link } from "react-router-dom";
import "./Portfolio.css";

export default function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <Link to="#" className="portfolio__link" target="_blank">
            Статичный сайт
          </Link>
        </li>
        <li className="portfolio__item">
          <Link to="#" className="portfolio__link" target="_blank">
            Адаптивный сайт
          </Link>
        </li>
        <li className="portfolio__item">
          <Link to="#" className="portfolio__link" target="_blank">
            Одностраничное приложение
          </Link>
        </li>
      </ul>
    </section>
  );
}
