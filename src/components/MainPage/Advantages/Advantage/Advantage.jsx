import React from "react";
import classes from "./Advantage.module.css";

const Advantage = (props) =>{
    return(
        <div className={classes.advantage}>
            <div className={classes.icon}>
                <img src={props.icon} alt="icon"/>
            </div>
            <div className={classes.title}>{props.title}</div>
            <div className={classes.text}>{props.text}</div>
        </div>
    )}

export default Advantage;