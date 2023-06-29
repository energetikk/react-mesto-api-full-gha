import React, { useEffect } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext } from "react";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  cards,
  onConfirmDelete,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__info">
          <div className="profile__avatar">
            <img
              src={currentUser.avatar}
              alt="Фотография пользователя"
              className="profile__main-photo"
            />
            <button
              onClick={onEditAvatar}
              type="submit"
              className="profile__edit-button-avatar"
            ></button>
          </div>
          <div className="profile__heading">
            <div className="profile__title">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                onClick={onEditProfile}
                type="button"
                className="profile__edit-button"
              ></button>
            </div>
            <p className="profile__job">{currentUser.about}</p>
          </div>
        </div>
        <button
          onClick={onAddPlace}
          type="button"
          className="profile__addbutton"
        ></button>
      </section>
      <section className="places">
        <ul className="places__photo-cards">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onConfirmDelete={onConfirmDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
