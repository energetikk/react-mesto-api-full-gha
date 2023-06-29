import React, { useContext } from "react";
import { useState } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = useContext(CurrentUserContext);

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(evt) {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({ name, description });
  }

  return (
    <div>
      <PopupWithForm
        name="editprofile"
        title="Редактировать профиль"
        textButton="Сохранить"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
      >
        <fieldset className="form__input-container">
          <input
            id="input-name"
            required
            minLength="2"
            maxLength="40"
            type="text"
            placeholder="Имя"
            name="nameuser"
            className="form__item form__item_el_name"
            onChange={handleChangeName}
            value={name || ""}
          />
          <span id="input-name-error" className="popup__error"></span>
          <input
            id="input-job"
            required
            minLength="2"
            maxLength="200"
            type="text"
            placeholder="О себе"
            name="jobuser"
            className="form__item form__item_el_job"
            onChange={handleChangeDescription}
            value={description || ""}
          />
          <span id="input-job-error" className="popup__error"></span>
        </fieldset>
      </PopupWithForm>
    </div>
  );
}

export default EditProfilePopup;