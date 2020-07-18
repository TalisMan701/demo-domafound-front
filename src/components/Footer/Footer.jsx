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
                    <Link target="_blank" to={'/agreement'} className={classes.link}>
                        Пользовательское соглашение
                    </Link>
                    <Link className={classes.link}>
                        Документация
                    </Link>
                    <Link target="_blank" to={'/politic'} className={classes.link}>
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
                <div className={classes.ogrnInner}>
                    <div className={classes.IP}>ИП РУБЦОВ ВЛАДИМИР АЛЕКСАНДРОВИЧ</div>
                    <div className={classes.IPInfo}>ОГРНИП: 320861700032380, ИНН: 860403386942, Дата присвоения ОГРНИП: 29.06.20</div>
                </div>
            </div>
        </div>
    )}

export default Footer;