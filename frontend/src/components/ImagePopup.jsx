import React from "react";

function ImagePopup({card, isOpen, onClose}) {

  const toggleClassPopupImage = `popup popup_cardfullscreen ${isOpen ? 'popup_opened' : ''}`
  
  return (
        <div className={toggleClassPopupImage}>
        <div className="popup__container-photo">
          <figure className="popup__card-fullscreen">
            <img className="popup__card-photo" src={card.link} alt={card.name}/>
            <figcaption className="popup__card-information">
              <p className="popup__card-location">{card.name}</p>
            </figcaption>
          </figure>
          <button type="button" className="popup__button-close" onClick={onClose}></button>
        </div>
      </div>        
    )
    
}

export default ImagePopup;