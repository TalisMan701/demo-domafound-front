import React from "react";
import classes from "./MainText.module.css";

const MainText = (props) =>{
    return(
        <div id={props.scrollPathId} className={classes.mainText}>
            <div className={classes.container}>
                <div className={classes.text}>
                    {props.text}
                </div>
            </div>
        </div>
    )}

export default MainText;