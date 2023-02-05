import {call, put} from "@redux-saga/core/effects"
import ApiHotel from "../service/apiHotel"
import { doCardHotelReq, doCardHotelReqSuccess, doCardHotelReqFailed} from "../action/actionHotel"

function* handlerCardHotel():any {
    try {
        const result = yield call(ApiHotel.getCardHotel)
        
        yield put(doCardHotelReqSuccess(result.data))
    } catch (err) {
        yield put(doCardHotelReqFailed(err))
    }
}

// function* handlerGetIdCardHotel(action:any):any{
//     const {payload} = action
//     try{
//         const result = yield call(ApiHotel.getCardId, payload)
//         yield put(doCardHotelReqSuccess(result))
//     }catch(err){
//         yield put(doIdCardReqFailed(err))
//     }
// }

export {
    handlerCardHotel,
    // handlerGetIdCardHotel
}