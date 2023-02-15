import ActionTypes from "../constant/actionType";

export const doGetFapho = () => {
  return {
    type: ActionTypes.GET_FAPHO,
  };
};

export const doGetFaphoSucced = (payload: any) => {
  return {
    type: ActionTypes.GET_FAPHO_SUCCED,
    payload,
  };
};

export const doGetFaphoFaied = (payload: any) => {
  return {
    type: ActionTypes.GET_FAPHO_FAILED,
    payload,
  };
};
