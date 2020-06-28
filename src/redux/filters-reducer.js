
const LOAD = "LOAD";


let initialState = {
    data: []
};

const filtersReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:{
            return{
                data: action.data
            }
        }
        default:
            return state;
    }
}
export const loadFilters = (data) => ({type: LOAD, data});


export default filtersReducer;