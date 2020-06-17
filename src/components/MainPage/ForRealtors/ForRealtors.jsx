import React from "react";
import classes from "./ForRealtors.module.css";
import icon from "./male.svg"
import Registration from "../Registration/Registration";

const ForRealtors = () =>{
    return(
        <div className={classes.forRealtors__inner}>
            <div className={classes.container}>
                <div className={classes.items}>
                    <div className={`${classes.item} ${classes.item__border}`}>
                        <img className={classes.icon} src={icon} alt="icon"/>
                        <div className={classes.title}>Объявления в окне</div>
                        <div className={classes.text}>Все объявления теперь в одном окне, без перезагрузок страниц и переходов с сайта на сайт!</div>
                    </div>
                    <div className={`${classes.item} ${classes.item__border}`}>
                        <img className={classes.icon} src={icon} alt="icon"/>
                        <div className={classes.title}>Все в одном</div>
                        <div className={classes.text}>Больше нет необходимости листать множество сайтов в поисках объектов!</div>
                    </div>
                    <div className={`${classes.item} ${classes.item__border}`}>
                        <img className={classes.icon} src={icon} alt="icon"/>
                        <div className={classes.title}>Фильтрация поиска</div>
                        <div className={classes.text}>Тонкая фильтрация поиска поможет найти нужный Вам объект!</div>
                    </div>
                    <div className={classes.item}>
                        <img className={classes.icon} src={icon} alt="icon"/>
                        <div className={classes.title}>Крупная сеть оценщиков</div>
                        <div className={classes.text}>Теперь не нужно искать оценщиков, так как мы работаем с крупной сетью, для Вас будет назначена значительная скидка!</div>
                    </div>
                    <div className={classes.item}>
                        <img className={classes.icon} src={icon} alt="icon"/>
                        <div className={classes.title}>Работаем 24/7</div>
                        <div className={classes.text}>Объявления обрабатываются каждые 30 секунд, без перерыва 24 часа в сутки, 7 дней в неделю!</div>
                    </div>
                    <div className={classes.item}>
                        <img className={classes.icon} src={icon} alt="icon"/>
                        <div className={classes.title}>Расширяемость базы</div>
                        <div className={classes.text}>Личная база объектов будет увеличиваться В РАЗЫ!</div>
                    </div>
                </div>
            </div>
            <Registration></Registration>
        </div>
    )}

export default ForRealtors;