import React from "react";
import classes from "./Registration.module.css";
import arrow from "./down-arrow.svg"
import {Link} from "react-router-dom";
import {connect} from "react-redux";

const Registration = (props) => {
    if(props.isAuth){
        return <div></div>
    }
    return (
        <div id="testScroll" className={classes.registration}>
            <div className={classes.container}>
                <div className={classes.text}>
                    Получи пробный период на 3 часа и убедись в нашей правоте!
                </div>
                <img className={classes.arrow} src={arrow} alt="arrow"/>
            </div>
            <div className={classes.buttonInner}>
                <Link to="/registration" className={classes.button}>
                    <div className={classes.button__text}>
                        Регистрация
                    </div>
                </Link>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuth:state.auth.isAuth
})

export default connect(mapStateToProps)(Registration);