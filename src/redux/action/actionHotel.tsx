import ActionTypes from "../constant/actionType"

export const doCardHotelReq = ()=>{
    return{
        type:ActionTypes.GET_CARDHOTEL
    }
}

export const doCardHotelReqSuccess=(payload: any)=>{
    return {
        type:ActionTypes.GET_CARDHOTEL_SUCCED,
        payload: payload
    }
}

export const doCardHotelReqFailed=(payload: any)=>{
    return {
        type:ActionTypes.GET_CARDHOTEL_FAILED,
        payload
    }
}

// get id card
// export const doIdCardReq = (payload:any)=>{
//     return{
//         type:ActionTypes.GET_IDCARDHOTEL,
//         payload
//     }
// }

// export const doIdCardReqSuccess=(payload: any)=>{
//     return {
//         type:ActionTypes.GET_IDCARDHOTEL_SUCCED,
//         payload
//     }
// }

// export const doIdCardReqFailed=(payload: any)=>{
//     return {
//         type:ActionTypes.GET_IDCARDHOTEL_FAILED,
//         payload
//     }
// }