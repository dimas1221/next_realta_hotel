import ActionTypes from "../constant/actionType";

export const doHotelAdminReq = () => {
  return {
    type: ActionTypes.GET_HOTELADMIN,
  };
};

export const doHotelAdminReqSuccess = (payload: any) => {
  return {
    type: ActionTypes.GET_HOTELADMIN_SUCCED,
    payload,
  };
};

export const doHotelAdminReqFailed = (payload: any) => {
  return {
    type: ActionTypes.GET_HOTELADMIN_FAILED,
    payload,
  };
};

// insert
export const doInsertHotel = (payload: any) => {
  return {
    type: ActionTypes.ADD_HOTELADMIN,
    payload,
  };
};

export const doInsertHotelSuccess = (payload: any) => {
  return {
    type: ActionTypes.ADD_HOTELADMIN_SUCCED,
    payload,
  };
};

export const doInsertHotelFailed = (payload: any) => {
  return {
    type: ActionTypes.ADD_HOTELADMIN_FAILED,
    payload,
  };
};

// DELETE
export const doDelHotel = (payload: any) => {
  return {
    type: ActionTypes.DEL_HOTELADMIN,
    payload,
  };
};
export const doDelHotelSucced = (payload: any) => {
  return {
    type: ActionTypes.DEL_HOTELADMIN_SUCCED,
    payload,
  };
};
export const doDelHotelFailed = (payload: any) => {
  return {
    type: ActionTypes.DEL_HOTELADMIN_FAILED,
    payload,
  };
};

// update
export const doUpdateHotel = (payload: any) => {
  return {
    type: ActionTypes.UPDATE_HOTELADMIN,
    payload,
  };
};
export const doUpdateHotelSucces = (payload: any) => {
  return {
    type: ActionTypes.UPDATE_HOTELADMIN_SUCCED,
    payload,
  };
};
export const doUpdateHotelFailed = (payload: any) => {
  return {
    type: ActionTypes.UPDATE_HOTELADMIN_FAILED,
    payload,
  };
};
