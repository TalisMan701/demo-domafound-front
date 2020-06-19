import React from "react";
import classes from "./PrivateOffice.module.css";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";

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
                                        <div className={classes.countDays}>Осталось дней: <span>{this.props.countDays}</span></div>
                                        <NavLink className={classes.buySubscription} to="/tariffs">Продлить</NavLink>
                                    </div>
                                }
                                {!this.props.isSubscription &&
                                <NavLink to='/tariffs' className={classes.buySubscription}>Приобрести тариф</NavLink>
                                }
                            </div>
                            <div className={classes.referrals}>Мои рефералы: <span>{this.props.referralsCount}</span></div>
                        </div>
                        <div className={classes.btns}>
                            <div className={`${classes.btnFavorites} ${classes.btn}`}>Избранные</div>
                            <div className={`${classes.btnBlackList} ${classes.btn}`}>Игнорированные</div>
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
    isSubscription: state.auth.isSubscription
})

export default connect(mapStateToProps,{})(PrivateOffice);