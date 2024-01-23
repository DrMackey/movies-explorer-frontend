import React, { useState, useEffect } from "react";
import "./SavedMovies.css";
import MoviesCard from "./MoviesCard/MoviesCard.js";
import Preloader from "../Preloader/Preloader.js";

export default function SavedMovies({
  cards,
  setCards,
  onChangePreloader,
  onSetIsChangePreloader,
  isLoadedCards,
  setIsLoadedLikedCards,
  getLikedCards,
  onDeleteLikedCards,
}) {
  const [isValue, setIsValue] = useState("");
  const [isShortFilm, setIsShortFilm] = useState(false);
  const [errors, setErrors] = useState("Список избранного пуст");

  useEffect(() => {
    getLikedCards();
  }, []);

  useEffect(() => {
    formValidate(isValue);
  }, [isShortFilm]);

  function isShortFilmValidate(result) {
    if (isShortFilm) {
      return (result = result.filter((card) => {
        if (card.duration < 40) {
          return result;
        }
      }));
    }
    setErrors("Ничего не найдено");
    setIsLoadedLikedCards(false);
    return false;
  }

  function formValidate(value) {
    if (value.length === 0) {
      if (isShortFilm) {
        const resultShortValidate = isShortFilmValidate(cards);
        if (resultShortValidate.length === 0) {
          setErrors("Ничего не найдено");
          setIsLoadedLikedCards(false);
        } else {
          setCards(resultShortValidate);
          return;
        }
        return;
      }
      getLikedCards();
      return false;
    } else {
      if (isShortFilm) {
        setCards(isShortFilmValidate(cards));
        return;
      }
      var result = cards.filter((card) => {
        if (card.nameRU.toLowerCase().indexOf(value.toLowerCase()) > -1) {
          return true;
        } else if (
          card.nameEN.toLowerCase().indexOf(value.toLowerCase()) > -1
        ) {
          return true;
        }
      });
      console.log("проверка", result.length);
      if (result.length === 0) {
        setErrors("Ничего не найдено");
        onSetIsChangePreloader(false);
        setIsLoadedLikedCards(false);
        return false;
      } else {
        setCards(result);
        setIsLoadedLikedCards(true);
        onSetIsChangePreloader(false);
        return true;
      }
    }
  }

  function formSubmit(e) {
    e.preventDefault();
    formValidate(isValue);
    setIsLoadedLikedCards(true);
    if (!formValidate(isValue)) {
      setIsLoadedLikedCards(false);
      return false;
    } else {
      setIsLoadedLikedCards(true);
    }
  }

  const handleChange = (event) => {
    setIsValue(event.target.value);
  };

  const onToggleShortFilm = () => {
    setIsShortFilm(!isShortFilm);
  };

  return (
    <main>
      <section className="search-form">
        <form className="search-form__input-wrapper" onSubmit={formSubmit}>
          <input
            className="search-form__input"
            type="text"
            placeholder="Фильм"
            id="search"
            name="search"
            value={isValue}
            onChange={handleChange}
          />
          <button className="search-form__button"></button>
        </form>
        <div className="search-form__checkbox-wrapper">
          <label className="search-form__toggler-wrapper style-1">
            <input
              className="search-form__checkbox"
              type="checkbox"
              checked={isShortFilm}
              onChange={onToggleShortFilm}
            />
            <div className="search-form__toggler-slider">
              <div className="search-form__toggler-knob"></div>
            </div>
          </label>
          <p className="search-form__checkbox-subtitle">Короткометражки</p>
        </div>
      </section>
      <section className="saved-movies-card-list">
        {onChangePreloader ? (
          <Preloader />
        ) : !isLoadedCards ? (
          <p className="saved-movies-cards-list__subtitle">{errors}</p>
        ) : (
          <>
            <ul className="saved-movies-card-list__list">
              {cards.map((card) => (
                <MoviesCard
                  itemCard={card}
                  key={card.id}
                  onDeleteLikedCards={onDeleteLikedCards}
                />
              ))}
            </ul>
          </>
        )}
      </section>
    </main>
  );
}
