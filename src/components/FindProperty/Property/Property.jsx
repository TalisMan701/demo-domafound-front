import React from "react";
import classes from "./Property.module.css";
import closeIcon from "./close.svg";
import {NavLink} from "react-router-dom";

const Property = (props) => {
    return (
        <div className={classes.property}>
            <NavLink to={`/propertyPage/${props.item.items.id}`} className={classes.imgs}>
                {props.item.items.title_image !== null &&
                    <img className={classes.img} src={props.item.items.title_image}/>
                }
                {props.item.items.title_image === null &&
                    <div className={classes.noImg}>
                        <div>
                            Изображения нет
                        </div>
                    </div>
                }
            </NavLink>
            <div className={classes.content}>
                <NavLink to={`/propertyPage/${props.item.items.id}`} className={classes.title}>{props.item.items.title}</NavLink>
                <div className={classes.description}>
                    <div className={classes.descriptionTitle}>Описание</div>
                    <div className={classes.descriptionText}>
                        Адресс: {props.item.items.address},
                        <br/>
                        {/*Выложено: {props.item.items.data},
                        <br/>*/}
                        Цена: {props.item.items.price}₽
                        <br/>
                        Ссылка: <a className={classes.link}  href={props.item.items.link}>Посетить</a>
                    </div>
                </div>
                <div className={classes.phoneNumber}>
                    <div className={classes.phoneNumberTitle}>Номер телефона:</div>
                    {props.item.items.house_info !== null &&
                        <div className={classes.phone}>+{props.item.items.house_info.phone}</div>
                    }
                    {props.item.items.house_info === null &&
                    <div className={classes.phone}>Добавляется в базу.</div>
                    }

                    {/*<div className={classes.phoneNumberShow}>Смотреть</div>*/}
                </div>
                <div className={classes.btns}>
                    {!props.item.is_fav &&
                    <div onClick={() => {props.setToFavoriteList(props.item.items.id)}} className={`${classes.btnAddToFavorites} ${classes.btn}`}>Добавить в избранное</div>
                    }
                    {props.item.is_fav &&
                    <div onClick={() => {props.removeToFavoriteList(props.item.items.id)}} className={`${classes.btnAddToFavorites} ${classes.btn}`}>Удалить из избранных</div>
                    }
                    <img onClick={() => {props.setToIgnoreList(props.item.items.id)}} className={classes.closeIcon} src={closeIcon} alt="Add to ignore list"/>
                </div>
            </div>
        </div>
    )
}

export default Property;