import {propertyForClientAPI} from "../api/api";


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

const propertyClientReducer = (state = initialState, action) => {
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
/*export const setJkhInfo = (jkhInfo) => ({type: SET_JKH_INFO, jkhInfo});*/

const toggleIsFetching = (isFetchingOnePage) => ({type: TOGGLE_IS_FETCHING_ONE_PAGE, isFetchingOnePage })

export const getPropertyOneClient = (id) => (dispatch) => {
    dispatch(toggleIsFetching(true));

    propertyForClientAPI.getHouseClient(id)
        .then(response => {
            if(response.status === 200){
                /*findPropertyAPI.getJKH(id)
                    .then(responseJkh => {
                        if(responseJkh.data.status === true){
                            dispatch(setJkhInfo(responseJkh.data.data));
                        }else{
                            dispatch(setJkhInfo({none:"Отсутствуют данные с портала ЖКХ"}));
                        }
                    }).catch( (error) => {
                        dispatch(setJkhInfo({error:"Отсутствуют данные с портала ЖКХ"}));
                })*/
                dispatch(setPropertyOne(response.data));
                dispatch(toggleIsFetching(false));
            }
        });
}


export default propertyClientReducer;