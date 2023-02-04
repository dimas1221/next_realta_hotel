import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import HotelReducer from '../reducer/hotelReducer'
import { combineReducers } from 'redux'
import rootSaga from '../saga'
import createSagaMiddleware from '@redux-saga/core'

const saga = createSagaMiddleware()

const reducer = combineReducers({
    HotelReducer
})

const store = configureStore({
    reducer,
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware({
            serializableCheck:false,
        }).concat(saga)
})
saga.run(rootSaga)

export default store