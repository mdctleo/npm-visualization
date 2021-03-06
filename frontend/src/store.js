import {createStore, applyMiddleware } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from './reducer'

const loggerMiddleware = createLogger()

let middleware = [thunkMiddleware]
if (process.env.NODE_ENV !== 'production') {
    middleware.push(loggerMiddleware)
}

export default function configureStore(preloadedState) {
    return createStore(
        rootReducer,
        preloadedState,
        applyMiddleware(...middleware)
    )
}