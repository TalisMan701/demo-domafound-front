import React from "react";
import classes from "./ForAppraisers.module.css";
import icon from "./male.svg"
import Registration from "../Registration/Registration";

const ForAppraisers = () =>{
    return(
        <div className={classes.forRealtors__inner}>
            <div className={classes.container}>
                <div className={classes.items}>
                    <div className={`${classes.item} ${classes.item__border}`}>
                        <img className={classes.icon} src={icon} alt="icon"/>
                        <div className={classes.title}>Объявления в окне</div>
                        <div className={classes.text}>Единая лента объявлений, с более, чем 30 сайтов!</div>
                    </div>
                    <div className={`${classes.item} ${classes.item__border}`}>
                        <img className={classes.icon} src={icon} alt="icon"/>
                        <div className={classes.title}>Фильтрация поиска</div>
                        <div className={classes.text}>Тонкая настройка фильтров поиска!</div>
                    </div>
                    <div className={classes.item}>
                        <img className={classes.icon} src={icon} alt="icon"/>
                        <div className={classes.title}>Выписки ЕГРН</div>
                        <div className={classes.text}>Возможность приобрести выписку из ЕГРН!</div>
                    </div>
                    <div className={classes.item}>
                        <img className={classes.icon} src={icon} alt="icon"/>
                        <div className={classes.title}>Высокая скорость оценки</div>
                        <div className={classes.text}>Скорость выполнения работ по оценке уменьшится в разы!</div>
                    </div>
                </div>
            </div>
            <Registration></Registration>
        </div>
    )}

export default ForAppraisers;