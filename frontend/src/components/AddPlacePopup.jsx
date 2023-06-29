import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";
import useForm from "./hooks/useForm";

function AddPlacePopup({ isOpen, onClose, onUpdateCards }) {
  // const [name, setName] = useState("");
  // const [link, setLink] = useState("");
  const {values, handleChange, setValues} = useForm({});

  // function handleChangeName(evt) {
  //   setName(evt.target.value);
  // }

  // function handleChangeLink(evt) {
  //   setLink(evt.target.value);
  // }

  React.useEffect(() => {
    setValues({});
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateCards({
      name: values.name,
      link: values.link,
    });
  }

  return (
    <div>
      <PopupWithForm
        name="addprofile"
        title="Новое место"
        textButton="Создать"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
      >
        <fieldset className="form__input-container">
          <input
            id="input-newplace"
            type="text"
            required
            minLength="2"
            maxLength="30"
            name="name"
            placeholder="Название"
            className="form__item form__item_place_name"
            // onChange={handleChangeName}
            onChange={handleChange}
            value={values.name || ""}
          />
          <span id="input-newplace-error" className="popup__error"></span>
          <input
            id="input-link"
            type="url"
            required
            name="link"
            placeholder="Ссылка на картинку"
            className="form__item form__item_place_link"
            // onChange={handleChangeLink}
            onChange={handleChange}
            value={values.link || ""}
          />
          <span id="input-link-error" className="popup__error"></span>
        </fieldset>
      </PopupWithForm>
    </div>
  );
}

export default AddPlacePopup;
