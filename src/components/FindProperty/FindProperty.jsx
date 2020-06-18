import React from "react";
import classes from "./FindProperty.module.css";
import Property from "./Property/Property";
import NumberFormat from 'react-number-format';

const FindProperty = (props) =>{
    return(
        <div className={classes.findProperty}>
            <div className={classes.container}>
                <Property/>
                <NumberFormat format="+7-(###)-###-##-##" mask="_"/>
            </div>
        </div>
    )
}

export default FindProperty;