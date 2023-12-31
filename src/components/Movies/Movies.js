import React, { useState, useEffect } from "react";
import "./Movies.css";
import cardImage from "../../images/card-image.jpeg";
import cardImage2 from "../../images/card-image-2.jpeg";
import moviesApi from "../../utils/MoviesApi.js";
import MoviesCard from "./MoviesCard/MoviesCard.js";

export default function Movies(cards) {
  const [cardList, setCardList] = useState(94);
  const cardsList = cards.cards.slice(cardList);
  cardsList.reverse();

  function toggleCardList() {
    setCardList(cardList - 6);
  }

  return (
    <main>
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
      <section className="movies-card-list">
        <ul className="movies-card-list__list">
          {cardsList.map((card) => (
              <MoviesCard itemCard={card} key={card.id} />
            ))}
        </ul>
        <button className="movies-card-list__button" onClick={toggleCardList}>Ещё</button>
      </section>
    </main>
  );
}
