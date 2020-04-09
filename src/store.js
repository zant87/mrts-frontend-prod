import {applyMiddleware, compose, createStore} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import rootReducer from "@/_reducers";
import {createLogger} from 'redux-logger';

const logger = createLogger({
    /* https://github.com/evgenyrodionov/redux-logger */
    collapsed: true,
    diff: true
});

const initalState = {};
const middleware = [thunk, logger];

let store;

if (window.navigator.userAgent.includes("Chrome")) {
    store = createStore(
        rootReducer,
        initalState,
        composeWithDevTools(
            applyMiddleware(...middleware)
        )
    );
} else {
    store = createStore(
        rootReducer,
        initalState,
        compose
        (applyMiddleware(...middleware)));
}

//временно, потом удалить
//window.store = store;

export default store;
