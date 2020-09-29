import React, {useEffect, useState} from "react";
import classes from "./ForRealtors.module.css";
import Registration from "../Registration/Registration";
import filterIcon from "./filter.svg";
import windowIcon from "./seo-full.svg";
import bigNetworkIcon from "./big-data.svg";
import boxIcon from "./box.svg";
import growthIcon from "./growth.svg";
import timeIcon from "./time.svg"

const ForRealtors = (props) =>{
    return(
        <div className={classes.forRealtors__inner}>
            <div className={classes.container}>
                <div className={classes.items}>
                    <div className={`${classes.item} ${classes.item__border}`}>
                        <img className={classes.icon} src={windowIcon} alt="icon"/>
                        <div className={classes.title}>Объявления в окне</div>
                        <div className={classes.text}>Все объявления теперь в одном окне, без перезагрузок страниц и переходов с сайта на сайт!</div>
                    </div>
                    <div className={`${classes.item} ${classes.item__border}`}>
                        <img className={classes.icon} src={boxIcon} alt="icon"/>
                        <div className={classes.title}>Все в одном</div>
                        <div className={classes.text}>Больше нет необходимости листать множество сайтов в поисках объектов!</div>
                    </div>
                    <div className={`${classes.item} ${classes.item__border}`}>
                        <img className={classes.icon} src={filterIcon} alt="icon"/>
                        <div className={classes.title}>Фильтрация поиска</div>
                        <div className={classes.text}>Тонкая фильтрация поиска поможет найти нужный Вам объект!</div>
                    </div>
                    <div className={`${classes.item} ${props.isMobile?classes.item__border:''}`}>
                        <img className={classes.icon} src={bigNetworkIcon} alt="icon"/>
                        <div className={classes.title}>Крупная сеть оценщиков</div>
                        <div className={classes.text}>Партнёрский канал с аккредитованными оценочными компаниями. Скидки и самые короткие сроки выполнения оценки!</div>
                    </div>
                    <div className={`${classes.item} ${props.isMobile?classes.item__border:''}`}>
                        <img className={classes.icon} src={timeIcon} alt="icon"/>
                        <div className={classes.title}>Работаем 24/7</div>
                        <div className={classes.text}>Объявления обрабатываются каждые 30 секунд, без перерыва 24 часа в сутки, 7 дней в неделю!</div>
                    </div>
                    <div className={`${classes.item} ${props.isMobile?classes.item__border:''}`}>
                        <img className={classes.icon} src={growthIcon} alt="icon"/>
                        <div className={classes.title}>Расширяемость базы</div>
                        <div className={classes.text}>Личная база объектов будет увеличиваться В РАЗЫ!</div>
                    </div>
                </div>
            </div>
            <Registration></Registration>
        </div>
    )}

export default ForRealtors;