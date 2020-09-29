import React from "react";
import classes from "./ForAppraisers.module.css";
import Registration from "../Registration/Registration";
import filterIcon from "./filter.svg";
import windowIcon from "./seo-full.svg";
import paperIcon from "./paper.svg";
import speedIcon from "./performance.svg"

const ForAppraisers = (props) =>{
    return(
        <div className={classes.forRealtors__inner}>
            <div className={classes.container}>
                <div className={classes.items}>
                    <div className={`${classes.item} ${classes.item__border}`}>
                        <img className={classes.icon} src={windowIcon} alt="icon"/>
                        <div className={classes.title}>Объявления в окне</div>
                        <div className={classes.text}>Единая лента объявлений, с более, чем 30 сайтов!</div>
                    </div>
                    <div className={`${classes.item} ${classes.item__border}`}>
                        <img className={classes.icon} src={filterIcon} alt="icon"/>
                        <div className={classes.title}>Фильтрация поиска</div>
                        <div className={classes.text}>Тонкая настройка фильтров поиска!</div>
                    </div>
                    <div className={`${classes.item} ${props.isMobile?classes.item__border:''}`}>
                        <img className={classes.icon} src={paperIcon} alt="icon"/>
                        <div className={classes.title}>Выписки ЕГРН</div>
                        <div className={classes.text}>Возможность приобрести выписку из ЕГРН!</div>
                    </div>
                    <div className={`${classes.item} ${props.isMobile?classes.item__border:''}`}>
                        <img className={classes.icon} src={speedIcon} alt="icon"/>
                        <div className={classes.title}>Высокая скорость оценки</div>
                        <div className={classes.text}>Скорость выполнения работ по оценке уменьшится в разы!</div>
                    </div>
                </div>
            </div>
            <Registration></Registration>
        </div>
    )}

export default ForAppraisers;