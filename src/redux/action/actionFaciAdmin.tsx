import { type } from "os";
import ActionTypes from "../constant/actionType";

export const doFaciAdminReq = () => {
  return {
    type: ActionTypes.GET_FACIADMIN,
  };
};

export const doFaciAdminReqSuccess = (payload: any) => {
  return {
    type: ActionTypes.GET_FACIADMIN_SUCCED,
    payload,
  };
};

export const doFaciAdminReqFailed = (payload: any) => {
  return {
    type: ActionTypes.GET_FACIADMIN_FAILED,
    payload,
  };
};

// INSERT
export const doInsertFaci = (payload: any) => {
  return {
    type: ActionTypes.ADD_FACIADMIN,
    payload,
  };
};
export const doInsertFaciSucced = (payload: any) => {
  return {
    type: ActionTypes.ADD_FACIADMIN,
    payload,
  };
};
export const doInsertFaciFailed = (payload: any) => {
  return {
    type: ActionTypes.ADD_FACIADMIN,
    payload,
  };
};

// DELETE
export const doDelFaci = (payload: any) => {
  return {
    type: ActionTypes.DEL_FACI,
    payload,
  };
};
export const doDelFaciSucced = (payload: any) => {
  return {
    type: ActionTypes.DEL_FACI_SUCCED,
    payload,
  };
};
export const doDelFaciFailed = (payload: any) => {
  return {
    type: ActionTypes.DEL_FACI_FAILED,
    payload,
  };
};
