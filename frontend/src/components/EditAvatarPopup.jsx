import React from "react";
import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <div>
      <PopupWithForm
        name="addavatarprofile"
        title="Обновить аватар"
        textButton="Сохранить"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
      >
        <fieldset className="form__input-container">
          <input
            id="input-link-avatar"
            type="url"
            required
            name="link"
            placeholder="Ссылка на картинку"
            className="form__item form__item_avatar_link"
            ref={avatarRef}
          />
          <span id="input-link-avatar-error" className="popup__error"></span>
        </fieldset>
      </PopupWithForm>
    </div>
  );
}

export default EditAvatarPopup;
