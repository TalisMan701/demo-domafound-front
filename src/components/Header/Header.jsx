import React from "react";
import classes from "./Header.module.css";
import Navbar from "./Navbar/Navbar";
import Logo from "./Logo/Logo";
import UserInfoContainer from "./UserInfo/UserInfoContainer";
import HamburgerButton from "./HamburgerButton";

const Header = () =>{
    return(
        <header className={classes.header}>
            <div className={classes.container}>
                <div className={classes.box}>
                    <Logo/>
                    <div className={classes.noBurgerMenu}>
                        <Navbar/>
                    </div>
                </div>
                <div className={classes.noBurgerMenu}>
                    <UserInfoContainer/>
                </div>
                <div className={classes.burgerMenu}>
                    <HamburgerButton/>
                </div>
            </div>
        </header>
    )}

export default Header;