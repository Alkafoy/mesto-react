import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import PopupWithForm from "./PopupWithForm/PopupWithForm.jsx";
import ImagePopup from "./ImagePopup/ImagePopup.jsx";
import {useEffect, useState} from "react";
import api from "../utils/api.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup";

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [isImagePopup, setImagePopup] = useState(false);
    const [isSending, setIsSending] = useState(false);

    const [currentUser, setCurrentUser] = useState({});

    const [deleteCardId, setDeleteCardId] = useState('');
    const [cards, setCards] = useState([]);

    useEffect(() => {
        api.getUserInfo()
            .then((userInfo) => {
                setCurrentUser(userInfo);
            })
            .catch((error) => {
                console.error("Ошибка при получении информации о пользователе: ", error);
            });

    }, []);

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsConfirmPopupOpen(false);
        setImagePopup(false);
    }

// закрытие по Escape
    const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isConfirmPopupOpen || selectedCard;
    useEffect(() => {
        function handleEscClose(e) {
            if (e.key === 'Escape') {
                closeAllPopups();
            }
        }

        if (isOpen) {
            document.addEventListener('keydown', handleEscClose);
            return () => {
                document.removeEventListener('keydown', handleEscClose);
            }
        }
    }, [isOpen]);

    // закрытие по оверлею
    const handleOverlayClick = (e) => {
        e.stopPropagation();
        if (e.target === e.currentTarget) {
            closeAllPopups();
        }
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true)
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true)
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true)
    }

    function handleDeleteClick(cardId) {
        setDeleteCardId(cardId);
        setIsConfirmPopupOpen(true);
    }

    function handleCardClick(card) {
        setSelectedCard(card)
        setImagePopup(true)
    }

    useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([userData, cardsData]) => {
                setCurrentUser(userData);
                cardsData.forEach(element => element.myId = userData._id);
                setCards(cardsData)
            })
            .catch(err => console.error(`Ошибка при запросе карточек ${err}`))
    }, [])

    function handleCardDelete(event) {
        event.preventDefault();
        api.deleteCard(deleteCardId)
            .then(r => {
                setCards(cards.filter(card => {
                    return card._id !== deleteCardId
                }))
                closeAllPopups()
            })
            .catch(err => console.error(`Ошибка при удалении карточки ${err}`));
    }

    function handleUpdateUser(dataUser) {
        setIsSending(true);
        api.editUserInfo(dataUser)
            .then(r => {
                setCurrentUser(r);
                closeAllPopups();
                setIsSending(false);
            })
            .catch(err => {
                console.error(`Ошибка при изменении профиля ${err}`);
                setIsSending(false);
            })
    }

    function handleUpdateAvatar(dataUser) {
        setIsSending(true);
        api.editAvatar(dataUser)
            .then(r => {
                setCurrentUser(r);
                closeAllPopups();
                setIsSending(false);
            })
            .catch(err => {
                console.error(`Ошибка при изменении аватара ${err}`);
                setIsSending(false);
            })
    }

    function handleAddPlaceSubmit(dataCard) {
        setIsSending(true)
        api.addCard(dataCard)
            .then(r => {
                setCards([r, ...cards])
                closeAllPopups();
                setIsSending(false);
            })
            .catch(err => {
                console.error(`Ошибка при добавлении карточки ${err}`);
                setIsSending(false);
            })

    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div>

                <Header/>

                <Main
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    onDeleteConfirm={handleDeleteClick}
                    cards={cards}
                />

                <Footer/>

                <EditProfilePopup
                    onUpdateUser={handleUpdateUser}
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    isSending={isSending}
                    onOverlayClick={handleOverlayClick}
                />

                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    isSending={isSending}
                    onAddPlace={handleAddPlaceSubmit}
                    onOverlayClick={handleOverlayClick}
                />

                <PopupWithForm
                    name='confirmation'
                    title='Вы уверены?'
                    nameButton='Да'
                    isOpen={isConfirmPopupOpen}
                    onClose={closeAllPopups}
                    onOverlayClick={handleOverlayClick}
                    onSubmit={handleCardDelete}
                />
                <EditAvatarPopup
                    onUpdateAvatar={handleUpdateAvatar}
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    isSending={isSending}
                    onOverlayClick={handleOverlayClick}
                />
                <ImagePopup
                    card={selectedCard}
                    isOpen={isImagePopup}
                    onClose={closeAllPopups}
                    onOverlayClick={handleOverlayClick}
                />

            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
