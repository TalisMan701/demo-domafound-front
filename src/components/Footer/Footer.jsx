import React from "react";
import classes from "./Footer.module.css";
import logo from "./logo.svg";
import phone from "./phone.svg";
import mail from "./mail.svg";
import {Link} from "react-router-dom";

const Footer = () =>{
    return(
        <div id="testScroll" className={classes.footerInner}>
            <div className={classes.container}>
                <div className={classes.logo}>
                    <div className={classes.logoInner}>
                        <img className={classes.logoIcon} src={logo} alt="logo"/>
                        <div className={classes.logoTitle}>
                            Doma<span>found</span>
                        </div>
                    </div>
                    <div className={classes.logoText}>
                        Мы помогаем риэлторам и оценщикам зарабатывать больше!
                    </div>
                </div>

                <div className={classes.linksInner}>
                    <Link className={classes.link}>
                        Договор оферта
                    </Link>
                    <Link className={classes.link}>
                        Документация
                    </Link>
                    <Link className={classes.link}>
                        Политика конфиденциальности
                    </Link>
                </div>

                <div className={classes.contactsInner}>
                    <div className={classes.contactsText}>
                        По всем вопросам:
                    </div>
                    <div className={classes.contact}>
                        <img className={classes.contactIcon} src={phone} alt="phone"/>
                        <div className={classes.contactText}>
                            +7-(932)-323-02-86
                        </div>
                    </div>
                    <div className={classes.contact}>
                        <img className={classes.contactIcon} src={mail} alt="mail"/>
                        <div className={classes.contactText}>
                            domafound@mail.ru
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )}

export default Footer;