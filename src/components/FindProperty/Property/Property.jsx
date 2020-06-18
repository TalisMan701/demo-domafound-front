import React from "react";
import classes from "./Property.module.css";

const Property = (props) => {
    return (
        <div className={classes.property}>
            <div className={classes.imgs}>
                <img className={classes.img} src="https://api.interior.ru/media/images/setka/2020_02_12/VladaSteblina_kvartira_dlya_sebya_1_1920_full.jpg" alt="img"/>
            </div>
            <div className={classes.content}>
                <div className={classes.title}>Квартира</div>
                <div className={classes.description}>
                    <div className={classes.descriptionTitle}>Описание</div>
                    <div className={classes.descriptionText}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur omnis saepe velit?</div>
                </div>
                <div className={classes.phoneNumber}>
                    <div className={classes.phoneNumberTitle}>Номер телефона</div>
                    <div className={classes.phone}>+7-992-007-71-62</div>
                    <div className={classes.phoneNumberShow}>Смотреть</div>
                </div>
                <div className={classes.btns}>
                    <div className={`${classes.btnAddToFavorites} ${classes.btn}`}>Избранное</div>
                    <div className={`${classes.btnAddToBlackList} ${classes.btn}`}>Игнорировать</div>
                </div>
            </div>
        </div>
    )
}

export default Property;