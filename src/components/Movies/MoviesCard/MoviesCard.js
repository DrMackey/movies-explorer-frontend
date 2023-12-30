import React from "react";

export default function MoviesCard({ nameRu, image, duration }, key) {
  return (
    <li className="movies-card-list__item">
      <div className="movies-card-list__img-container">
        <img
          className="movies-card-list__img"
          src={image}
          alt="Изображение карточки фильма."
        />
      </div>
      <div className="movies-card-list__description-container">
        <div className="movies-card-list__text-wrapper">
          <h2 className="movies-card-list__title-card">{nameRu}</h2>
          <p className="movies-card-list__time-card">{duration}</p>
        </div>
        <button className="movies-card-list__like-button like"></button>
      </div>
    </li>
  );
}
