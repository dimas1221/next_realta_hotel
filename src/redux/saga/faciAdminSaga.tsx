import { call, put } from "@redux-saga/core/effects";
import ApiHotel from "../service/apiHotel";
import {
  doFaciAdminReqSuccess,
  doFaciAdminReqFailed,
  doInsertFaciFailed,
  doInsertFaciSucced,
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
// insert
function* handlerInsertFaciAdmin(action: any): any {
  try {
    yield call(ApiHotel.insertFaci, action.payload);
    yield put(doInsertFaciSucced(action.payload));
  } catch (error) {
    yield put(doInsertFaciFailed(error));
  }
}

export { handlerGetFaciAdmin, handlerGetMaxIdRoom, handlerInsertFaciAdmin };
