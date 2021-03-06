import React, {useState} from "react";
import classes from "./Property.module.css";
import closeIcon from "./close.svg";
import {NavLink} from "react-router-dom";
import Moment from 'react-moment';
import 'moment/locale/ru';
import "./animate.css";
import audioURL from "./pullProperty.mp3";

const Property = (props) => {
    let date = Date.parse(props.item.items.time);
    let date2 = new Date(date)
    let date4 = new Date(`${date2.toString()} UTC`)
    let date3 = new Date(date4-120000)
    let meDate = new Date()
    let difference = (meDate - date3)/60000;
    /*console.log(props.isNewProperty)*/

    if(props.isNewProperty){
        const audio = new Audio(audioURL)
        audio.play()
    }

    // const [selected, setSelected] = useState(props.selected.indexOf(props.item.items.id) != -1);
    let selected = props.selected.indexOf(props.item.items.id) != -1;
    /*console.log(`${props.item.items.id} ${selected}`)*/

    return (

        <div className={`${props.item.is_watched ? classes.propertyWatched : classes.property} 
                        ${difference <= 20 && !props.item.is_watched ? `${classes.newProperty} animateBG` : ""}
                        ${selected ? classes.selectedProperty : ""}`}>
            {difference <= 20 && !props.item.is_watched &&
                <div className={"newPropertyText"}>
                    НОВОЕ
                </div>
            }

            {props.selecting &&
                <div className={"selectingInner"}>
                    <input className={classes.selectingInput} type="checkbox" onChange={(e)=>{
                        if(selected){
                            props.removeFromSelected(props.item.items.id)
                        }else{
                            props.addToSelected(props.item.items.id)
                        }
                        selected = !selected
                    }} name="selecting" id={props.item.items.id}
                    checked={selected}/>
                </div>
            }

            <NavLink to={`/propertyPage/${props.item.items.id}`} className={classes.imgs}>
                {props.item.items.image_link !== null &&
                    <img className={classes.img} src={props.item.items.image_link}/>
                }
                {props.item.items.image_link === null &&
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
                        {!props.jobWithClient ?
                            <span>Цена: {props.item.items.price}₽ {props.item.items.offer_type === "1" && <span>в месяц</span>}</span>:
                            <span>Цена: {Math.round(((props.percentage)/100+1)*(props.item.items.price)+props.surcharge)}₽ {props.item.items.offer_type === "1" && <span>в месяц</span>}</span>
                        }

                        <br/>
                        {!props.jobWithClient &&
                            <span>Источник: {props.item.items.host} <a target="_blank" className={classes.link}  href={props.item.items.link}>Посетить</a></span>
                        }
                    </div>
                </div>
                {!props.jobWithClient &&
                <div className={classes.phoneNumber}>
                    <div className={classes.phoneNumberTitle}>Номер телефона:</div>
                    {props.item.items.phone !== null && props.item.items.phone !== 0 &&
                    <a href={`tel:+${props.item.items.phone}`} className={classes.phone}>+{props.item.items.phone}</a>
                    }
                    {props.item.items.phone === null &&
                    <div className={classes.phone}>Добавляется в базу.</div>
                    }
                    {props.item.items.phone === 0 &&
                    <div className={classes.phone}>Уточняйте в первоисточнике.</div>
                    }

                    {/*<div className={classes.phoneNumberShow}>Смотреть</div>*/}
                </div>
                }

                <div className={classes.dateInner}>
                    <Moment locale={"ru"} fromNow={true}>{date3.toString()}</Moment>
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