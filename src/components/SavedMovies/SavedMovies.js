import React, { useState, useEffect } from "react";
import "./SavedMovies.css";
import MoviesCard from "./MoviesCard/MoviesCard.js";
import Preloader from "../Preloader/Preloader.js";

export default function SavedMovies({
  cards,
  onChangePreloader,
  onSetIsChangePreloader,
  isLoadedCards,
  setIsLoadedLikedCards,
  getLikedCards,
  onDeleteLikedCards,
  setIsFirstBootCards,
  isFirstBootCards,
}) {
  const [isValue, setIsValue] = useState("");
  const [isShortFilm, setIsShortFilm] = useState(false);
  const [errors, setErrors] = useState("Список избранного пуст");
  const [isBufferCards, setIsBufferCards] = useState(cards);

  useEffect(() => {
    if (isFirstBootCards) {
      setIsFirstBootCards(false);
      getLikedCards();
    }
    if (cards.length === 0) {
      setErrors("Список избранного пуст");
      setIsLoadedLikedCards(false);
    } else {
      onSetIsChangePreloader(false);
      setIsLoadedLikedCards(true);
    }
  }, []);

  useEffect(() => {
    setIsBufferCards(cards);
    formValidate(isValue);
  }, [isShortFilm, onChangePreloader]);

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
          setIsLoadedLikedCards(true);
          setIsBufferCards(resultShortValidate);
          return;
        }
        return;
      }

      if (isBufferCards.length === 0) {
        setErrors("Ничего не найдено");
        setIsLoadedLikedCards(false);
        return;
      }

      setIsBufferCards(cards);
      setIsLoadedLikedCards(true);
      return true;
    } else {
      let result = cards.filter((card) => {
        if (card.nameRU.toLowerCase().indexOf(value.toLowerCase()) > -1) {
          return true;
        } else if (
          card.nameEN.toLowerCase().indexOf(value.toLowerCase()) > -1
        ) {
          return true;
        }
      });

      if (isShortFilm) {
        setIsBufferCards(isShortFilmValidate(result));
        return;
      }
      if (result.length === 0) {
        setErrors("Ничего не найдено");
        onSetIsChangePreloader(false);
        setIsLoadedLikedCards(false);
        return false;
      } else {
        setIsBufferCards(result);
        setIsLoadedLikedCards(true);
        onSetIsChangePreloader(false);
        return true;
      }
    }
  }

  function formSubmit(e) {
    e.preventDefault();
    formValidate(isValue);
  }

  const handleChange = (event) => {
    setIsValue(event.target.value);
  };

  const onToggleShortFilm = () => {
    setIsShortFilm(!isShortFilm);
  };

  return (
    <main>
      <div className="saved-movies__container">
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
                {isBufferCards.map((card) => (
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
      </div>
    </main>
  );
}
