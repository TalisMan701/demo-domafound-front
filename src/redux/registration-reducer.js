import {authAPI, registrationAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_PHONE = "SET_USER_PHONE";
const SET_USER_OTP = "SET_USER_OTP";
const SET_USER_FINAL = "SET_USER_FINAL";
const SET_IS_REGISTERED = "SET_IS_REGISTERED";
const END_REGISTRATION = "END_REGISTRATION";

let initialState = {
    number: null,
    validatePhone: false,
    validateOTP: false,
    isRegistrated: false
};

const registrationReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_PHONE:

            return {
                ...state,
                ...action.data
            }
        case SET_USER_OTP:
            return {
                ...state,
                validateOTP: true
            }
        case SET_IS_REGISTERED:
            return {
                ...state,
                isRegistrated: true
            }
        /*        case END_REGISTRATION:{
                    return {
                        ...state,
                        isRegistrated: false
                    }
                }*/
        case SET_USER_FINAL:
            return {
                ...initialState
            }
        default:
            return state;
    }
}

const setUserPhone = (number, validatePhone) => ({type: SET_USER_PHONE, data: {number, validatePhone}});

export const registrationValidatePhone = (number) => (dispatch) => {
    registrationAPI.validatePhone(number)
        .then(response => {
            if (response.data.status === true) {
                dispatch(setUserPhone(number, true))
            } else {
                let message = response.data.detail.length > 0 ? response.data.detail : "Some error";
                dispatch(stopSubmit("registrationValidatePhone", {_error: message}));
            }
        })
}

export const registrationValidatePhoneResend = (number) => (dispatch) => {
    registrationAPI.validatePhone(number)
        .then(response => {
            if (response.data.status === true) {
                dispatch(setUserPhone(number, true))
            } else {
                let message = response.data.detail.length > 0 ? response.data.detail : "Some error";
                dispatch(stopSubmit("registrationValidatePhone", {_error: message}));
            }
        })
}

const setUserOTP = () => ({type: SET_USER_OTP})

export const registrationValidateOTP = (code, number) => (dispatch) => {
    registrationAPI.validateOTP(code, number)
        .then(response => {
            if (response.data.status === true) {
                dispatch(setUserOTP())
            } else {
                let message = response.data.detail.length > 0 ? response.data.detail : "Some error";
                dispatch(stopSubmit("registrationValidateOTP", {_error: message}));
            }
        })
}

const setIsRegistred = () => ({type: SET_IS_REGISTERED})

/*export const endRegistration = () => ({type:END_REGISTRATION})*/

export const setUserFinal = () => ({type: SET_USER_FINAL})

export const registration = (email, number, password, ref_code) => (dispatch) => {
    registrationAPI.registration(email, number, password, ref_code)
        .then(response => {
            if (response.data.status === true) {
                dispatch(setIsRegistred())
            }
        }).catch((error) => {
        let message = error.response.data.email[0].length > 0 ? error.response.data.email[0] : "Some error";
        dispatch(stopSubmit("registration", {_error: message}));
    })
}


export default registrationReducer;