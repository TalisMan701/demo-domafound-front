import {findPropertyAPI} from "../api/api";


const SET_PROPERTY_ONE = "SET_PROPERTY_ONE";
const TOGGLE_IS_FETCHING_ONE_PAGE = 'TOGGLE_IS_FETCHING_ONE_PAGE';
const ADD_TO_FAVORITE_LIST = "ADD_TO_FAVORITE_LIST";
const REMOVE_FROM_FAVORITE_LIST = "REMOVE_FROM_FAVORITE_LIST"

let initialState = {
    property: [],
    isFetchingOnePage: true,
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
        default:
            return state;
    }
}
const setPropertyOne = (property) => ({type: SET_PROPERTY_ONE, property});
export const toggleIsFetching = (isFetchingOnePage) => ({type: TOGGLE_IS_FETCHING_ONE_PAGE, isFetchingOnePage })

const addToFavoriteList = (house_id) => ({type: ADD_TO_FAVORITE_LIST, house_id })
const removeFromFavoriteList = (house_id) => ({type: REMOVE_FROM_FAVORITE_LIST, house_id })

export const getPropertyOne = (id) => (dispatch) => {
    dispatch(toggleIsFetching(true));

    findPropertyAPI.getHouse(id)
        .then(response => {
            if(response.status === 200){
                dispatch(setPropertyOne(response.data));
                dispatch(toggleIsFetching(false));
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