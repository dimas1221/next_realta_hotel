import { takeEvery, all, takeLatest } from "@redux-saga/core/effects";
import ActionTypes from "../constant/actionType";
import { handlerCardHotel} from "./hotelSaga";
import { handlerFaciAllHotel } from "./faciAllHotelSaga";
import { handlerHore } from "./horeSaga";

function* watchAll(){
    yield all([
        takeEvery(ActionTypes.GET_CARDHOTEL, handlerCardHotel),
        takeEvery(ActionTypes.GET_FACIALLHOTEL, handlerFaciAllHotel),
        takeEvery(ActionTypes.GET_HORE, handlerHore)
    ])
}

export default watchAll