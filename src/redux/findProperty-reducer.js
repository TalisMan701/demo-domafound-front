import {authAPI, findPropertyAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const SET_PROPERTY = "SET_PROPERTY";
const SET_TOTAL_PROPERTY_COUNT = "SET_TOTAL_PROPERTY_COUNT";


let initialState = {
    property: [],
    pageSize: 10,
    totalPropertyCount: 0,
    currentPage: 1,
    isFetching: true
};

const foundPropertyReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PROPERTY:
            return {
                ...state,
                property: action.property
            }
        case SET_TOTAL_PROPERTY_COUNT:
            return {
                ...state,
                totalPropertyCount: action.count
            }
        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching}
        }
        default:
            return state;
    }
}
export const setProperty = (property) => ({type: SET_PROPERTY, property })
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching })
export const setTotalPropertyCount = (totalPropertyCount) => ({type: SET_TOTAL_PROPERTY_COUNT, count: totalPropertyCount })

export const getProperty = () => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true));

        findPropertyAPI.getBase().then(data => {
            dispatch(toggleIsFetching(false));
            dispatch(setProperty(data.data));
            /*dispatch(setTotalUsersCount(data.totalCount));*/
        });
    }
}

export default foundPropertyReducer;