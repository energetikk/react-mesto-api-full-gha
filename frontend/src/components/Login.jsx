import React from "react"
import AuthForm from "./AuthForm";

function Login({handleCheckLogin}) {
  return (
    <AuthForm name={'login'} title={'Вход'}  textButton={'Войти'} handleCheckLogin={handleCheckLogin} />
  )
};

export default Login;
