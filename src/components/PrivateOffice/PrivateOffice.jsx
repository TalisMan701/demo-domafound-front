import React from "react";
import classes from "./PrivateOffice.module.css";
import {connect} from "react-redux";
import {NavLink, Redirect} from "react-router-dom";
import {getIgnoreList} from "../../redux/findProperty-reducer";
import FindProperty from "../FindProperty/FindProperty";
import {setJobWithClient} from "../../redux/auth-reducer";

class PrivateOffice extends React.Component {
    render() {

        return (
            <div className={classes.privateOffice}>
                <div className={classes.container}>
                    <div className={classes.officeInnner}>
                        <div className={classes.title}>Личный кабинет</div>
                        <div className={classes.userInfo}>
                            <div className={classes.phone}>Номер: <span>{this.props.number}</span></div>
                            <div className={classes.email}>Email: <span>{this.props.email}</span></div>
                            <div className={classes.subscription}>
                                {this.props.isSubscription &&
                                <div className={classes.countDaysInner}>
                                    <div className={classes.countDays}>
                                        Осталось дней: <span>{this.props.countDays}</span>
                                        <br/>
                                        Осталось часов: <span>{this.props.countHours}</span>
                                    </div>
                                    <NavLink className={classes.buySubscription} to="/tariffs">Продлить</NavLink>
                                </div>
                                }
                                {!this.props.isSubscription &&
                                <NavLink to='/tariffs' className={classes.buySubscription}>Приобрести тариф</NavLink>
                                }
                            </div>
                            <div className={classes.referralsInner}>
                                <div className={classes.referralsCodeInner}>
                                    <div>Промокод:</div>
                                    {this.props.isPartner &&
                                    <div className={classes.referralsCode}>{this.props.referralCode}</div>
                                    }
                                    {!this.props.isPartner &&
                                    <div className={classes.referralsCode}>нет</div>
                                    }
                                </div>
                                {!this.props.isPartner &&
                                <div>Чтобы получить промокод, продлите подписку до 31 дня.</div>
                                }
                                {this.props.isPartner &&
                                <div>
                                    <div className={classes.referrals}>Мои
                                        рефералы: <span>{this.props.user_set.length}</span></div>
                                    {this.props.user_set.map(u => <div>{u.phone} дней: {u.subscribe_days_count}</div>)}
                                </div>
                                }
                            </div>
                        </div>
                        <div className={classes.btns}>
                            <NavLink to='/find_property/favorite_list'
                                     className={`${classes.btnFavorites} ${classes.btn}`}><div className={classes.btnText}>Избранные</div></NavLink>
                            {/*<NavLink to='/find_property/ignore_list'  className={`${classes.btnBlackList} ${classes.btn}`}>Игнорированные</NavLink>*/}
                        </div>
                        <div className={classes.settingsWrapper}>
                            <div className={classes.jobWithClientInner}>
                                <div className={classes.jobWithClient}>
                                    <label htmlFor="jobWithClient">Работа с клиентом</label>
                                    <input onChange={(e) => {
                                        this.props.setJobWithClient(!this.props.jobWithClient)
                                    }} defaultChecked={this.props.jobWithClient} type="checkbox" name="jobWithClient"
                                           id="jobWithClient"/>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
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
    jobWithClient: state.auth.jobWithClient
})

export default connect(mapStateToProps, {getIgnoreList, setJobWithClient})(PrivateOffice);