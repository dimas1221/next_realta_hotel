import { call, put } from "@redux-saga/core/effects";
import ApiHotel from "../service/apiHotel";
import { doGetFaphoSucced, doGetFaphoFaied } from "../action/actionFaphoAdmin";

function* handlerFapho(): any {
  try {
    const result = yield call(ApiHotel.getFaphoAdmin);
    yield put(doGetFaphoSucced(result.data));
  } catch (error) {
    yield put(doGetFaphoFaied(error));
  }
}

export { handlerFapho };
