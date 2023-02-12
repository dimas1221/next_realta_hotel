import { takeEvery, all, takeLatest } from "@redux-saga/core/effects";
import ActionTypes from "../constant/actionType";
import { handlerCardHotel } from "./hotelSaga";
import { handlerFaciAllHotel } from "./faciAllHotelSaga";
import {
  handlerDeleteHotel,
  handlerHotelAdmin,
  handlerInsertHotel,
  handlerUpdateHotel,
} from "./hotelAdminSaga";
import { handlerGetFaciAdmin, handlerGetMaxIdRoom } from "./faciAdminSaga";
import { handlerHore } from "./horeSaga";

function* watchAll() {
  yield all([
    takeEvery(ActionTypes.GET_CARDHOTEL, handlerCardHotel),
    takeEvery(ActionTypes.GET_FACIALLHOTEL, handlerFaciAllHotel),
    takeEvery(ActionTypes.GET_HORE, handlerHore),
    takeEvery(ActionTypes.GET_HOTELADMIN, handlerHotelAdmin),
    takeEvery(ActionTypes.ADD_HOTELADMIN, handlerInsertHotel),
    takeEvery(ActionTypes.DEL_HOTELADMIN, handlerDeleteHotel),
    takeEvery(ActionTypes.UPDATE_HOTELADMIN, handlerUpdateHotel),
    takeEvery(ActionTypes.GET_FACIADMIN, handlerGetFaciAdmin),
    takeEvery(ActionTypes.GET_MAXIDROOM, handlerGetMaxIdRoom),
  ]);
}

export default watchAll;
