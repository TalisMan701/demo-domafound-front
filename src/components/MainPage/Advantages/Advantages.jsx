import React from "react";
import classes from "./Advantages.module.css";
import Advantage from "./Advantage/Advantage";
import driverIcon from "./Advantage/driver.svg"
import referralIcon from "./Advantage/referral.svg"
import discountIcon from "./Advantage/discount.svg"

const Advantages = () =>{
    let title1 = "Тест драйв";
    let text1 = "Предоставляем возможность опробовать все услуги в течении 3 часов с момента регистрации.";
    let title2 = "Реферальная система";
    let text2 = "Приведи клиента – получи бонусное время пользования на свой аккаунт.";
    let title3 = "Скидки на тарифы";
    let text3 = "Чем дольше тарифный план – тем больше скидка на его покупку.";


    return(
        <div className={classes.advantages}>
            <div className={classes.container}>
                <Advantage icon={driverIcon} title={title1} text={text1}></Advantage>
                <Advantage icon={referralIcon} title={title2} text={text2}></Advantage>
                <Advantage icon={discountIcon} title={title3} text={text3}></Advantage>
            </div>
        </div>
    )}

export default Advantages;