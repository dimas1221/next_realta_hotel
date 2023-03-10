import { call, put } from "@redux-saga/core/effects";
import ApiHotel from "../service/apiHotel";
import {
  doFaciAdminReqSuccess,
  doFaciAdminReqFailed,
  doInsertFaciFailed,
  doInsertFaciSucced,
  doDelFaciSucced,
  doDelFaciFailed,
  doUpdateFaciSucces,
  doUpdateFaciFailed,
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
// delet
function* handlerDeleteFaci(action: any) {
  try {
    yield call(ApiHotel.removeFaci, action.payload);
    yield put(doDelFaciSucced(action.payload));
  } catch (err) {
    yield put(doDelFaciFailed(err));
  }
}

// update
function* handlerUpdateFaci(action: any) {
  try {
    yield call(ApiHotel.updateFaci, action.payload);
    yield put(doUpdateFaciSucces(action.payload));
  } catch (err) {
    yield put(doUpdateFaciFailed(err));
  }
}

export {
  handlerGetFaciAdmin,
  handlerGetMaxIdRoom,
  handlerInsertFaciAdmin,
  handlerDeleteFaci,
  handlerUpdateFaci,
};
