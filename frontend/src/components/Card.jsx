import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext } from "react";

function Card({card, onCardClick, onCardLike, onCardDelete, onConfirmDelete}) {
  const currentUser = useContext(CurrentUserContext);
 
  function handleClick() {
    onCardClick(card);
  }

  function handleDeleteClick() {
    onConfirmDelete(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  // Определяем, являемся ли мы владельцем текущей карточки
  // const isOwn = card.owner._id === currentUser._id;
  const isOwn = card.owner === currentUser._id;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  // const isLiked = card.likes.some(i => i._id === currentUser._id);
  const isLiked = card.likes.some(i => i === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = ( 
  `places__button-like ${isLiked && 'places__button-like_active'}` 
  ); 

  return (
    <li>
      <figure className="places__element">
        <img
          className="places__photo"
          src={card.link}
          alt={card.name}
          onClick={handleClick}
        />
        <figcaption className="places__card">
          <p className="places__card-name">{card.name}</p>
          <div className="places__like">
            <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
            <p className="places__like-counter">{card.likes.length}</p>
          </div>
        </figcaption>
        {/* <button type="button" className="places__card-delete"></button> */}
        // Далее в разметке используем переменную для условного рендеринга
        {isOwn && <button className='places__card-delete' type="button" onClick={handleDeleteClick} />}
      </figure>
    </li>
  );
}

export default Card;
