import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = "SET_USER_DATA";

let initialState = {
    userId: null,
    email: null,
    number: null,
    isAuth: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data
            }
        default:
            return state;
    }
}

const setAuthUserData = (userId, email, number, isAuth) => ({type: SET_USER_DATA, data:
        {userId, email, number, isAuth}});

export const getAuthUserData = () => (dispatch) => {
    authAPI.me()
        .then(response => {
            if(response.status === 200){
                dispatch(setAuthUserData(
                    response.data.id,
                    response.data.email,
                    response.data.phone,
                    true));
            }
        });
}

export const login = (number, password) => (dispatch) =>{
    authAPI.login(number, password)
        .then(response => {
            console.log(response)
            localStorage.setItem("token", response.data.token);
            dispatch(getAuthUserData())
        }).catch( (error) => {
            if(error.response.data.detail) {
                let message = error.response.data.detail[0].length > 0 ? error.response.data.detail[0] : "Some error";
                dispatch(stopSubmit("login", {_error: message}));
            } else{
                let message = error.response.data.error.length > 0 ? error.response.data.error : "Some error";
                dispatch(stopSubmit("login", {_error: message}));
            }
    })
}

export const logout = () => (dispatch) =>{
    authAPI.logout()
        .then(response => {
            if(response.status === 204) {
                localStorage.removeItem("token");
                dispatch(setAuthUserData(null, null,null, false))
            }
        });
}

export default authReducer;