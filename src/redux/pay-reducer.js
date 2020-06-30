import {authAPI} from "../api/api";

const SET_USER_DATA = "SET_USER_DATA";
const TOGGLE_IS_FETCHING_AUTH = "TOGGLE_IS_FETCHING_AUTH"


let initialState = {
    days: 0
};

const payReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}


const toggleIsFetchingAuth = (isFetchingAuth) => ({type: TOGGLE_IS_FETCHING_AUTH, isFetchingAuth })


export default payReducer;