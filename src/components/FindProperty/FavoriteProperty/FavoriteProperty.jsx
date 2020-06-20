import React from "react";
import classes from "./FavoriteProperty.module.css";
import closeIcon from "./close.svg";

const FavoriteProperty = (props) => {
    return (
        <div className={classes.property}>
            <div className={classes.imgs}>
                <img className={classes.img} src="https://api.interior.ru/media/images/setka/2020_02_12/VladaSteblina_kvartira_dlya_sebya_1_1920_full.jpg" alt="img"/>
            </div>
            <div className={classes.content}>
                <div className={classes.title}>{props.item.title}</div>
                <div className={classes.description}>
                    <div className={classes.descriptionTitle}>Описание</div>
                    <div className={classes.descriptionText}>
                        Адресс: {props.item.address},
                        <br/>
                        {/*Выложено: {props.item.items.data},
                        <br/>*/}
                        Цена: {props.item.price}₽
                        <br/>
                        Ссылка: <a href={props.item.link}>Посетить</a>
                    </div>
                </div>
                <div className={classes.phoneNumber}>
                    <div className={classes.phoneNumberTitle}>Номер телефона</div>
                    <div className={classes.phone}>+7-992-007-71-62</div>
                    <div className={classes.phoneNumberShow}>Смотреть</div>
                </div>
                <div className={classes.btns}>
                    <div onClick={() => {props.setToIgnoreList(props.item.id)}} className={`${classes.btnAddToFavorites} ${classes.btn}`}>Добавить в игнор лист</div>
                    <img onClick={() => {props.removeToFavoriteList(props.item.id)}} className={classes.closeIcon} src={closeIcon} alt="Add to ignore list"/>
                </div>
            </div>
        </div>
    )
}

export default FavoriteProperty;