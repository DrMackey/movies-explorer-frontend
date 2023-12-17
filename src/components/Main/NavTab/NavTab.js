import React from "react";
import { Link } from "react-router-dom";
import "./NavTab.css";

export default function NavTab() {
  return (
    <nav className="navtab">
      <Link to="#about-project" className="navtab__link">
        О проекте
      </Link>
      <Link to="#techs" className="navtab__link">
        Технологии
      </Link>
      <Link to="#about-me" className="navtab__link">
        Студент
      </Link>
    </nav>
  );
}
