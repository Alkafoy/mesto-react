import {useEffect, useState} from "react";
import api from "../../utils/api";
import Card from "../Card/Card.jsx";

export default function Main({openEditProfile, openAddCard, openAvatar, openCardClick}) {
    const [userName, setUserName] = useState('');
    const [userDescription, setUserDescription] = useState('');
    const [userAvatar, setUserAvatar] = useState('');
    const [cards, setCards] = useState([]);

    useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([userData, cardsData]) => {
                setUserName(userData.name)
                setUserDescription(userData.about)
                setUserAvatar(userData.avatar)
                cardsData.forEach(element => element.myId = userData._id);
                setCards(cardsData)
            });
    }, [])


    return (
        <main className="main">
            <section className="profile">
                <div className="profile__avatar-wrap">
                    <img className="profile__avatar" src={userAvatar} alt="Аватар"/>
                    <button
                        className="profile__avatar-edit"
                        type="button"
                        aria-label="Редактировать аватар"
                        onClick={openAvatar}
                    />
                </div>
                <div className="profile__info">
                    <h1 className="profile__title">{userName}</h1>
                    <button
                        className="profile__edit-button"
                        type="button"
                        aria-label="Редактировать профиль"
                        onClick={openEditProfile}
                    />
                    <p className="profile__description">{userDescription}</p>
                </div>
                <button
                    className="profile__add-button"
                    type="button"
                    aria-label="Добавить"
                    onClick={openAddCard}
                ></button>
            </section>
            <section className="elements" aria-label="Места">
                <ul className="elements__list">
                    {cards.map(data => {
                        return (
                            <li className="element" key={data._id}>
                                <Card card={data} openCardClick={openCardClick}/>
                            </li>
                        )
                    })}
                </ul>
            </section>
        </main>
    )
}