import {call, put} from "@redux-saga/core/effects"
import ApiHotel from "../service/apiHotel"
import { doHotelAdminReqSuccess, doHotelAdminReqFailed, doInsertHotelSuccess, doInsertHotelFailed } from "../action/actionHotelAdmin"

function* handlerHotelAdmin():any {
    try {
        const result = yield call(ApiHotel.getHotelAdmin)
        yield put(doHotelAdminReqSuccess(result.data))
    } catch (err) {
        yield put(doHotelAdminReqFailed(err))
    }
}

function* handlerInsertHotel(action:any):any{
    try{
        const result = yield call(ApiHotel.insertHotel, action.payload)
        yield put(doInsertHotelSuccess(result.data))
    }catch (err){
        yield put(doInsertHotelFailed(err))
    }
}


export {
    handlerHotelAdmin,
    handlerInsertHotel
}