import React from "react";
import * as axios from "axios";
import {getAuthUserData, logout} from "../../../redux/auth-reducer";
import UserInfo from "./UserInfo";
import {connect} from "react-redux";
import {authAPI} from "../../../api/api";

class UserInfoContainer extends React.Component{
    render() {
        return(
            <UserInfo {...this.props}/>
        )
    };
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    number: state.auth.number,
    countDays: state.auth.countDays,
    isSubscription: state.auth.isSubscription,
    countHours: state.auth.countHours
});

export default connect(mapStateToProps, {getAuthUserData, logout})(UserInfoContainer);