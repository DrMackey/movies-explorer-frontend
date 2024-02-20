import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./MoviesCard.css";

export default function MoviesCard({ itemCard, onCardLike, onIsLikedCards }) {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    onChangeCards();
  }, []);

  function onChangeCards() {
    onIsLikedCards.map((card) => {
      if (card.id === itemCard.id) {
        setIsLiked(true);
      }
    });
  }
  function handleLikeClick() {
    onCardLike(itemCard, setIsLiked, isLiked);
  }

  function getTimeFromMins(mins) {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;
    return hours + "ч " + minutes + "м";
  }

  return (
    <li className="movies-card-list__item">
      <div className="movies-card-list__img-container">
        <Link to={itemCard.trailerLink} target="_blank">
          <img
            className="movies-card-list__img"
            src={"https://api.nomoreparties.co" + itemCard.image.url}
            alt="Изображение карточки фильма."
          />
        </Link>
      </div>
      <div className="movies-card-list__description-container">
        <div className="movies-card-list__text-wrapper">
          <Link
            to={itemCard.trailerLink}
            className="movies-card-list__link"
            target="_blank"
          >
            <h2 className="movies-card-list__title-card">{itemCard.nameRU}</h2>
          </Link>
          <p className="movies-card-list__time-card">
            {getTimeFromMins(itemCard.duration)}
          </p>
        </div>
        <button
          className={`movies-card-list__like-button ${isLiked ? "like" : ""}`}
          onClick={handleLikeClick}
        ></button>
      </div>
    </li>
  );
}
