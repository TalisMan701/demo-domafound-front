import React from "react";
import classes from "./UserInfo.module.css";

import NotificationBadge from 'react-notification-badge';
import {Effect} from 'react-notification-badge';
import {NavLink} from "react-router-dom";

const UserInfo = (props) =>{

    return(
        <div className={classes.userWrapper}>
            {props.isAuth  ?
                <div className={classes.userInfoInner}>
                    <div onClick={props.logout} className={classes.authText}>Выйти</div>
                    <div className={classes.userInfo}>
                        <NotificationBadge style={{bottom: "-2px", top:'auto', background: "#f38181"}} className={classes.num} count={2} effect={Effect.SCALE}/>
                    </div>
                </div>
                : <div className={classes.authInner}>
                    <NavLink to='/login' className={classes.authText}>Войти</NavLink> <span> / </span>
                    <NavLink to='/registration' className={classes.authText}>Зарегистрироваться</NavLink>
                </div>}

        </div>


    )}

export default UserInfo;