import React from "react";
import classes from "./UserInfo.module.css";
import icon from "./male.svg";

import NotificationBadge from 'react-notification-badge';
import {Effect} from 'react-notification-badge';

import {NavLink} from "react-router-dom";

const UserInfo = (props) => {

    return (
        <>
            {/*{props.isAuth &&
            <div className={classes.settingsWrapper}>
                <div className={classes.jobWithClientInner}>
                    <div>Работа с клиентом</div>
                    <input onChange={(e)=>{
                        props.setJobWithClient(!props.jobWithClient)
                    }} defaultChecked={props.jobWithClient} type="checkbox" name="jobWithClient" id="jobWithClient"/>
                </div>
            </div>
            }*/}
            <div className={classes.userWrapper}>
                {props.isAuth ?
                    <div className={classes.userInfoInner}>
                        <NavLink to="/office">
                            <img className={classes.icon} src={icon} alt=""/>
                        </NavLink>
                        <div className={classes.onlineCount}>
                            <span>{props.onlineCount}</span>
                            <div className={classes.onlineCountText}>
                                <div>Пользователей онлайн:</div>
                            </div>
                        </div>
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
        </>

    )
}

export default UserInfo;