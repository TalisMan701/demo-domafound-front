import React from "react";
import classes from "./Header.module.css";
import Navbar from "./Navbar/Navbar";
import Logo from "./Logo/Logo";
import UserInfoContainer from "./UserInfo/UserInfoContainer";

const Header = () =>{
    return(
        <header className={classes.header}>
            <div className={classes.container}>
                <div className={classes.box}>
                    <Logo/>
                    <Navbar/>
                </div>
                <UserInfoContainer/>
            </div>
        </header>
    )}

export default Header;