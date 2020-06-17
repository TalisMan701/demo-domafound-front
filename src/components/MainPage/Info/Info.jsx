import React from "react";
import classes from "./Info.module.css";
import background from "./bg.jpg";
import {Parallax} from "react-parallax";
import arrow from "./down-arrow.svg";
import { Link } from "react-scroll";
import union from "./Union.png"


const Info = () =>{
    return(
        <Parallax className={classes.infoWrapper} bgImage={background} strength={600} blur={1}>
            <img className={classes.infoUnion} src={union} alt=""/>
            <div className={classes.info}>
                <div className={classes.container}>
                    <div className={classes.mainInfo}>
                        <div className={classes.mainText}>
                            Покупай
                            <br/>
                            <span>продавай зарабатывай</span>
                        </div>
                        <div className={classes.scrollLinks}>
                                <Link
                                    className={classes.scrollLinkItem}
                                    to="forRealtors"
                                    spy={true}
                                    smooth={true}
                                    offset={-60}
                                    duration= {500}
                                >
                                    Для риелторов
                                    <img src={arrow} alt="arrow"/>
                                </Link>
                            <Link
                                className={classes.scrollLinkItem}
                                to="forAppraisers"
                                spy={true}
                                smooth={true}
                                offset={-60}
                                duration= {500}
                            >
                                Для оценщиков
                                <img src={arrow} alt="arrow"/>
                            </Link>
                        </div>
                        <div className={classes.start}></div>
                    </div>
                </div>
            </div>
        </Parallax>
    )}

export default Info;