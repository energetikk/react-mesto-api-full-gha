import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmDeletePopup({ isOpen, onClose, onSubmitConfirmDelete }) {
  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmitConfirmDelete();
  }

  return (
    <PopupWithForm
      name="confirm"
      title="Вы уверены?"
      textButton="Да"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    ></PopupWithForm>
  );
}

export default ConfirmDeletePopup;
