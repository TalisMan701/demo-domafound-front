import React from "react";
import classes from "./PropertyPage.module.css"
import Preloader from "../../common/Preloader/Preloader";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Slider.css"
import {NavLink} from "react-router-dom";
import closeIcon from "../FindProperty/Property/close.svg";

const PropertyPage = (props) => {
    if(props.isFetching){
        return (
            <Preloader/>
        )
    }

    let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    }
    return(
        <div className={classes.propertyPage}>
            <div className={classes.sliderInner}>
                <Slider {...settings}>
                    {props.property.house.image_set.map(img =>
                        <div className={classes.imgInner}>
                            <img className={classes.img} src={img.image_link} alt=""/>
                        </div>

                    )}
                </Slider>
            </div>
            <div className={classes.propertyInfo}>
                <div className={classes.title} >{props.property.house.title}</div>

                <div className={classes.content}>
                    <div className={classes.description}>
                        <div className={classes.descriptionTitle}>Описание</div>
                        <div className={classes.descriptionText}>
                            Адресс: {props.property.house.address},
                            <br/>
                            {/*Выложено: {props.item.items.data},
                        <br/>*/}
                            Цена: {props.property.house.price}₽
                            <br/>
                            Ссылка: <a href={props.property.house.link}>Посетить</a>
                        </div>
                    </div>
                    <div className={classes.phoneNumber}>
                        <div className={classes.phoneNumberTitle}>Номер телефона</div>
                        <div className={classes.phone}>+{props.property.house.house_info.phone}</div>
                        <div className={classes.phoneNumberShow}>Смотреть</div>
                    </div>
                </div>
                <div className={classes.content}>
                    <div className={classes.mainInfo}>
                        {props.property.house.data}
                    </div>
                </div>
                <div className={classes.btns}>
                    {/*{!props.property.is_fav &&
                    <div onClick={() => {props.setToFavoriteList(props.property.house.id)}} className={`${classes.btnAddToFavorites} ${classes.btn}`}>Добавить в избранное</div>
                    }
                    {props.property.is_fav &&
                    <div onClick={() => {props.removeToFavoriteList(props.property.house.id)}} className={`${classes.btnAddToFavorites} ${classes.btn}`}>Удалить из избранных</div>
                    }
                    <img onClick={() => {props.setToIgnoreList(props.property.house.id)}} className={classes.closeIcon} src={closeIcon} alt="Add to ignore list"/>*/}
                    <NavLink className={`${classes.btnBack} ${classes.btn}`} to={"/find_property"}>
                        Вернуться
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default PropertyPage;