import React, { useState, useEffect } from "react";
import "./Movies.css";
import MoviesCard from "./MoviesCard/MoviesCard.js";
import Preloader from "../Preloader/Preloader.js";

export default function Movies({
  cards,
  onChangePreloader,
  onSetIsChangePreloader,
  getDataCards,
  isLoadedCards,
  getLikedCards,
  onCardLike,
  onLikedCards,
  onSetIsLikedCards,
  onIsLikedCards,
}) {
  const [cardBuffer, setCardBuffer] = useState([]);
  const [width, setWidth] = useState(window.innerWidth);
  const [isValue, setIsValue] = useState("");
  const [onChangeButton, setOnChangeButton] = useState(true);
  const [toggleCardState, setToggleCardState] = useState(false);
  const [isShortFilm, setIsShortFilm] = useState(false);
  const [isChangeButton, setIsChangeButton] = useState(0);
  var search = localStorage.getItem("search");
  const checkBox = localStorage.getItem("checkBox") === "true" ? true : false;
  const [errors, setErrors] = useState(
    "Для отображения фильмов введите запрос"
  );
  const resize = () => {
    if (width < 459) {
      return 5;
    } else if (width > 460 && width < 1000) {
      return 8;
    } else if (width > 1001) {
      return 12;
    }
  };
  var lastResize = 0;

  useEffect(() => {
    if (search === null) {
      search = "";
    }
    setIsShortFilm(checkBox);
    checkSearchValue();
    checkCards();

    formValidate(search);

    function handleResize(event) {
      setWidth(event.target.innerWidth);
    }

    window.addEventListener("resize", function (e) {
      if (Date.now() - lastResize > 500) {
        handleResize(e);
        lastResize = Date.now();
        return;
      }
    });

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    formValidate(search);
  }, [isLoadedCards]);

  useEffect(() => {
    formValidate(isValue);
  }, [isShortFilm]);

  useEffect(() => {
    formValidate(isValue);
  }, [width]);

  function checkSearchValue() {
    if (search) {
      if (search.length !== 0) {
        setIsValue(search);
        onSetIsChangePreloader(true);
        return true;
      }
    } else localStorage.setItem("search", "");
  }

  function checkCards() {
    if (cards.length === 0) {
      getDataCards();
    }
    return true;
  }

  function toggleCardList() {
    if (width <= 480) {
      setIsChangeButton(isChangeButton + 2);
      formValidate(isValue);
    }
    if (width >= 481) {
      setIsChangeButton(isChangeButton + 3);
      formValidate(isValue);
    }
  }

  function formValidate(value) {
    if (value.length === 0) {
      setErrors("Для поиска необходимо ввести значение");
      return false;
    } else {
      var result = cards.filter((card) => {
        if (card.nameRU.toLowerCase().indexOf(value.toLowerCase()) > -1) {
          return true;
        } else if (
          card.nameEN.toLowerCase().indexOf(value.toLowerCase()) > -1
        ) {
          return true;
        }
      });

      if (isShortFilm) {
        result = result.filter((card) => {
          if (card.duration < 40) {
            return true;
          }
        });
      }

      if (result.length === 0) {
        setErrors("Ничего не найдено");
        onSetIsChangePreloader(false);
        return false;
      } else {
        buttonChange(result);
        setToggleCardState(true);
        onSetIsChangePreloader(false);
        return true;
      }
    }
  }

  function buttonChange(result) {
    if (result.length < resize()) {
      setCardBuffer(result);
      setOnChangeButton(false);
    } else {
      if (result.length - resize() - isChangeButton < 2) {
        setCardBuffer(result.reverse());
        setOnChangeButton(false);
        return;
      } else {
        setCardBuffer(
          result.slice(result.length - resize() - isChangeButton).reverse()
        );
        setOnChangeButton(true);
      }
    }
  }

  function formSubmit(e) {
    e.preventDefault();
    setIsChangeButton(0);
    localStorage.setItem("search", isValue);
    setToggleCardState(true);
    if (!formValidate(isValue)) {
      setToggleCardState(false);
      return false;
    } else {
      setToggleCardState(true);
    }
  }

  const handleChange = (event) => {
    setIsValue(event.target.value);
  };

  const onToggleShortFilm = () => {
    setIsShortFilm((isShortFilm) => {
      localStorage.setItem("checkBox", !isShortFilm);
      return !isShortFilm;
    });
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
      <section className="movies-card-list">
        {onChangePreloader ? (
          <Preloader />
        ) : !toggleCardState ? (
          <p className="movies-cards-list__subtitle">{errors}</p>
        ) : (
          <>
            <ul className="movies-card-list__list">
              {cardBuffer.map((card) => (
                <MoviesCard
                  itemCard={card}
                  key={card.id}
                  onCardLike={onCardLike}
                  getLikedCards={getLikedCards}
                  onLikedCards={onLikedCards}
                  onSetIsLikedCards={onSetIsLikedCards}
                  onIsLikedCards={onIsLikedCards}
                />
              ))}
            </ul>
            {onChangeButton ? (
              <button
                className="movies-card-list__button"
                onClick={toggleCardList}
              >
                Ещё
              </button>
            ) : (
              ""
            )}
          </>
        )}
      </section>
    </main>
  );
}
