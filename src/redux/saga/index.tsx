import { takeEvery, all, takeLatest } from "@redux-saga/core/effects";
import ActionTypes from "../constant/actionType";
import { handlerCardHotel} from "./hotelSaga";
import { handlerFaciAllHotel } from "./faciAllHotelSaga";

function* watchAll(){
    yield all([
        takeEvery(ActionTypes.GET_CARDHOTEL, handlerCardHotel),
        takeEvery(ActionTypes.GET_FACIALLHOTEL, handlerFaciAllHotel)
    ])
}

export default watchAll