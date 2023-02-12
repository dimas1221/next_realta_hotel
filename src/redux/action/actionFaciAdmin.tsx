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
