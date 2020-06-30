import React from "react";
import classes from "./FormsControls.module.css";
import triangle from "./triangle.svg";
import NumberFormat from 'react-number-format';

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

export const InputNumber = ({input, meta, ...props}) => {

    const hasError = meta.touched && meta.error;

    return(
        <div className={classes.formControl + " " + (hasError ? classes.error : "")}>
            <div className={classes.inputInner}>
                {/*<input className={classes.input} {...input} {...props} />*/}
                <NumberFormat format="+7-(###)-###-##-##" mask="_" className={classes.input} {...input} {...props}/>
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

export const Checkbox = ({input, meta, ...props}) => {
    return(
        <div className={classes.checkboxInner}>
            <input className={classes.checkboxCustom} {...input} {...props} />
            <label className={classes.label} for={props.id}><div>{props.title}</div></label>
        </div>
    )
}

export const InputForFilters = ({input, meta, ...props}) => {
    return(
            <div className={classes.inputInner}>
                <input className={classes.inputForFilters} {...input} {...props} />
            </div>
    )
}