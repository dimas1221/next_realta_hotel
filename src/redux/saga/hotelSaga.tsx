import {call, put} from "@redux-saga/core/effects"
import ApiHotel from "../service/apiHotel"
import { doCardHotelReq, doCardHotelReqSuccess, doCardHotelReqFailed} from "../action/actionHotel"

function* handlerCardHotel():any {
    try {
        const result = yield call(ApiHotel.getCardHotel)
        console.log('all hotel', result)
        yield put(doCardHotelReqSuccess(result.data))
    } catch (err) {
        yield put(doCardHotelReqFailed(err))
    }
}


export {
    handlerCardHotel
}