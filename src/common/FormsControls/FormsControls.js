import React from "react";
import classes from "./FormsControls.module.css";
import triangle from "./triangle.svg";

export const Input = ({input, meta, ...props}) => {

    const hasError = meta.touched && meta.error;

    return(
        <div className={classes.formControl + " " + (hasError ? classes.error : "")}>
            <div className={classes.inputInner}>
                <input className={classes.input} {...input} {...props} />
                { hasError && <div className={classes.errorInner}>
                    <div className={classes.errorText}>
                        { meta.error }
                    </div>
                    <img className={classes.errorInnerTriangle} src={triangle} alt="triangle"/>
                </div> }
            </div>
        </div>
    )
}