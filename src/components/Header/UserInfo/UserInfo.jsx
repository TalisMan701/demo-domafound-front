import React from "react";
import classes from "./UserInfo.module.css";
import icon from "./male.svg";

import NotificationBadge from 'react-notification-badge';
import {Effect} from 'react-notification-badge';

import {NavLink} from "react-router-dom";

const UserInfo = (props) => {

    return (
        <div className={classes.userWrapper}>
            {props.isAuth ?
                <div className={classes.userInfoInner}>
                    <NavLink to="/office">
                        <img className={classes.icon} src={icon} alt=""/>
                    </NavLink>
                    <div className={classes.userInfo}>
                        {props.isSubscription &&
                        <div className={classes.countDays}>
                            {props.countDays >0 &&
                                <div>Осталось дней: <span>{props.countDays}</span></div>
                            }
                            {props.countDays == 0 &&
                                <div>Осталось часов: <span>{props.countHours}</span></div>
                            }
                        </div>
                        }
                        {!props.isSubscription &&
                        <NavLink to='/tariffs' className={classes.buyTariff}>Приобрести тариф</NavLink>
                        }
                        <div className={classes.user}>
                            <div className={classes.userPhone}>{props.number}</div>
                            <div onClick={props.logout} className={classes.logoutText}>Выйти</div>
                        </div>
                    </div>
                    {/*<NotificationBadge style={{bottom: "-2px", top:'auto', background: "#f38181"}} className={classes.num} count={2} effect={Effect.SCALE}/>*/}
                </div>
                : <div className={classes.authInner}>
                    <NavLink to='/login' className={classes.authText}>Войти</NavLink> <span> / </span>
                    <NavLink to='/registration' className={classes.authText}>Зарегистрироваться</NavLink>
                </div>}

        </div>


    )
}

export default UserInfo;