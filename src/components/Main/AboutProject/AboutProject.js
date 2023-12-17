import React from "react";
import "./AboutProject.css";

export default function AboutProject() {
  return (
    <section className="about-project" id="about-project">
      <h2 className="about-project__title">О проекте</h2>
      <ul className="about-project__about-section">
        <li className="about-project__container">
          <h2 className="about-project__title-paragraph">
            Дипломный проект включал 5 этапов
          </h2>
          <p className="about-project__subtitle-paragraph">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </li>
        <li className="about-project__container">
          <h2 className="about-project__title-paragraph">
            На выполнение диплома ушло 5 недель
          </h2>
          <p className="about-project__subtitle-paragraph">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <div className="about-project__timeline-container">
        <div className="about-project__timeline-block about-project__timeline-block_green">
          <h3 className="about-project__timeline-title about-project__timeline-title_green">
            1 неделя
          </h3>
          <p className="about-project__timeline-subtitle">Back-end</p>
        </div>
        <div className="about-project__timeline-block">
          <h3 className="about-project__timeline-title">4 недели</h3>
          <p className="about-project__timeline-subtitle">Front-end</p>
        </div>
      </div>
    </section>
  );
}
