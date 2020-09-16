import React from "react";
import classes from "./PropertyForClientOne.module.css"
import {NavLink} from "react-router-dom";

const PropertyForClientOne = (props) =>{
    return(
        <div className={classes.property}>
            <NavLink to={`/propertyClientPage/${props.item.id}`} className={classes.imgs}>
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
                <NavLink to={`/propertyClientPage/${props.item.id}`} className={classes.title}>{props.item.title}</NavLink>
                <div className={classes.description}>
                    <div className={classes.descriptionTitle}>Описание</div>
                    <div className={classes.descriptionText}>
                        Адресс: {props.item.address},
                        <br/>
                        Цена: {Math.round(((props.percentage)/100+1)*(props.item.price)+props.surcharge)}₽ {props.item.offer_type === "1" && <span>в месяц</span>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PropertyForClientOne;