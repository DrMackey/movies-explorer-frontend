import React from "react";
import studentPhoto from "../../../images/student-photo.png";
import { Link } from "react-router-dom";
import "./AboutMe.css";

export default function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <div className="about-me__container">
        <h2 className="about-me__title">Студент</h2>
        <div className="about-me__content-wrapper">
          <img
            src={studentPhoto}
            alt="Фото студента."
            className="about-me__photo"
          />
          <div className="about-me__text-container">
            <h2 className="about-me__content-title">Владислав</h2>
            <h3 className="about-me__content-subtitle">
              Фронтенд-разработчик, 22 года
            </h3>
            <p className="about-me__content-paragraph">
              Я родился и живу в Ставрополе, получил квалификацию
              техник-программист в СРКВТиЭ. Живу один, холост. Люблю слушать
              музыку, а ещё увлекаюсь творчеством в различных направлениях. С
              окончания школы начал кодить. С 2019 года работал в компании
              «Ситилинк». После того, как прошёл курс по веб-разработке, начал
              заниматься фриланс-заказами и ушёл с постоянной работы.
            </p>
            <Link
              to="https://github.com/DrMackey"
              className="about-me__link"
              target="_blank"
            >
              Github
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
