import { takeEvery, all, takeLatest } from "@redux-saga/core/effects";
import ActionTypes from "../constant/actionType";
import { handlerCardHotel} from "./hotelSaga";

function* watchAll(){
    yield all([
        takeEvery(ActionTypes.GET_CARDHOTEL, handlerCardHotel),
    ])
}

export default watchAll