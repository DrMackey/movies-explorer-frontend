import React from "react";
import studentPhoto from "../../../images/student-photo.png";
import { Link } from "react-router-dom";
import "./AboutMe.css";

export default function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__content-wrapper">
        <img
          src={studentPhoto}
          alt="Фото студента."
          className="about-me__photo"
        />
        <h2 className="about-me__content-title">Виталий</h2>
        <h3 className="about-me__content-subtitle">
          Фронтенд-разработчик, 30 лет
        </h3>
        <p className="about-me__content-paragraph">
          Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня
          есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом.
          Недавно начал кодить. С 2015 года работал в компании «СКБ Контур».
          После того, как прошёл курс по веб-разработке, начал заниматься
          фриланс-заказами и ушёл с постоянной работы.
        </p>
        <Link
          to="https://github.com/DrMackey"
          className="about-me__link"
          target="_blank"
        >
          Github
        </Link>
      </div>
    </section>
  );
}
