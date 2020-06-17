import React from "react";
import classes from "./Logo.module.css";
import logo from "./logo.svg";
import {NavLink} from "react-router-dom";

const Logo = () =>{
    return(
        <NavLink to="/" className={classes.logo__inner}>
            <img className={classes.logo__img} src={logo} alt="logo"/>
            <div className={classes.logo__text}>
                Doma<span>found</span>
            </div>
        </NavLink>
    )}

export default Logo;