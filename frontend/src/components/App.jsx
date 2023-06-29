import React from "react";
import { useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from './ProtectedRoute'
import PageNotFound from "./PageNotFound";
import * as Auth from './Auth';
import { useNavigate } from "react-router-dom";
import InfoTooltip from './InfoTooltip'
import logoSuccess from '../images/success.png'
import logoError from '../images/nosuccess.png'


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmAvatarPopupOpen, setIsConfirmAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = React.useState([]);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = React.useState(false);
  const [isStatusLoginOk, setIsStatusLoginOk] = useState(false);
  const [isStatusLoginError, setIsStatusLoginError] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
 
  const navigate = useNavigate();

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((card) => {
        setCards(card);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleConfirmPopupOpen(card) {
    setSelectedCard(card);
    setIsConfirmDeletePopupOpen(true);
  }

  function handleCheckStatusLoginOk() {
    setIsStatusLoginOk(true);
  }

  function handleCheckStatusLoginError() {
    setIsStatusLoginError(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setIsStatusLoginOk(false);
    setIsStatusLoginError(false);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    console.log(isLiked);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      console.log(newCard);
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleUpdateUser(value) {
    console.log(value);
    api.setUserInfo(value).then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleCardDelete() {
    console.log("test");
    api.deleteCard(selectedCard._id).then(() => {
      setCards((state) => state.filter((c) => c._id !== selectedCard._id));
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleUpdateAvatar(card) {
    console.log(card);
    api.setAvatar(card).then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleAddPlaceSubmit(card) {
    api.addCard(card).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const [emailUser, setEmailUser] = useState('');
  
  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt')
    if (jwt) {
      Auth.getContent(jwt)
      .then(
        (user) => {
          handleLogin(user);
          navigate('/', {replace: true})
          setEmailUser(user.data.email);
        }
      )
      .catch(err => console.log(err))
    }
  }

  const handleLogin = (email) => {
    setLoggedIn(true);
    setEmailUser(email);
  }

  useEffect(() => {
    tokenCheck();
  }, [])

function singOut() {
  localStorage.removeItem('jwt');
  setLoggedIn(false);
}

function handleCheckRegister(password, email) {
  Auth.register({password, email})
        .then((res) => {
            // handleCheckStatusLoginOk();
            setIsStatusLoginOk(true);
            navigate('/sign-in', { replace: true })
        })
        .catch((err) => {
            handleCheckStatusLoginError(err);
            console.log(`ошибка ${err}`);
            } 
        )
}


function handleCheckLogin(password, email) {
  Auth.authorize({password, email})
        .then((res) => {
            if (res.token) {
                localStorage.setItem('jwt', res.token);
                handleLogin(email);
                navigate('/', { replace: true });
            }
        })
        .catch((err) => {
                    handleCheckStatusLoginError();
                    console.log(`ошибка ${err}`)
                }
            )
        }

return (
    <div>
    <CurrentUserContext.Provider value={currentUser}>
      <Header loggedIn={loggedIn} emailUser={emailUser} singOut={singOut}/>
      
      <Routes>
        <Route path="/sign-up" element={<Register handleCheckRegister={handleCheckRegister}/>} />
        <Route path="/sign-in" element={<Login handleCheckLogin={handleCheckLogin}/>} />
        <Route  path="/" element={<ProtectedRoute element={Main} loggedIn={loggedIn} 
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        onCardLike={handleCardLike}
        onConfirmDelete={handleConfirmPopupOpen}
        cards={cards}/>} />
        <Route path="/" element={loggedIn ? <Navigate to ="/" /> : <Navigate to="/sign-in" replace/>}/>
        <Route path="*" element={<PageNotFound />}/>
      </Routes>
        
        {loggedIn && <Footer />}

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onUpdateCards={handleAddPlaceSubmit}
        />
        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />
        <ConfirmDeletePopup
          isOpen={isConfirmDeletePopupOpen}
          onClose={closeAllPopups}
          onSubmitConfirmDelete={handleCardDelete}
        />
        <InfoTooltip name={'message'} logo={logoError} textMessage={"Что-то пошло не так! Попробуйте еще раз."} isOpen={isStatusLoginError} onClose={closeAllPopups} />
        <InfoTooltip name={'message'}  logo={logoSuccess} textMessage={"Вы успешно зарегистрировались!"} isOpen={isStatusLoginOk} onClose={closeAllPopups} />

      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
