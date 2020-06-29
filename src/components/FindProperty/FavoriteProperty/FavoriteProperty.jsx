import React from "react";
import classes from "./FavoriteProperty.module.css";
import closeIcon from "./close.svg";
import {NavLink} from "react-router-dom";

const FavoriteProperty = (props) => {
    return (
        <div className={classes.property}>
            <NavLink to={`/propertyPage/${props.item.id}`} className={classes.imgs}>
                {props.item.title_image !== null &&
                <img className={classes.img} src={props.item.title_image}/>
                }
                {props.item.title_image === null &&
                <div className={classes.noImg}>
                    <div>
                        Изображения нет
                    </div>
                </div>
                }
            </NavLink>
            <div className={classes.content}>
                <NavLink to={`/propertyPage/${props.item.id}`} className={classes.title}>{props.item.title}</NavLink>
                <div className={classes.description}>
                    <div className={classes.descriptionTitle}>Описание</div>
                    <div className={classes.descriptionText}>
                        Адресс: {props.item.address},
                        <br/>
                        {/*Выложено: {props.item.data},
                        <br/>*/}
                        Цена: {props.item.price}₽
                        <br/>
                        Ссылка: <a className={classes.link}  href={props.item.link}>Посетить</a>
                    </div>
                </div>
                <div className={classes.phoneNumber}>
                    <div className={classes.phoneNumberTitle}>Номер телефона:</div>
                    {props.item.house_info !== null &&
                    <div className={classes.phone}>+{props.item.house_info.phone}</div>
                    }
                    {props.item.house_info === null &&
                    <div className={classes.phone}>Добавляется в базу.</div>
                    }

                    {/*<div className={classes.phoneNumberShow}>Смотреть</div>*/}
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