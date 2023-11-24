import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Main() {
  return (
    <>
      <header className="header header_main-page1">
        <Link to="/" className="header__logo" />
        <button className="header__button"></button>
      </header>
    </>
  );
}
