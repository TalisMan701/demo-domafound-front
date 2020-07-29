import {findPropertyAPI} from "../api/api";
import {setToWatchedList} from "./findProperty-reducer";


const SET_PROPERTY_ONE = "SET_PROPERTY_ONE";
const TOGGLE_IS_FETCHING_ONE_PAGE = 'TOGGLE_IS_FETCHING_ONE_PAGE';
const TOGGLE_IS_FETCHING_JKH_INFO = 'TOGGLE_IS_FETCHING_JKH_INFO';
const ADD_TO_FAVORITE_LIST = "ADD_TO_FAVORITE_LIST";
const REMOVE_FROM_FAVORITE_LIST = "REMOVE_FROM_FAVORITE_LIST";
const SET_JKH_INFO = "SET_JKH_INFO";

let initialState = {
    property: [],
    jkhInfo: null,
    isFetchingOnePage: true,
    isFetchingJkhInfo: true,
};

const propertyReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PROPERTY_ONE:
            return {
                ...state,
                property: action.property
            }
        case TOGGLE_IS_FETCHING_ONE_PAGE: {
            return { ...state, isFetchingOnePage: action.isFetchingOnePage}
        }
        case TOGGLE_IS_FETCHING_JKH_INFO: {
            return { ...state, isFetchingOnePage: action.isFetchingOnePage}
        }
        case ADD_TO_FAVORITE_LIST:{
            return {
                ...state,
                property: {
                    ...state.property,
                    is_fav: true
                }
            }
        }
        case REMOVE_FROM_FAVORITE_LIST:{
            return {
                ...state,
                property: {
                    ...state.property,
                    is_fav: false
                }
            }
        }
        case SET_JKH_INFO: {
            return {
                ...state,
                jkhInfo: action.jkhInfo
            }
        }
        default:
            return state;
    }
}
const setPropertyOne = (property) => ({type: SET_PROPERTY_ONE, property});
export const setJkhInfo = (jkhInfo) => ({type: SET_JKH_INFO, jkhInfo});

const toggleIsFetching = (isFetchingOnePage) => ({type: TOGGLE_IS_FETCHING_ONE_PAGE, isFetchingOnePage })
const toggleIsFetchingJkhInfo = (isFetchingJkhInfo) => ({type: TOGGLE_IS_FETCHING_JKH_INFO, isFetchingJkhInfo })

const addToFavoriteList = (house_id) => ({type: ADD_TO_FAVORITE_LIST, house_id })
const removeFromFavoriteList = (house_id) => ({type: REMOVE_FROM_FAVORITE_LIST, house_id })

export const getPropertyOne = (id) => (dispatch) => {
    dispatch(toggleIsFetching(true));
    /*dispatch(toggleIsFetchingJkhInfo(true));*/

    findPropertyAPI.getHouse(id)
        .then(response => {
            if(response.status === 200){
                findPropertyAPI.getJKH(id)
                    .then(responseJkh => {
                        if(responseJkh.data.status === true){
                            dispatch(setJkhInfo(responseJkh.data.data));
                        }else{
                            dispatch(setJkhInfo({none:"отсутствуют данные с портала ЖКХ"}));
                        }
                        /*dispatch(toggleIsFetchingJkhInfo(false));*/
                    })
                dispatch(setPropertyOne(response.data));
                dispatch(toggleIsFetching(false));
                if(!response.data.is_watch){
                    dispatch(setToWatchedList(id))
                }
            }
        });
}

export const setToFavoriteListPropertyPage = (house_id) => {
    return (dispatch) => {
        findPropertyAPI.setToFavoriteList(house_id)
            .then(data => {
                if (data.data.status === true){
                    dispatch(addToFavoriteList(house_id));
                }
            });
    }
}

export const removeToFavoriteListPropertyPage = (house_id) => {
    return (dispatch) => {
        findPropertyAPI.removeToFavoriteList(house_id)
            .then(data => {
                if (data.data.status === true){
                    dispatch(removeFromFavoriteList(house_id));
                }
            });
    }
}

export default propertyReducer;