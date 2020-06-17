import React from "react";
import classes from "./Navbar.module.css";
import {NavLink} from "react-router-dom";

const Navbar = () =>{
    return(
        <nav className={classes.nav}>
            <div className={classes.item}>
                <NavLink to="/find" className={classes.link}  activeClassName={classes.active}>Поиск недвижимости</NavLink>
            </div>
            <div className={classes.item}>
                <NavLink to="/tariffs"  className={classes.link}  activeClassName={classes.active}>Тарифы</NavLink>
            </div>
        </nav>
    )}

export default Navbar;