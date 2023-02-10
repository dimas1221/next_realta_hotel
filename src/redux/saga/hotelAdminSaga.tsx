import { call, put } from "@redux-saga/core/effects";
import ApiHotel from "../service/apiHotel";
import {
  doHotelAdminReqSuccess,
  doHotelAdminReqFailed,
  doInsertHotelSuccess,
  doInsertHotelFailed,
  doDelHotel,
  doDelHotelFailed,
  doDelHotelSucced,
  doUpdateHotelSucces,
} from "../action/actionHotelAdmin";

function* handlerHotelAdmin(): any {
  // jika di postman menampilkan result data
  try {
    const result = yield call(ApiHotel.getHotelAdmin);
    yield put(doHotelAdminReqSuccess(result.data));
  } catch (err) {
    yield put(doHotelAdminReqFailed(err));
  }
}

function* handlerInsertHotel(action: any): any {
  // jika return di postmane a cuma meampilkan string tidak pakai result
  try {
    yield call(ApiHotel.insertHotel, action.payload);
    yield put(doInsertHotelSuccess(action.payload));
  } catch (err) {
    yield put(doInsertHotelFailed(err));
  }
}

function* handlerDeleteHotel(action: any) {
  try {
    yield call(ApiHotel.removeHotel, action.payload);
    yield put(doDelHotelSucced(action.payload));
  } catch (err) {
    yield put(doDelHotelFailed(err));
  }
}

function* handlerUpdateHotel(action: any) {
  try {
    yield call(ApiHotel.updateHotel, action.payload);
    yield put(doUpdateHotelSucces(action.payload));
  } catch (err) {
    return err;
  }
}

export {
  handlerHotelAdmin,
  handlerInsertHotel,
  handlerDeleteHotel,
  handlerUpdateHotel,
};
