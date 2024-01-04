import React, { useState, useEffect } from "react";
import "./Movies.css";
import MoviesCard from "./MoviesCard/MoviesCard.js";
import Preloader from "../Preloader/Preloader.js";

export default function Movies({ cards, onChangePreloader, setCards, getDataCards }) {
  const [cardList, setCardList] = useState(Number);
  const [cardsNewList, setCardsNewList] = useState([]);
  const [width, setWidth] = useState(window.innerWidth);
  const [value, setValue] = useState('');
  const [onChangeButton, setOnChangeButton] = useState(true);
  const resize = {
    "1280": 12,
    "768": 8,
    "320": 5
  }
  var lastResize = 0;
  // const test = setCardsList(cards,cardList);
    
  function setCardsList(cards, cardList) {
    const cardsList = cards.slice(cardList);
    cardsList.reverse();
    setCards(cardsList);
  }

  // const cardsList = setCardsList(cards, cardList);
  // useEffect(() => {
  //   setCardsNewList(cards);
  //   setCardList(cards.length - resize[width]);
  //   cardsList = cardsNewList.slice(cardList);
  //   cardsList.reverse();

  //   console.log("cardsNewList", cardsNewList);
  //   console.log("cards", cards);
  //   console.log("cardsList", cardsList);
  //   console.log("cardList", cardList);
  // }, [cards]);

  useEffect(() => {
    setCardList(cards.length - resize[width]);
    function handleResize(event) {
      setWidth(event.target.innerWidth);
    };

    setCardsList(cards, cardList);

    window.addEventListener('resize', function(e) {
      if(Date.now() - lastResize > 500) {
        handleResize(e);
        lastResize = Date.now();
        return;
    } 
      });

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (width <= 480) {
      setCardList(cards.length - resize[320]);
    }
    if (width >= 481 && width <= 900) {
      setCardList(cards.length - resize[768]);
    }
    if (width >= 901) {
      setCardList(cards.length - resize[1280]);
    }
  }, [width]);

  function toggleCardList() {
    if (width <= 480) {
      setCardList(cardList - 2);
    }
    if (width >= 481) {
      setCardList(cardList - 3);
    }
  }

  function buttonChange() {
    if (cardList > 0 && cardList < cards.length) {
      return (<button className="movies-card-list__button" onClick={toggleCardList}>
        Ещё
      </button>)
    }
  }

  const handleChange = (event) => {
    setValue(event.target.value);
  }

  function formSubmit(e) {
    e.preventDefault();

    if (value.length === 0) {
      getDataCards();
    }
    setCards(cards.filter(card => {
      
      if (card.nameRU.toLowerCase().indexOf(value.toLowerCase()) > -1) {
        return true
      } else if (card.nameEN.toLowerCase().indexOf(value.toLowerCase()) > -1) {
        return true
      }
    }));
  }

  return (
    <main>
      <section className="search-form">
        <form className="search-form__input-wrapper" 
        onSubmit={formSubmit}
        >
          <input
            className="search-form__input"
            type="text"
            placeholder="Фильм"
            id="search"
            name="search"
            value={value}
            onChange={handleChange}
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
          {onChangePreloader ? (
            <Preloader />
          ) : (
            <>
              <ul className="movies-card-list__list">
                {cards.map((card) => (
                  <MoviesCard itemCard={card} key={card.id}/>
                ))}
              </ul>
              {onChangeButton ? (<button className="movies-card-list__button" onClick={toggleCardList}>
        Ещё
      </button>) : ""}
            </>
          )}
      </section>
    </main>
  );
}
