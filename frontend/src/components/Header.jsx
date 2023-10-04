import React from "react";
import logo from "../images/logo.svg";
import {useLocation} from "react-router-dom"
import { Link } from "react-router-dom";

function Header({loggedIn, emailUser, singOut}) {
  const location = useLocation();
  return (
    <>
      <header className="auth">
      <img src={logo} alt="Логотип соцсети Mesto" className="header__logo" />
        {loggedIn ? (
          <div className="qwe">
            <p className="header__email">{emailUser}</p>
            <Link onClick={singOut} to="/signin" className="header__singout" >Выйти</Link> 
          </div> ) : (
            <>
              {location.pathname === "/signup" ? 
                (<Link className="auth_button" to="/signin">Войти</Link>) :
                (<Link className="auth_button" to="/signup">Регистрация</Link>)   
                }
            </>
          )}
    </header>
    <div className="header__line"></div>
    </>
  );
}

export default Header;

