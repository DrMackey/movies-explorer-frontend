import React from "react";
import { Link } from "react-router-dom";
import "./MoviesCard.css";

export default function MoviesCard({ itemCard, onDeleteLikedCards }) {
  function handleLikeClick() {
    onDeleteLikedCards(itemCard);
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
          className="saved-movies-card-list__like-button"
          onClick={handleLikeClick}
        ></button>
      </div>
    </li>
  );
}
