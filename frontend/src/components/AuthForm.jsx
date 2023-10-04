import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
// import {useForm} from "../hooks/useForm"

function AuthForm({name, title, textButton, handleCheckRegister, handleCheckLogin}) {
  // const navigate = useNavigate();  
  const [formValue, setFormValue] = useState({
    password: "",
    email: "",
  });
  
  const handleChangeInput = (evt) => {
    const {name, value} = evt.target;
    setFormValue({...formValue, [name]: value})
  }
  
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const { password, email } = formValue;
    if (name === 'register') {
      handleCheckRegister(password, email);  
    } else {
      handleCheckLogin(password, email);
    }}
  
    return (
        <div className="auth__container">
          <form name={`${name}-form`} className="form__auth" onSubmit={handleSubmit} noValidate>
            <h2 className="form__title-auth">{title}</h2>
            <input
            id="input-email"
            required
            minLength="2"
            maxLength="40"
            type="email"
            placeholder="E-mail"
            name="email"
            className="form__item-auth form__item_el_email"
            onChange={handleChangeInput}
            value= {formValue.email || ""}
          />
          <span id="input-email-error" className="popup__error"></span>

          <input
            id="input-password"
            required
            minLength="2"
            maxLength="200"
            type="password"
            placeholder="Пароль"
            name="password"
            className="form__item-auth form__item_el_password"
            onChange={handleChangeInput} 
            value={formValue.password || ""}
          />
          <span id="input-password-error" className="popup__error"></span>
            <button type="submit" className="auth__submit">{textButton}</button>
          </form>
          {name === 'register' && (
          <Link to="/signin" className="button__sign-in">Уже зарегистрированы? Войти</Link>
          )}
        </div>
    )
}

export default AuthForm;