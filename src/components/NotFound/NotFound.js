import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <section className="not-found">
      <div className="not-found__title-wrapper">
        <h1 className="not-found__title">404</h1>
        <h2 className="not-found__subtitle">Страница не найдена</h2>
      </div>
      <button className="not-found__back-button" onClick={() => navigate(-1)}>
        Назад
      </button>
    </section>
  );
}
