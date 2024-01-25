import React from "react";
import { Link } from "react-router-dom";
import "./NavTab.css";

export default function NavTab() {
  const onClick = () => {
    window.location.href = "#about-project";
  };

  const onClick2 = () => {
    window.location.href = "#techs";
  };

  const onClick3 = () => {
    window.location.href = "#about-me";
  };

  return (
    <nav className="navtab">
      <Link onClick={onClick} className="navtab__link">
        О проекте
      </Link>
      <Link onClick={onClick2} className="navtab__link">
        Технологии
      </Link>
      <Link onClick={onClick3} className="navtab__link">
        Студент
      </Link>
    </nav>
  );
}
