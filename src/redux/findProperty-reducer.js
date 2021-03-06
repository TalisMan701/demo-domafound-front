import {findPropertyAPI} from "../api/api";

const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const SET_PROPERTY = "SET_PROPERTY";
const SET_TEMP_PROPERTY = "SET_TEMP_PROPERTY";
const ADD_ONE_TEMP_PROPERTY = "ADD_ONE_TEMP_PROPERTY";
const SET_TOTAL_PROPERTY_COUNT = "SET_TOTAL_PROPERTY_COUNT";
const REMOVE_FROM_PROPERTY = "REMOVE_FROM_PROPERTY";
const SET_IGNORE_LIST = "SET_IGNORE_LIST";
const REMOVE_FROM_IGNORE_PROPERTY = "REMOVE_FROM_IGNORE_PROPERTY";
const SET_IS_NEXT = "SET_IS_NEXT";
const DELETE_PROPERTY_STATE = "DELETE_PROPERTY_STATE";
const SET_FAVORITE_LIST = "SET_FAVORITE_LIST";
const ADD_TO_FAVORITE_LIST = "ADD_TO_FAVORITE_LIST";
const REMOVE_FROM_FAVORITE_LIST = "REMOVE_FROM_FAVORITE_LIST";
const SET_FILTERS = "SET_FILTERS";
const SET_WATCHED_LIST = "SET_WATCHED_LIST";
const ADD_TO_WATCHED_LIST = "ADD_TO_WATCHED_LIST";
const SET_PAGE = "SET_PAGE";
const SET_PAGESIZE = "SET_PAGESIZE";
const SET_POLYGON_CORDS = "SET_POLYGON_CORDS";
const SET_FILTERS_STORAGE = "SET_FILTERS_STORAGE";
const SET_DAYS_AGO = "SET_DAYS_AGO";

let initialState = {
    property: [],
    tempProperty: [],
    ignoreList:[],
    favoriteList: [],
    watchedList:[],
    pageSize: 5,
    totalPropertyCount: 0,
    isNext: null,
    page: 1,
    isFetching: true,
    filters: localStorage.getItem("filtersForFind") !== null ? localStorage.getItem("filtersForFind") : "&offer_type=0",
    filtersStorage: localStorage.getItem("filters") !== null ? JSON.parse(localStorage.getItem("filters")) : {typeOffer:{rent:false,sale:true}},
    polygon_cords: localStorage.getItem("polygon") !== null ? JSON.parse(localStorage.getItem("polygon"))[0] : 0,
    days_ago: localStorage.getItem("days_ago") !== null ? parseInt(JSON.parse(localStorage.getItem("days_ago"))) : 0
};

const foundPropertyReducer = (state = initialState, action) => {
    switch (action.type) {
        /*case SET_PROPERTY:
            return {
                ...state,
                /!*page: state.page+1,*!/
                property: [...state.property, ...action.property]
            }*/
        case SET_PROPERTY:
            return {
                ...state,
                /*page: state.page+1,*/
                property: action.property
            }
        case SET_TEMP_PROPERTY:{
            let temp = []
            action.tempProperty.map(p=>temp.push(p.items.id))
            return {
                ...state,
                tempProperty: temp
            }
        }
        case ADD_ONE_TEMP_PROPERTY:{
            let temp = state.tempProperty
            temp.push(action.OneTempProperty)
            return {
                ...state,
                tempProperty: temp
            }
        }
        case SET_IGNORE_LIST:{
            return {
                ...state,
                ignoreList: action.ignoreList
            }
        }
        case SET_FAVORITE_LIST:{
            return {
                ...state,
                favoriteList: action.favoriteList
            }
        }
        case SET_WATCHED_LIST:{
            return {
                ...state,
                watchedList: action.watchedList
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
                property: state.property.filter(e => e.items.id !== action.house_id),
                favoriteList: state.favoriteList.filter(e => e.id !== action.house_id)
            }
        }
        case REMOVE_FROM_IGNORE_PROPERTY:{
            return {
                ...state,
                ignoreList: state.ignoreList.filter(e => e.id !== action.house_id)
            }
        }
        case ADD_TO_WATCHED_LIST:{
            return{
                ...state,
                property: state.property.map( p => {
                    if(p.items.id === action.house_id){
                        return {...p, is_watched:true}
                    }
                    return p
                })
            }
        }
        case ADD_TO_FAVORITE_LIST:{
            return{
                ...state,
                property: state.property.map( p => {
                    if(p.items.id === action.house_id){
                        return {...p, is_fav:true}
                    }
                    return p
                })
            }
        }
        case REMOVE_FROM_FAVORITE_LIST:{
            return{
                ...state,
                property: state.property.map( p => {
                    if(p.items.id === action.house_id){
                        return {...p, is_fav:false}
                    }
                    return p
                }),
                favoriteList: state.favoriteList.filter(e => e.id !== action.house_id)
            }
        }
        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching}
        }
        case DELETE_PROPERTY_STATE:{
            return {
                ...initialState,
                page: state.page,
                pageSize: state.pageSize,
                filters: state.filters,
                filtersStorage: state.filtersStorage,
                polygon_cords: state.polygon_cords,
                days_ago: state.days_ago
            }
        }
        case SET_FILTERS:{
            localStorage.setItem("filtersForFind", action.filters)
            return {
                ...state,
                property: [],
                totalPropertyCount: 0,
                isNext: null,
                page: 1,
                isFetching: true,
                filters: action.filters
            }
        }
        case SET_PAGE:{
            return {
                ...state,
                page: action.page
            }
        }
        case SET_PAGESIZE:{
            return {
                ...state,
                pageSize: action.pageSize
            }
        }
        case SET_POLYGON_CORDS:{
            return {
                ...state,
                polygon_cords: action.polygon_cords
            }
        }
        case SET_DAYS_AGO:{
            return {
                ...state,
                days_ago: action.days_ago
            }
        }
        case SET_FILTERS_STORAGE:{
            return {
                ...state,
                filtersStorage: action.filtersStorage
            }
        }
        default:
            return state;
    }
}
const setProperty = (property) => ({type: SET_PROPERTY, property })
export const setTempProperty = (tempProperty) => ({type: SET_TEMP_PROPERTY, tempProperty })
export const addOneTempProperty = (OneTempProperty) => ({type: ADD_ONE_TEMP_PROPERTY, OneTempProperty })
const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching })
const setTotalPropertyCount = (totalPropertyCount) => ({type: SET_TOTAL_PROPERTY_COUNT, count: totalPropertyCount })
export const setIsNext = (isNext) => ({type: SET_IS_NEXT, isNext })
export const deletePropertyState = () => ({type: DELETE_PROPERTY_STATE})

export const setPage = (page) =>({type: SET_PAGE, page})
export const setPageSize = (pageSize) =>({type: SET_PAGESIZE, pageSize})

const setIgnoreList = (ignoreList) => ({type: SET_IGNORE_LIST, ignoreList })
const removeFromProperty = (house_id) => ({type: REMOVE_FROM_PROPERTY, house_id})
const removeFromIgnoreProperty = (house_id) => ({type: REMOVE_FROM_IGNORE_PROPERTY, house_id})

const setFavoriteList = (favoriteList) => ({type: SET_FAVORITE_LIST, favoriteList })
const addToFavoriteList = (house_id) => ({type: ADD_TO_FAVORITE_LIST, house_id })
const removeFromFavoriteList = (house_id) => ({type: REMOVE_FROM_FAVORITE_LIST, house_id })

const setWatchedList = (watchedList) => ({type: SET_WATCHED_LIST, watchedList })
const addToWatchedList = (house_id) => ({type: ADD_TO_WATCHED_LIST, house_id })

export const setFilters = (filters) => ({type:SET_FILTERS, filters})
export const setPolygonCords = (polygon_cords) => ({type:SET_POLYGON_CORDS, polygon_cords})
export const setDaysAgo = (days_ago) => ({type:SET_DAYS_AGO, days_ago})
export const setFiltersStorage = (filtersStorage) => ({type:SET_FILTERS_STORAGE, filtersStorage})

export const getProperty = (pageSize, page, filters, polygon_cords = 0, days_ago = 0, is_fav = false) => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true));
        findPropertyAPI.getBase(pageSize, page, filters, polygon_cords, days_ago, is_fav)
            .then(data => {
                dispatch(setProperty(data.data.results));
                dispatch(setTempProperty(data.data.results));
                dispatch(setTotalPropertyCount(data.data.count));
                dispatch(setIsNext(data.data.next));
                dispatch(toggleIsFetching(false));
        });
    }
}

export const getPropertyWithOutFetching = (pageSize, page, filters, polygon_cords = 0, days_ago = 0, is_fav = false) => {
    return (dispatch) => {
        findPropertyAPI.getBase(pageSize, page, filters, polygon_cords,days_ago, is_fav)
            .then(data => {
                dispatch(setProperty(data.data.results));
                dispatch(setTotalPropertyCount(data.data.count));
                dispatch(setIsNext(data.data.next));
            });
    }
}

export const getPropertyWithFilters = (pageSize, page, filters, polygon_cords = 0, days_ago = 0, is_fav = false) => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true));
        dispatch(setFilters(filters))

        findPropertyAPI.getBase(pageSize, page, filters, polygon_cords, days_ago, is_fav)
            .then(data => {
                dispatch(setProperty(data.data.results));
                dispatch(setTotalPropertyCount(data.data.count));
                dispatch(setIsNext(data.data.next));
                dispatch(toggleIsFetching(false));
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

export const getFavoriteList = () => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true));

        findPropertyAPI.getFavoriteList()
            .then(data => {
                if (data.data.status === true){
                    dispatch(setFavoriteList(data.data.items.fav_list));
                    dispatch(toggleIsFetching(false));
                }
            });
    }
}

export const getWatchedList = () => {
    return (dispatch) => {
        findPropertyAPI.getWatchList()
            .then(data => {
                if (data.data.status === true){
                    dispatch(setWatchedList(data.data.items.watched_list));
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
        dispatch(removeToFavoriteList(house_id))
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

export const setToFavoriteList = (house_id) => {
    return (dispatch) => {
        findPropertyAPI.setToFavoriteList(house_id)
            .then(data => {
                if (data.data.status === true){
                    dispatch(addToFavoriteList(house_id));
                }
            });
    }
}

export const removeToFavoriteList = (house_id) => {
    return (dispatch) => {
        findPropertyAPI.removeToFavoriteList(house_id)
            .then(data => {
                if (data.data.status === true){
                    dispatch(removeFromFavoriteList(house_id));
                }
            });
    }
}

export const setToWatchedList = (house_id) => {
    return (dispatch) => {
        findPropertyAPI.setToWatchList(house_id)
            .then(data => {
                if (data.data.status === true){
                    dispatch(addToWatchedList(house_id));
                }
            });
    }
}


export default foundPropertyReducer;