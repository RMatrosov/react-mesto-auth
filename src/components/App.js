
import Main from "./Main";
import Footer from "./Footer";
import {useEffect, useState} from "react";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import PopupWithSubmit from "./PopupWithSubmit";
import ProtectedRoute from "./ProtectedRoute";
import {Route, Switch, Redirect, useHistory} from 'react-router-dom';
import Login from "./Login";
import Register from "./Register";
import * as auth from "../utils/auth";
import SuccessPopup from "./SuccessPopup";
import FailPopup from "./FailPopup";



function App() {

  const [selectedCard, setSelectedCard] = useState(null)
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isPopupWithSubmitOpen, setPopupWithSubmitOpen] = useState(false);
  const [cards, setCards] = useState([])
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCards, setIsLoadingCards] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentEmail, setCurrentEmail] = useState(null);
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  const [failPopupOpen, setFailPopupOpen] = useState(false);

  const history = useHistory()


  useEffect(() => {
    setIsLoadingCards(true)
    api.getInitialCards().then(data => {
      setCards(data)
    }).catch((error) => {
      console.log(error)
    }).finally(() => {
      setIsLoadingCards(false)
    })
  }, [])

  useEffect(() => {
    setIsLoading(true)
    api.getUserInfoFromServer().then(data => {
      setCurrentUser(data)
    }).catch((error) => {
      console.log(error)
    }).finally(() => {
      setIsLoading(false)
    })
  }, [])

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    }).catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
      handleTokenCheck()
  }, [handleTokenCheck]);


  function handleTokenCheck() {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      auth.checkToken(jwt).then((res) => {
        if (res) {
          setCurrentEmail(res.data.email)
          setLoggedIn(true)
          history.push("/");
        }
      });
    }
  }

  function handleCardDelete(card) {
    setPopupWithSubmitOpen(true);
    setCardToDelete(card)
  }

  function handleCardDeleteSubmit(card) {
    setLoadingBtn(true)
    api.deleteCardFromServer(card._id).then((data) => {
      if (data.message === "Пост удалён") {
        setCards((state) => state.filter(item => item !== card));
        setPopupWithSubmitOpen(false);
        setLoadingBtn(false)
      }
    }).catch((err) => {
      console.log(err);
      setLoadingBtn(false)
    })
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setPopupWithSubmitOpen(false)
    setSelectedCard(null)
    setSuccessPopupOpen(false)
    setFailPopupOpen(false)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function handleUpdateUser({name, about}) {
    setLoadingBtn(true)
    api.setUserInfoFromServer({name, about}).then(data => {
      setCurrentUser(data);
      closeAllPopups();
      setLoadingBtn(false)
    }).catch((err) => {
      console.log(err);
      setLoadingBtn(false)
    })
  }

  function handleUpdateAvatar(link) {
    setLoadingBtn(true)
    api.changeAvatar(link).then(data => {
      setCurrentUser(data);
      closeAllPopups();
      setLoadingBtn(false)
    }).catch((err) => {
      console.log(err);
      setLoadingBtn(false)
    })
  }

  function handleAddPlaceSubmit(title, link) {
    setLoadingBtn(true)
    api.addCardToServer(title, link).then(data => {
      setCards([data, ...cards]);
      closeAllPopups();
      setLoadingBtn(false)
    }).catch((err) => {
      console.log(err);
      setLoadingBtn(false)
    })
  }

  return (
      <CurrentUserContext.Provider value={currentUser}>
        <div className="App">
          <div className="page">
            <div className="page__wrapper">
              <SuccessPopup onClose={closeAllPopups}
                            isOpen={successPopupOpen}
              />
              <FailPopup onClose={closeAllPopups}
                            isOpen={failPopupOpen}
              />
              <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
              <EditProfilePopup isOpen={isEditProfilePopupOpen}
                                onUpdateUser={handleUpdateUser}
                                onClose={closeAllPopups}
                                loadingBtn={loadingBtn}/>
              <EditAvatarPopup isOpen={isEditAvatarPopupOpen}
                               onUpdateAvatar={handleUpdateAvatar}
                               onClose={closeAllPopups}
                               loadingBtn={loadingBtn}/>

              <AddPlacePopup onClose={closeAllPopups}
                             isOpen={isAddPlacePopupOpen}
                             onAddPlace={handleAddPlaceSubmit}
                             loadingBtn={loadingBtn}/>
              <PopupWithSubmit onClose={closeAllPopups}
                               isOpen={isPopupWithSubmitOpen}
                               onSubmit={handleCardDeleteSubmit}
                               cardToDelete={cardToDelete}
                               loadingBtn={loadingBtn}/>

              <Switch>
                <ProtectedRoute exact path="/" loggedIn={loggedIn}
                                onEditProfile={handleEditProfileClick}
                                onAddPlace={handleAddPlaceClick}
                                onEditAvatar={handleEditAvatarClick}
                                onCardClick={handleCardClick}
                                cards={cards}
                                onCardLike={handleCardLike}
                                onCardDelete={handleCardDelete}
                                isLoading={isLoading}
                                isLoadingCards={isLoadingCards}
                                currentEmail={currentEmail}
                                component={Main}/>

                <Route path="/sing-in">
                  <Login setLoggedIn={setLoggedIn}
                         setFailPopupOpen={setFailPopupOpen}/>
                </Route>
                <Route path="/sing-up">
                  <Register setSuccessPopupOpen={setSuccessPopupOpen}
                            setFailPopupOpen={setFailPopupOpen}
                            />
                </Route>
                <Route exact path="/">
                  {loggedIn ? <Redirect to="/"/> : <Redirect to="/sign-in"/>}
                </Route>
              </Switch>
              <Footer/>
            </div>
          </div>
        </div>
      </CurrentUserContext.Provider>
  );
}

export default App;
