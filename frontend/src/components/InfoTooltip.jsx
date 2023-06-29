import React from "react";

function InfoTooltip({name, logo, textMessage, isOpen, onClose}) {
    return (
      <div className={`popup popup_${name} ${isOpen ? 'popup_opened' : "" }`}>
        <div className="popup__container popup_message">
          
            <img className="" src={logo}/>
            <h3 className="message__title">{textMessage}</h3>
            
          <button onClick={onClose} type="button" className="popup__button-close"></button>
        </div>
      </div>
    )
}

export default InfoTooltip;
