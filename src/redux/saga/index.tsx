import { takeEvery, all, takeLatest } from "@redux-saga/core/effects";
import ActionTypes from "../constant/actionType";
import { handlerCardHotel} from "./hotelSaga";
import { handlerFaciAllHotel } from "./faciAllHotelSaga";
import { handlerHotelAdmin, handlerInsertHotel } from "./hotelAdminSaga";
import { handlerHore } from "./horeSaga";

function* watchAll(){
    yield all([
        takeEvery(ActionTypes.GET_CARDHOTEL, handlerCardHotel),
        takeEvery(ActionTypes.GET_FACIALLHOTEL, handlerFaciAllHotel),
        takeEvery(ActionTypes.GET_HORE, handlerHore),
        takeEvery(ActionTypes.GET_HOTELADMIN, handlerHotelAdmin),
        takeEvery(ActionTypes.ADD_HOTELADMIN,handlerInsertHotel)
    ])
}

export default watchAll