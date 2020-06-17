import React from "react";
import classes from "./Tariffs.module.css"

const Tariffs = () =>{
    return(
        <div className={classes.container}>
            <div className={classes.tariffs}>
                <div className={classes.cardsRow}>
                    <div className={classes.card}>
                        <div className={classes.days}>
                            <div className={classes.daysCount}>7</div>
                            <div className={classes.daysText}>дней</div>
                        </div>
                        <div className={classes.price}>700₽</div>
                        <div className={classes.button}>
                            <div className={classes.buttonText}>
                                Купить
                            </div>
                        </div>
                    </div>
                    <div className={classes.card}>
                        <div className={classes.days}>
                            <div className={classes.daysCount}>14</div>
                            <div className={classes.daysText}>дней</div>
                        </div>
                        <div className={classes.price}>1300₽</div>
                        <div className={classes.button}>
                            <div className={classes.buttonText}>
                                Купить
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classes.cardsRow}>
                    <div className={classes.card}>
                        <div className={classes.days}>
                            <div className={classes.daysCount}>21</div>
                            <div className={classes.daysText}>дней</div>
                        </div>
                        <div className={classes.price}>1900₽</div>
                        <div className={classes.button}>
                            <div className={classes.buttonText}>
                                Купить
                            </div>
                        </div>
                    </div>
                    <div className={classes.card}>
                        <div className={classes.days}>
                            <div className={classes.daysCount}>31</div>
                            <div className={classes.daysText}>дней</div>
                        </div>
                        <div className={classes.price}>2500₽</div>
                        <div className={classes.button}>
                            <div className={classes.buttonText}>
                                Купить
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tariffs;