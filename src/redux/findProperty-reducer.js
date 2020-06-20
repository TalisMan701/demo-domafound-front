import {authAPI, findPropertyAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const SET_PROPERTY = "SET_PROPERTY";
const SET_TOTAL_PROPERTY_COUNT = "SET_TOTAL_PROPERTY_COUNT";
const REMOVE_FROM_PROPERTY = "REMOVE_FROM_PROPERTY";
const SET_IGNORE_LIST = "SET_IGNORE_LIST";
const REMOVE_FROM_IGNORE_PROPERTY = "REMOVE_FROM_IGNORE_PROPERTY";
const SET_IS_NEXT = "SET_IS_NEXT";
const DELETE_PROPERTY_STATE = "DELETE_PROPERTY_STATE";


let initialState = {
    property: [],
    ignoreList:[],
    pageSize: 5,
    totalPropertyCount: 0,
    isNext: null,
    page: 1,
    isFetching: true
};

const foundPropertyReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PROPERTY:
            return {
                ...state,
                page: state.page+1,
                property: [...state.property, ...action.property]
            }
        case SET_IGNORE_LIST:{
            return {
                ...state,
                ignoreList: action.ignoreList
            }
        }
        case SET_TOTAL_PROPERTY_COUNT:
            return {
                ...state,
                totalPropertyCount: action.count
            }
        case SET_IS_NEXT:{
            return {
                ...state,
                isNext: action.isNext
            }
        }
        case REMOVE_FROM_PROPERTY:{
            return {
                ...state,
                property: state.property.filter(e => e.items.id !== action.house_id)
            }
        }
        case REMOVE_FROM_IGNORE_PROPERTY:{
            return {
                ...state,
                ignoreList: state.ignoreList.filter(e => e.id !== action.house_id)
            }
        }
        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching}
        }
        case DELETE_PROPERTY_STATE:{
            return {
                ...initialState
            }
        }
        default:
            return state;
    }
}
export const setProperty = (property) => ({type: SET_PROPERTY, property })
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching })
export const setTotalPropertyCount = (totalPropertyCount) => ({type: SET_TOTAL_PROPERTY_COUNT, count: totalPropertyCount })
export const setIsNext = (isNext) => ({type: SET_IS_NEXT, isNext })
export const deletePropertyState = () => ({type: DELETE_PROPERTY_STATE})

export const setIgnoreList = (ignoreList) => ({type: SET_IGNORE_LIST, ignoreList })
export const removeFromProperty = (house_id) => ({type: REMOVE_FROM_PROPERTY, house_id})
export const removeFromIgnoreProperty = (house_id) => ({type: REMOVE_FROM_IGNORE_PROPERTY, house_id})

export const getProperty = (pageSize, page) => {
    return (dispatch) => {
        findPropertyAPI.getBase(pageSize, page)
            .then(data => {
                dispatch(setProperty(data.data.results));
                dispatch(setTotalPropertyCount(data.data.count));
                dispatch(setIsNext(data.data.next));
        });
    }
}

export const getIgnoreList = () => {
    return (dispatch) => {
        findPropertyAPI.getIgnoreList()
            .then(data => {
            if (data.data.status === true){
                dispatch(setIgnoreList(data.data.items.ignore_list));
            }
        });
    }
}

export const setToIgnoreList = (house_id) => {
    return (dispatch) => {
        findPropertyAPI.setToIgnoreList(house_id)
            .then(data => {
            if (data.data.status === true){
                dispatch(removeFromProperty(house_id));
            }
        });
    }
}

export const removeToIgnoreList = (house_id) => {
    return (dispatch) => {
        findPropertyAPI.removeToIgnoreList(house_id)
            .then(data => {
            if (data.data.status === true){
                dispatch(removeFromIgnoreProperty(house_id));
            }
        });
    }
}


export default foundPropertyReducer;