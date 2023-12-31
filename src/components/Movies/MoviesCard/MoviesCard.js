import React, { useState } from "react";

export default function MoviesCard(itemCard, key) {
  const [isLike, setIsLike] = useState(false);

  function handleLikeClick() {
    setIsLike(!isLike);
  }

  return (
    <li className="movies-card-list__item">
      <div className="movies-card-list__img-container">
        <img
          className="movies-card-list__img"
          src={"https://api.nomoreparties.co" + itemCard.itemCard.image.url}
          alt="Изображение карточки фильма."
        />
      </div>
      <div className="movies-card-list__description-container">
        <div className="movies-card-list__text-wrapper">
          <h2 className="movies-card-list__title-card">
            {itemCard.itemCard.nameRU}
          </h2>
          <p className="movies-card-list__time-card">
            {itemCard.itemCard.duration} минуты
          </p>
        </div>
        <button
          className={`movies-card-list__like-button ${isLike ? "like" : ""}`}
          onClick={handleLikeClick}
        ></button>
      </div>
    </li>
  );
}
