import {propertyForClientAPI} from "../api/api";

const SET_SELECTING = "SET_SELECTING"
const ADD_TO_SELECTED = "ADD_TO_SELECTED"
const REMOVE_FROM_SELECTED = "REMOVE_FROM_SELECTED"
const REMOVE_SELECTED_PROPERTY = "REMOVE_SELECTED_PROPERTY"
const SET_LINK = "SET_LINK"
const TOGGLE_IS_FETCHING_LINK = "TOGGLE_IS_FETCHING_LINK"
const TOGGLE_IS_FETCHING_PROPERTY = "TOGGLE_IS_FETCHING_PROPERTY"
const SET_PROPERTY = "SET_PROPERTY"

let initialState = {
    property: [],
    selecting: false,
    selected: [],
    link: "",
    isFetchingLink: true,
    isFetchingProperty: true,
};

const propertyForClientReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SELECTING:{
            return {
                ...state,
                selecting: action.selecting
            }
        }
        case ADD_TO_SELECTED:{
            return {
                ...state,
                selected: [...state.selected, action.idSelected]
            }
        }
        case REMOVE_FROM_SELECTED:{
            return {
                ...state,
                selected: state.selected.filter(id => id !== action.idSelected)
            }
        }
        case REMOVE_SELECTED_PROPERTY:{
            return {
                ...state,
                selecting: false,
                selected: []
            }
        }
        case SET_LINK:{
            return {
                ...state,
                link: action.link
            }
        }
        case TOGGLE_IS_FETCHING_LINK:{
            return {
                ...state,
                isFetchingLink: action.isFetchingLink
            }
        }
        case SET_PROPERTY:{
            return {
                ...state,
                property: action.property
            }
        }
        case TOGGLE_IS_FETCHING_PROPERTY:{
            return {
                ...state,
                isFetchingProperty: action.isFetchingProperty
            }
        }
        default:
            return state;
    }
}

const toggleIsFetchingLink = (isFetchingLink) => ({type: TOGGLE_IS_FETCHING_LINK, isFetchingLink })
const toggleIsFetchingProperty = (isFetchingProperty) => ({type: TOGGLE_IS_FETCHING_PROPERTY, isFetchingProperty })

export const setSelecting = (selecting) => ({type:SET_SELECTING, selecting})

export const addToSelected = (idSelected) =>({type:ADD_TO_SELECTED,idSelected})
export const removeFromSelected = (idSelected) =>({type:REMOVE_FROM_SELECTED,idSelected})

export const removeSelectedProperty = () => ({type:REMOVE_SELECTED_PROPERTY})

const setLink = (link) => ({type:SET_LINK, link})

const setProperty = (property) => ({type: SET_PROPERTY, property })

export const createPropertyForClient = (selected) => {
    return (dispatch) =>{
        dispatch(toggleIsFetchingLink(true));
        propertyForClientAPI.createPropertyForClient(selected)
            .then(response => {
                dispatch(setLink(response.data.link_to_set))
                dispatch(toggleIsFetchingLink(false));
            })
    }
}

export const getPropertyForClient = (idLink) =>{
    return (dispatch) =>{
        dispatch(toggleIsFetchingProperty(true))
        propertyForClientAPI.getPropertyForClient(idLink)
            .then(response => {
                dispatch(setProperty(response.data.data.house_set))
                dispatch(toggleIsFetchingProperty(false))
            })
    }
}

export default propertyForClientReducer;