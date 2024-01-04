import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Header from "../Header/Header.js";
import Main from "../Main/Main.js";
import Movies from "../Movies/Movies.js";
import SavedMovies from "../SavedMovies/SavedMovies.js";
import Profile from "../Profile/Profile.js";
import Login from "../Login/Login.js";
import Register from "../Register/Register.js";
import Footer from "../Footer/Footer.js";
import NotFound from "../NotFound/NotFound.js";
import moviesApi from "../../utils/MoviesApi.js";
import "./App.css";

function App() {
  const newLang = "ru";
  document.documentElement.lang = newLang;

  const [isChangeScroll, setIsChangeScroll] = useState(false);
  const [cards, setCards] = useState([]);
  const [isChangePreloader, setIsChangePreloader] = useState(true);

  useEffect(() => {
    getDataCards();
  }, []);

  function onChangeScroll() {
    setIsChangeScroll(!isChangeScroll);
  }

  function getDataCards() {
    setIsChangePreloader(true);
    moviesApi
      .getInitialCards()
      .then((cards) => {
        setCards(cards);
        setIsChangePreloader(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <div className={`page ${isChangeScroll ? "page_noscroll" : ""}`}>
        <Header onChangeScroll={onChangeScroll} />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/movies"
            element={
              <Movies cards={cards} onChangePreloader={isChangePreloader} setCards={setCards} getDataCards={getDataCards}/>
            }
          />
          <Route path="/saved-movies" element={<SavedMovies />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
