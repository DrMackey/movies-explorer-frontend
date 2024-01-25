import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import ProtectedRouteElement from "../ProtectedRoute.js";
import {
  currentUserContext,
  currentUserCon,
} from "../contexts/CurrentUserContext.js";
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
import AuthPopup from "../AuthPopup/AuthPopup.js";
import api from "../../utils/MainApi.js";
import "./App.css";

function App() {
  const newLang = "ru";
  document.documentElement.lang = newLang;

  const [loggedIn, setLoggedIn] = useState(false);
  const [isChangeScroll, setIsChangeScroll] = useState(false);
  const [cards, setCards] = useState([]);
  const [isLikedCards, setIsLikedCards] = useState([]);
  const [isFirstBootCards, setIsFirstBootCards] = useState(false);
  const [isLoadedCards, setIsLoadedCards] = useState(false);
  const [isChangeForms, setIsChangeForms] = useState(false);
  const [isLoadedLikedCards, setIsLoadedLikedCards] = useState(false);
  const [isChangePreloader, setIsChangePreloader] = useState(false);
  const [userData, setUserData] = useState({});
  const [currentUser, setCurrentUser] = useState(currentUserCon);
  const navigate = useNavigate();
  const [isStatus, setIsStatus] = useState({});
  const [isAuthPopupOpen, setIsAuthPopupOpen] = useState(false);
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    tokenCheck();
  }, []);

  function tokenCheck() {
    const jwt = localStorage.getItem("token");

    api
      .checkToken(jwt)
      .then((res) => {
        if (res._id === jwt) {
          setUserData(res);
          setLoggedIn(true);
          navigate("/", { replace: true });
          getLikedCards();
        }
      })
      .catch((err) => {
        console.log(err);
      });
    getDataUser();
  }

  function getDataUser() {
    api
      .getProfileData()
      .then((data) => {
        setCurrentUser(data);
        return data;
      })
      .then((res) => {
        setUserData(res);
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function onChangeScroll() {
    setIsChangeScroll(!isChangeScroll);
  }

  function checkLikedCards(cards) {
    if (isFirstBootCards) {
      setIsFirstBootCards(false);
      getLikedCards();
    }

    cards.map((card) => {
      isLikedCards.map((trueCard) => {
        if (trueCard.id === card.id) {
          card["_id"] = trueCard._id;
        }
      });
    });
    setCards(cards);
    setIsLoadedCards(true);
    setIsChangePreloader(false);
    setIsChangeForms(false);
  }

  function getLikedCards() {
    setIsChangePreloader(true);
    api
      .getInitialCards()
      .then((res) => {
        if (res.data.length !== 0) {
          setIsLikedCards(res.data);
          setIsChangePreloader(false);
          setIsLoadedLikedCards(true);
        } else {
          setIsLikedCards(res.data);
          setIsChangePreloader(false);
        }
      })
      .catch((err) => {
        setIsStatus({
          status: false,
          text: "Что-то пошло не так! Попробуйте ещё раз",
        });
        setIsAuthPopupOpen(true);
        console.log(err);
      });
  }

  function deleteLikedCards(card) {
    setIsChangePreloader(true);
    api
      .deleteLikedMovie(card._id)
      .then((res) => {
        deleteCard(res.data);
        setIsChangePreloader(false);
      })
      .catch((err) => {
        setIsStatus({
          status: false,
          text: "Что-то пошло не так! Попробуйте ещё раз",
        });
        setIsAuthPopupOpen(true);
        console.log(err);
      });
  }

  function getDataCards() {
    setIsChangePreloader(true);
    setIsChangeForms(true);
    moviesApi
      .getInitialCards()
      .then((cards) => {
        checkLikedCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleLoggedIn(boolean) {
    setLoggedIn(boolean);
  }

  function handleLogin() {
    const { password, email } = formValue;
    api
      .authorization(password, email)
      .then((res) => {
        handleLoggedIn(true);
        navigate("/movies", { replace: true });
        tokenCheck();
      })
      .catch((err) => {
        setIsStatus({
          status: false,
          text: "Вы ввели неправильный логин или пароль",
        });
        setIsAuthPopupOpen(true);
      });
    setFormValue({
      password: "",
      email: "",
    });
  }

  function handleRegister() {
    const { name, email, password } = formValue;

    api
      .register(name, email, password)
      .then((res) => {
        handleLogin();
        setIsStatus({ status: true, text: "Вы успешно зарегистрировались!" });
        setIsAuthPopupOpen(true);
      })
      .catch((err) => {
        setIsStatus({
          status: false,
          text: "Что-то пошло не так! Попробуйте ещё раз",
        });
        setIsAuthPopupOpen(true);
      });
  }

  function handleUpdateUser({ newName, newEmail }) {
    api
      .setUserInfo(newName, newEmail)
      .then((profileData) => {
        setCurrentUser(profileData);
        setIsStatus({ status: true, text: "Данные успешно изменены!" });
        setIsAuthPopupOpen(true);
      })
      .catch((err) => {
        setIsStatus({
          status: false,
          text: "Что-то пошло не так! Попробуйте ещё раз",
        });
        setIsAuthPopupOpen(true);
      });
  }

  function deleteCard(card) {
    isLikedCards.map((likedCard, index) => {
      if (likedCard._id === card._id) {
        isLikedCards.splice(index, 1);
      }
    });
  }

  function handleCardLike(card, setIsLiked, isLiked) {
    checkLikedCards(cards);
    if (!isLiked) {
      api
        .createMovie(card, currentUser._id)
        .then((newCard) => {
          card["_id"] = newCard._id;
          setIsLiked(!isLiked);
          isLikedCards.push(newCard);
        })
        .catch((err) => {
          setIsStatus({
            status: false,
            text: "Что-то пошло не так! Попробуйте ещё раз",
          });
          setIsAuthPopupOpen(true);
          console.log(err);
        });
    } else {
      api
        .deleteLikedMovie(card._id)
        .then((res) => {
          setIsLiked(!isLiked);
          deleteCard(card);
        })
        .catch((err) => {
          setIsStatus({
            status: false,
            text: "Что-то пошло не так! Попробуйте ещё раз",
          });
          setIsAuthPopupOpen(true);
          console.log(err);
        });
    }
  }

  function closeAllPopups() {
    setIsAuthPopupOpen(false);
  }

  function signOut() {
    handleLoggedIn(false);
    localStorage.removeItem("token");
    localStorage.removeItem("search");
    localStorage.removeItem("checkBox");
    api.deleteCookie().catch((err) => {
      console.log(err);
    });
    setUserData({ ...userData, name: "", email: "" });
  }

  return (
    <>
      <currentUserContext.Provider value={currentUser}>
        <div className={`page ${isChangeScroll ? "page_noscroll" : ""}`}>
          <Header onChangeScroll={onChangeScroll} isLogin={loggedIn} />
          <Routes>
            <Route
              path="*"
              element={
                loggedIn ? (
                  <Navigate to="/" replace />
                ) : (
                  <Navigate to="/sign-in" replace />
                )
              }
            />
            <Route path="/" element={<Main />} />
            <Route
              path="/movies"
              element={
                <ProtectedRouteElement
                  element={Movies}
                  loggedIn={loggedIn}
                  cards={cards}
                  onChangePreloader={isChangePreloader}
                  onSetIsChangePreloader={setIsChangePreloader}
                  getDataCards={getDataCards}
                  isLoadedCards={isLoadedCards}
                  onCardLike={handleCardLike}
                  onIsLikedCards={isLikedCards}
                  isChangeForms={isChangeForms}
                />
              }
            />
            <Route
              path="/saved-movies"
              element={
                <ProtectedRouteElement
                  element={SavedMovies}
                  loggedIn={loggedIn}
                  cards={isLikedCards}
                  onChangePreloader={isChangePreloader}
                  onSetIsChangePreloader={setIsChangePreloader}
                  isLoadedCards={isLoadedLikedCards}
                  setIsLoadedLikedCards={setIsLoadedLikedCards}
                  getLikedCards={getLikedCards}
                  onDeleteLikedCards={deleteLikedCards}
                  setIsFirstBootCards={setIsFirstBootCards}
                  isFirstBootCards={isFirstBootCards}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRouteElement
                  element={Profile}
                  loggedIn={loggedIn}
                  onUpdateUser={handleUpdateUser}
                  onSignOut={signOut}
                />
              }
            />
            <Route
              path="/signin"
              element={
                <Login
                  onLogin={handleLogin}
                  onSetFormValue={setFormValue}
                  onFormValue={formValue}
                />
              }
            />
            <Route
              path="/signup"
              element={
                <Register
                  onRegister={handleRegister}
                  onSetFormValue={setFormValue}
                  onFormValue={formValue}
                />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
        <AuthPopup
          isOpen={isAuthPopupOpen}
          onClose={closeAllPopups}
          onIsStatus={isStatus}
        />
      </currentUserContext.Provider>
    </>
  );
}

export default App;
