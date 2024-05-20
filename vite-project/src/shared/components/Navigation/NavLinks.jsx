import React, { useContext } from "react";
import "./NavLinks.css";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/Auth-Context";
import Button from "../FormElements/Button";

const NavLinks = () => {
  const auth = useContext(AuthContext);

  const logoutHandler = () => {
    auth.logOut();
  };

  console.log(auth);
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          ALL USERS
        </NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink to={`${auth.userId}/places`} exact>
            MY PLACE
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/places/new">ADD PLACE</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">AUTENTICATE</NavLink>
        </li>
      )}
      {auth.isLoggedIn && <Button onClick={logoutHandler}>LOGOUT</Button>}
    </ul>
  );
};

export default NavLinks;
