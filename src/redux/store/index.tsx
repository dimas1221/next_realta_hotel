import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
// reducer hotel
import HotelReducer from "../reducer/hotelReducer";
import FaciAllHotelReducer from "../reducer/faciAllHotelReducer";
import HoreReducer from "../reducer/horeReducer";
import HotelAdminReducer from "../reducer/hotelAdminReducer";
import FaciAdminReducer from "../reducer/faciAdminReducer";
import RoomNumberReducer from "../reducer/maxRoomIdReducer";
// end
import { combineReducers } from "redux";
import rootSaga from "../saga";
import createSagaMiddleware from "@redux-saga/core";

const saga = createSagaMiddleware();

const reducer = combineReducers({
  HotelReducer,
  FaciAllHotelReducer,
  HoreReducer,
  HotelAdminReducer,
  FaciAdminReducer,
  RoomNumberReducer,
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(saga),
});
saga.run(rootSaga);

export default store;
