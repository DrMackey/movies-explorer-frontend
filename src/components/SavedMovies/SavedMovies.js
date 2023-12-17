import React from "react";
import "./SavedMovies.css";
import cardImage from "../../images/card-image.jpeg";
import cardImage2 from "../../images/card-image-2.jpeg";

export default function SavedMovies() {
  return (
    <>
      <section className="search-form">
        <form className="search-form__input-wrapper">
          <input
            className="search-form__input"
            type="text"
            placeholder="Фильм"
            id="search"
            name="search"
          />
          <button className="search-form__button"></button>
        </form>
        <div className="search-form__checkbox-wrapper">
          <label className="search-form__toggler-wrapper style-1">
            <input
              className="search-form__checkbox"
              type="checkbox"
              defaultChecked
            />
            <div className="search-form__toggler-slider">
              <div className="search-form__toggler-knob"></div>
            </div>
          </label>
          <p className="search-form__checkbox-subtitle">Короткометражки</p>
        </div>
      </section>
      <section className="saved-movies-card-list">
        <ul className="saved-movies-card-list__list">
          <li className="saved-movies-card-list__item">
            <div className="saved-movies-card-list__img-container">
              <img
                className="saved-movies-card-list__img"
                src={cardImage}
                alt="Изображение карточки фильма."
              />
            </div>
            <div className="saved-movies-card-list__description-container">
              <div className="saved-movies-card-list__text-wrapper">
                <h2 className="saved-movies-card-list__title-card">
                  33 слова о дизайне
                </h2>
                <p className="saved-movies-card-list__time-card">1ч 47м</p>
              </div>
              <button className="saved-movies-card-list__like-button"></button>
            </div>
          </li>
          <li className="saved-movies-card-list__item">
            <div className="saved-movies-card-list__img-container">
              <img
                className="saved-movies-card-list__img"
                src={cardImage2}
                alt="Изображение карточки фильма."
              />
            </div>
            <div className="saved-movies-card-list__description-container">
              <div className="saved-movies-card-list__text-wrapper">
                <h2 className="saved-movies-card-list__title-card">
                  Киноальманах «100 лет дизайна»
                </h2>
                <p className="saved-movies-card-list__time-card">1ч 47м</p>
              </div>
              <button className="saved-movies-card-list__like-button"></button>
            </div>
          </li>
        </ul>
        {/* <button className="saved-movies-card-list__button">Ещё</button> */}
      </section>
    </>
  );
}
