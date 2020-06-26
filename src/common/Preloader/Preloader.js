import React from 'react';
import preloader from "./Preloader.svg";
import classes from "./Preloader.module.css";

let Preloader = (props) => {
    return <img src={preloader} className={classes.preloader} />
}

export default Preloader;