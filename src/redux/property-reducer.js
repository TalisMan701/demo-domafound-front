import {findPropertyAPI} from "../api/api";


const SET_PROPERTY_ONE = "SET_PROPERTY_ONE";
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';

let initialState = {
    property: [],
    isFetching: true,
};

const propertyReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PROPERTY_ONE:
            return {
                ...state,
                property: action.property
            }
        case TOGGLE_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching}
        }
        default:
            return state;
    }
}
const setPropertyOne = (property) => ({type: SET_PROPERTY_ONE, property});
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching })

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

export default propertyReducer;