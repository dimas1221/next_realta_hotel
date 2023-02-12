import { call, put } from "@redux-saga/core/effects";
import ApiHotel from "../service/apiHotel";
import {
  doFaciAdminReqSuccess,
  doFaciAdminReqFailed,
} from "../action/actionFaciAdmin";
import {
  doMaxRoomIdReqFailed,
  doMaxRoomIdReqSucced,
} from "../action/actionMaxId";

function* handlerGetFaciAdmin(): any {
  try {
    const result = yield call(ApiHotel.getFaciAdmin);
    yield put(doFaciAdminReqSuccess(result.data));
  } catch (error) {
    yield put(doFaciAdminReqFailed(error));
  }
}

function* handlerGetMaxIdRoom(): any {
  try {
    const result = yield call(ApiHotel.getMaxIdRoom);
    yield put(doMaxRoomIdReqSucced(result.data));
  } catch (error) {
    yield put(doMaxRoomIdReqFailed(error));
  }
}

export { handlerGetFaciAdmin, handlerGetMaxIdRoom };
