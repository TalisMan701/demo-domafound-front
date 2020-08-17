import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = "SET_USER_DATA";
const SET_NUMBER = "SET_NUMBER";
const SET_VALIDATE_PHONE = "SET_VALIDATE_PHONE";
const SET_VALIDATE_OTP = "SET_VALIDATE_OTP";
const SET_IS_RESET_PASSWORD = "SET_IS_RESET_PASSWORD";
const TOGGLE_IS_FETCHING_AUTH = "TOGGLE_IS_FETCHING_AUTH";
const SET_AUTHORIZATION = "SET_AUTHORIZATION";
const SET_ONLINE_COUNT = "SET_ONLINE_COUNT"

let initialState = {
    userId: null,
    email: null,
    number: null,
    referralsCount: 0,
    countDays: null,
    isSubscription: false,
    isAuth: false,
    countHours: 0,
    isPartner: false,
    referralCode: 0,
    user_set:[],
    isFetchingAuth: true,
    authorization: false,
    isResetPassword: false,
    validatePhone: false,
    validateOTP: false,
    onlineCount: 0,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data
            }
        case TOGGLE_IS_FETCHING_AUTH:{
            return {
                ...state,
                isFetchingAuth: action.isFetchingAuth
            }
        }
        case SET_IS_RESET_PASSWORD:{
            return {
                ...state,
                isResetPassword: action.isResetPassword
            }
        }
        case SET_VALIDATE_PHONE:{
            return {
                ...state,
                validatePhone: action.validatePhone
            }
        }
        case SET_VALIDATE_OTP:{
            return {
                ...state,
                validateOTP: action.validateOTP
            }
        }
        case SET_NUMBER:{
            return {
                ...state,
                number: action.number
            }
        }
        case SET_AUTHORIZATION:{
            return {
                ...state,
                authorization: action.authorization
            }
        }
        case SET_ONLINE_COUNT:{
            return {
                ...state,
                onlineCount: action.onlineCount
            }
        }
        default:
            return state;
    }
}

const setAuthUserData = (userId, email, number, isSubscription, countDays, countHours, isPartner, referralCode, user_set, isAuth) => ({type: SET_USER_DATA, data:
        {userId, email, number, isSubscription, countDays, countHours, isPartner, referralCode, user_set, isAuth}});

const toggleIsFetchingAuth = (isFetchingAuth) => ({type: TOGGLE_IS_FETCHING_AUTH, isFetchingAuth })

export const setIsResetPassword = (isResetPassword) => ({type: SET_IS_RESET_PASSWORD, isResetPassword})
const setValidatePhone = (validatePhone) => ({type: SET_VALIDATE_PHONE, validatePhone})
const setNumber = (number) => ({type: SET_NUMBER, number})
const setValidateOTP = (validateOTP) => ({type: SET_VALIDATE_OTP, validateOTP})

const setOnlineCount = (onlineCount) => ({type: SET_ONLINE_COUNT, onlineCount})

const setAuthorization = (authorization) => ({type: SET_AUTHORIZATION, authorization})

export const getAuthUserData = () => (dispatch) => {
    dispatch(toggleIsFetchingAuth(true))
    authAPI.me()
        .then(response => {
            if(response.status === 200){
                dispatch(setAuthUserData(
                    response.data.user.id,
                    response.data.user.email,
                    response.data.user.phone,
                    response.data.user.is_subscribe,
                    response.data.user.subscribe_days_count,
                    response.data.user.subscribe_hours_count,
                    response.data.user.is_partner,
                    response.data.user.referral_code,
                    response.data.user.user_set,
                    true,
                    ));
                dispatch(setOnlineCount(response.data.online_count))
                dispatch(toggleIsFetchingAuth(false))
            }
        }).catch( (error) => {
        dispatch(toggleIsFetchingAuth(false))
    });
}

export const login = (number, password) => (dispatch) =>{
    dispatch(setAuthorization(true))
    authAPI.login(number, password)
        .then(response => {
            console.log(response)
            localStorage.setItem("token", response.data.token);
            dispatch(getAuthUserData())
            dispatch(setAuthorization(false))
        }).catch( (error) => {
            dispatch(setAuthorization(false))
            if(error.response.data.detail) {
                let message = error.response.data.detail[0].length > 0 ? error.response.data.detail[0] : "Some error";
                dispatch(stopSubmit("login", {_error: message}));
            } else{
                let message = error.response.data.error.length > 0 ? "Вход был выполнен на другом устройстве" : "Some error";
                dispatch(stopSubmit("login", {_error: message}));
            }
    })
}

export const logout = () => (dispatch) =>{
    authAPI.logout()
        .then(response => {
            if(response.status === 204) {
                localStorage.removeItem("token");
                localStorage.removeItem("filters");
                localStorage.removeItem("polygon");
                localStorage.removeItem("filtersForFind");
                dispatch(setAuthUserData(null, null,null, false))
            }
        });
}

export const validatePhoneLogin = (number) => (dispatch) =>{
    authAPI.validatePhone(number)
        .then(response => {
            if(response.status === 200) {
                dispatch(setValidatePhone(true))
                dispatch(setNumber(number))
            }else{
                let message = "Ошибка со стороны сервера"
                dispatch(stopSubmit("validatePhoneLogin", {_error: message}))
            }
        }).catch( (error) => {
        let message = "Ошибка со стороны сервера"
        dispatch(stopSubmit("validatePhoneLogin", {_error: message}))
    });
}

export const validateOTPLogin = (code, number) => (dispatch) =>{
    authAPI.validateOTP(code, number)
        .then(response => {
            if(response.status === 200) {
                dispatch(setValidateOTP(true))
            }else{
                let message = "Ошибка со стороны сервера"
                dispatch(stopSubmit("validateOTPLogin", {_error: message}))
            }
        }).catch( (error) => {
        let message = "Ошибка со стороны сервера"
        dispatch(stopSubmit("validateOTPLogin", {_error: message}))
    });
}

export const resetPassword = (number, password, passwordNew) => (dispatch) =>{
    if(password == passwordNew){
        authAPI.resetPassword(number,password)
            .then(response => {
                console.log(response.status)
                if(response.status === 200) {
                    dispatch(setIsResetPassword(false))
                }else{
                    let message = "Ошибка со стороны сервера"
                    dispatch(stopSubmit("resetPassword", {_error: message}))
                }
            }).catch( (error) => {
            let message = "Ошибка со стороны сервера"
            dispatch(stopSubmit("resetPassword", {_error: message}))
        });
    }else{
        let message = "Пароли не совпадают! Попробуйте ещё раз"
        dispatch(stopSubmit("resetPassword", {_error: message}))
    }

}

export default authReducer;