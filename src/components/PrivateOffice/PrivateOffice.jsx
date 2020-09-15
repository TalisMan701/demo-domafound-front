import React, {useEffect, useState} from "react";
import classes from "./PrivateOffice.module.css";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import {getIgnoreList} from "../../redux/findProperty-reducer";
import {setCommission, setJobWithClient} from "../../redux/auth-reducer";
import {authAPI} from "../../api/api";
import closeIcon from "../FindProperty/Property/close.svg";
import preloader from "../../common/Preloader/Preloader.svg";

function PrivateOffice(props) {

    const [isSetCommission, setIsSetCommission] = useState(false)
    const [isFetching, setIsFetching] = useState(false)
    const [percentage, setPercentage] = useState(props.percentage)
    const [surcharge, setSurcharge] = useState(props.surcharge)

    useEffect(()=>{
        setPercentage(props.percentage)
        setSurcharge(props.surcharge)
    },[props])

    const saveCommission = () =>{
        setIsFetching(true)
        authAPI.setCommission(percentage, surcharge)
            .then(response =>{
                props.setCommission(percentage,surcharge)
                setIsFetching(false)
                setIsSetCommission(false)
            })
    }

    return (
        <div className={classes.privateOffice}>
            <div className={classes.container}>
                <div className={classes.officeInnner}>
                    <div className={classes.title}>Личный кабинет</div>
                    <div className={classes.userInfo}>
                        <div className={classes.phone}>Номер: <span>{props.number}</span></div>
                        <div className={classes.email}>Email: <span>{props.email}</span></div>
                        <div className={classes.subscription}>
                            {props.isSubscription &&
                            <div className={classes.countDaysInner}>
                                <div className={classes.countDays}>
                                    Осталось дней: <span>{props.countDays}</span>
                                    <br/>
                                    Осталось часов: <span>{props.countHours}</span>
                                </div>
                                <NavLink className={classes.buySubscription} to="/tariffs">Продлить</NavLink>
                            </div>
                            }
                            {!props.isSubscription &&
                            <NavLink to='/tariffs' className={classes.buySubscription}>Приобрести тариф</NavLink>
                            }
                        </div>
                        {isFetching ?
                            <div className={classes.preloaderInner}>
                                <img src={preloader} className={classes.preloader}/>
                            </div> :
                            <div className={classes.commissionInner}>
                                <div className={classes.displayFlexWithRow}>
                                    <div className={classes.percentageInner}>
                                        <div className={classes.commissionText}>Ваш процент</div>
                                        {!isSetCommission ?
                                            <div className={classes.commissionText}>{props.percentage}%</div> :
                                            <div className={classes.displayFlexWithRow}>
                                                <input type="number" id="percentageCount"
                                                       name="percentageCount" min="0"
                                                       onChange={(e) => setPercentage(e.target.valueAsNumber)}
                                                       value={percentage}
                                                       placeholder={props.percentage}
                                                       className={classes.commissionInput}
                                                />
                                                <span>%</span>
                                            </div>
                                        }
                                    </div>
                                    <div className={classes.surchargeInner}>
                                        <div className={classes.commissionText}>Ваша наценка</div>
                                        {!isSetCommission ?
                                            <div className={classes.commissionText}>{props.surcharge}₽</div> :
                                            <div className={classes.displayFlexWithRow}>
                                                <input type="number" id="surchargeCount"
                                                       name="surchargeCount" min="0"
                                                       onChange={(e) => setSurcharge(e.target.valueAsNumber)}
                                                       value={surcharge}
                                                       placeholder={props.surcharge}
                                                       className={classes.commissionInput}
                                                />
                                                <span>₽</span>
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div className={classes.commissionBtns}>
                                    {!isSetCommission ?
                                        <div className={classes.commissionBtn}
                                             onClick={() => setIsSetCommission(true)}>Изменить</div> :
                                        <div className={classes.displayFlexWithRow}>
                                            <div className={classes.commissionBtn}
                                                 onClick={saveCommission}>Сохранить
                                            </div>
                                            <img onClick={() => setIsSetCommission(false)} className={classes.closeIcon}
                                                 src={closeIcon} alt="Отменить"/>
                                        </div>
                                    }
                                </div>
                            </div>
                        }
                        <div className={classes.referralsInner}>
                            <div className={classes.referralsCodeInner}>
                                <div>Промокод:</div>
                                {props.isPartner &&
                                <div className={classes.referralsCode}>{props.referralCode}</div>
                                }
                                {!props.isPartner &&
                                <div className={classes.referralsCode}>нет</div>
                                }
                            </div>
                            {!props.isPartner &&
                            <div>Чтобы получить промокод, продлите подписку до 31 дня.</div>
                            }
                            {props.isPartner &&
                            <div>
                                <div className={classes.referrals}>Мои
                                    рефералы: <span>{props.user_set.length}</span></div>
                                {props.user_set.map(u => <div>{u.phone} дней: {u.subscribe_days_count}</div>)}
                            </div>
                            }
                        </div>
                    </div>
                    <div className={classes.btns}>
                        <NavLink to='/find_property/favorite_list'
                                 className={`${classes.btnFavorites} ${classes.btn}`}>
                            <div className={classes.btnText}>Избранные</div>
                        </NavLink>
                        {/*<NavLink to='/find_property/ignore_list'  className={`${classes.btnBlackList} ${classes.btn}`}>Игнорированные</NavLink>*/}
                    </div>
                    <div className={classes.settingsWrapper}>
                        <div className={classes.jobWithClientInner}>
                            <div className={classes.jobWithClient}>
                                <label htmlFor="jobWithClient">Работа с клиентом</label>
                                <input onChange={(e) => {
                                    props.setJobWithClient(!props.jobWithClient)
                                }} defaultChecked={props.jobWithClient} type="checkbox" name="jobWithClient"
                                       id="jobWithClient"/>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    number: state.auth.number,
    email: state.auth.email,
    countDays: state.auth.countDays,
    referralsCount: state.auth.referralsCount,
    isSubscription: state.auth.isSubscription,
    countHours: state.auth.countHours,
    isPartner: state.auth.isPartner,
    referralCode: state.auth.referralCode,
    user_set: state.auth.user_set,
    jobWithClient: state.auth.jobWithClient,
    percentage: state.auth.percentage,
    surcharge: state.auth.surcharge
})

export default connect(mapStateToProps, {getIgnoreList, setJobWithClient, setCommission})(PrivateOffice);