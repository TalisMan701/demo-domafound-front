import React, {useState} from "react";
import classes from "./PropertyPage.module.css"
import Preloader from "../../common/Preloader/Preloader";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Slider.css"
import {NavLink} from "react-router-dom";
import closeIcon from "../FindProperty/Property/close.svg";
import YandexMapContainerShowHouse from "../YandexMap/YandexMapContainerShowHouse";
import YandexMapContainer from "../YandexMap/YandexMapContainer";

const PropertyPage = (props) => {
    let [showMap, setShowMap] = useState(false)

    const toggleShowMap = () =>{
        setShowMap(!showMap)
    }

    let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    }

    if (props.isFetchingOnePage) {
        return (
            <Preloader/>
        )
    } else {
        return (
            <div className={classes.propertyPage}>
                <div className={classes.row}>
                    <div className={classes.sliderInner}>
                        {props.property.house.image_set.length !== 0 &&
                            <Slider {...settings}>
                                {props.property.house.image_set.map(img =>
                                    <div className={classes.imgInner}>
                                        <img className={classes.img} src={img.image_link} alt=""/>
                                    </div>
                                )}
                            </Slider>
                        }
                        {props.property.house.image_set.length === 0 && props.property.house.title_image === null &&
                            <div className={classes.noImg}>
                                <div>
                                    Изображений нет
                                </div>
                            </div>
                        }
                        {props.property.house.image_set.length === 0 && props.property.house.title_image !== null &&
                            <div className={classes.imgInner}>
                                <img className={classes.img} src={props.property.house.title_image} alt=""/>
                            </div>
                        }
                    </div>
                    <div className={classes.propertyInfo}>
                        <div className={classes.title}>{props.property.house.title}</div>

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
                                    Ссылка: <a className={classes.link} href={props.property.house.link}>Посетить</a>
                                </div>
                            </div>
                            <div className={classes.phoneNumber}>
                                <div className={classes.phoneNumberTitle}>Номер телефона:</div>
                                {props.property.house.house_info !== null &&
                                <div className={classes.phone}>+{props.property.house.house_info.phone}</div>
                                }
                                {props.property.house.house_info === null &&
                                <div className={classes.phone}>Добавляется в базу.</div>
                                }
                                {/*<div className={classes.phoneNumberShow}>Смотреть</div>*/}
                            </div>
                        </div>
                        {props.property.house.house_info !== null &&
                        <div className={classes.content}>
                            <div>ID недвижимости: <span>{props.property.house.house_info.house_id}</span></div>
                            <div>Тип дома: <span>{props.property.house.house_info.house_type}</span></div>
                            <div>Этажность: <span>{props.property.house.house_info.floor_count}</span></div>
                            <div>Количество комнат: <span>{props.property.house.house_info.num_of_rooms}</span></div>
                            <div>Этаж: <span>{props.property.house.house_info.floor}</span></div>
                            <div>Площадь: <span>{props.property.house.house_info.total_area}</span>м²</div>
                        </div>
                        }
                        {props.property.house.house_info === null &&
                            <div className={classes.content}>
                                <div className={classes.loadInfo}>Идёт запись информации в базу</div>
                            </div>
                        }
                        {props.property.house.house_info !== null &&
                            <div>
                                <div onClick={()=>toggleShowMap()} className={classes.showOnMapText}>Показать на карте</div>
                                {showMap &&
                                    <div className={classes.modal}>
                                        <div className={classes.modalBody}>
                                            <button className={classes.closeModal} onClick={()=>toggleShowMap()}>Закрыть</button>
                                            <YandexMapContainerShowHouse x={props.property.house.x_cord} y={props.property.house.y_cord}/>
                                        </div>
                                    </div>
                                }
                            </div>
                        }
                    </div>
                </div>
                {props.property.house.data !== "" &&
                <div className={classes.content}>
                    <div className={classes.mainInfo}>
                        {props.property.house.data}
                    </div>
                </div>
                }
                <div className={classes.btns}>
                    {!props.property.is_fav &&
                    <div onClick={() => {props.setToFavoriteList(props.property.house.id)}} className={`${classes.btnAddToFavorites} ${classes.btn}`}>Добавить в избранное</div>
                    }
                    {props.property.is_fav &&
                    <div onClick={() => {props.removeToFavoriteList(props.property.house.id)}} className={`${classes.btnAddToFavorites} ${classes.btn}`}>Удалить из избранных</div>
                    }
                    {/*<img onClick={() => {props.setToIgnoreList(props.property.house.id)}} className={classes.closeIcon} src={closeIcon} alt="Add to ignore list"/>*/}
                    {/*<NavLink className={`${classes.btnBack} ${classes.btn}`} to={'/find_property'}>
                        Вернуться
                    </NavLink>*/}
                    <div className={`${classes.btnBack} ${classes.btn}`} onClick={props.goBack}>
                        Вернуться
                    </div>
                </div>
            </div>
        )
    }
}

export default PropertyPage;