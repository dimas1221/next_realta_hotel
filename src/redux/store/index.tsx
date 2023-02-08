import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import HotelReducer from '../reducer/hotelReducer'
import FaciAllHotelReducer from '../reducer/faciAllHotelReducer'
import HoreReducer from '../reducer/horeReducer'
import { combineReducers } from 'redux'
import rootSaga from '../saga'
import createSagaMiddleware from '@redux-saga/core'

const saga = createSagaMiddleware()

const reducer = combineReducers({
    HotelReducer,
    FaciAllHotelReducer,
    HoreReducer 
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