import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import PopupWithForm from "./PopupWithForm/PopupWithForm.jsx";
import PopupZoom from "./PopupZoom/PopupZoom.jsx";
import {useState} from "react";

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
    const [selectedCard, setSelectedCard] = useState({})
    const [isImagePopup, setImagePopup] = useState(false)

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false)
        setIsAddPlacePopupOpen(false)
        setIsEditAvatarPopupOpen(false)
        setImagePopup(false)
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

    // function handleDeleteClick() {}
    function handleCardClick(card) {
        setSelectedCard(card)
        setImagePopup(true)

    }

    return (
        <div className="page">

            <Header/>

            <Main
                openEditProfile={handleEditProfileClick}
                openAddCard={handleAddPlaceClick}
                openAvatar={handleEditAvatarClick}
                openCardClick={handleCardClick}
            />

            <Footer/>

            <PopupWithForm
                name={'editProfile'}
                title={'Редактировать профиль'}
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
            >
                <input
                    className="popup__input popup__input_type_name"
                    id="name-input"
                    name="name"
                    type="text"
                    placeholder="Имя"
                    minLength={2}
                    maxLength={40}
                    required=""
                />
                <span className="name-input-error popup__input-error"/>
                <input
                    className="popup__input popup__input_type_job"
                    id="description-input"
                    name="info"
                    type="text"
                    placeholder="Описание"
                    minLength={2}
                    maxLength={200}
                    required=""
                />
                <span className="description-input-error popup__input-error"/>
            </PopupWithForm>
            <PopupWithForm
                name='addCard'
                title='Новое место'
                nameButton='Создать'
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
            >
                <input
                    className="popup__input popup__input_type_picture-title"
                    id="title-input"
                    name="title"
                    type="text"
                    placeholder="Название"
                    required=""
                    minLength={2}
                    maxLength={30}
                />
                <span className="title-input-error popup__input-error"/>
                <input
                    className="popup__input popup__input_type_picture-link"
                    id="url-input"
                    name="link"
                    type="url"
                    placeholder="Ссылка на картинку"
                    required=""
                />
                <span className="url-input-error popup__input-error"/>
            </PopupWithForm>
            <PopupWithForm
                name='confirmation'
                title='Вы уверены?'
                nameButton='Да'
            />
            <PopupWithForm
                name='editAvatar'
                title='Обновить аватар'
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
            >
                <input
                    className="popup__input popup__input_type_picture-link"
                    id="url-avatar"
                    name="avatar"
                    type="url"
                    placeholder="Ссылка на аватар"
                    required=""
                />
                <span className="url-avatar-error popup__input-error"/>
            </PopupWithForm>
            <PopupZoom
                card={selectedCard}
                isOpen={isImagePopup}
                onClose={closeAllPopups}
            />

        </div>

    );
}

export default App;
