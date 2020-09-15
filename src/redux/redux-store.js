import {applyMiddleware, combineReducers, createStore} from 'redux';
import authReducer from "./auth-reducer";
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from 'redux-form';
import registrationReducer from "./registration-reducer";
import findPropertyReducer from "./findProperty-reducer";
import propertyReducer from "./property-reducer";
import filtersReducer from "./filters-reducer";
import payReducer from "./pay-reducer";
import propertyForClientReducer from "./propertyForClient-reducer";
import propertyClientReducer from "./propertyClient-reducer";

let reducers = combineReducers({
    registration: registrationReducer,
    auth: authReducer,
    findProperty: findPropertyReducer,
    property: propertyReducer,
    filters: filtersReducer,
    pay: payReducer,
    propertyForClient: propertyForClientReducer,
    propertyClient: propertyClientReducer,
    form: formReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));
window.store = store;

export default store;