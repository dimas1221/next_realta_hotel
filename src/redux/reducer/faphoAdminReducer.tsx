import ActionTypes from "../constant/actionType";

interface InitialState {
  fapho: any[];
}

const initialState: InitialState = {
  fapho: [],
};

function FaphoReducer(state = initialState, action: any) {
  switch (action.type) {
    case ActionTypes.GET_FAPHO:
      return { ...state };
    case ActionTypes.GET_FAPHO_SUCCED:
      return { ...state, fapho: action.payload };
    case ActionTypes.GET_FAPHO_FAILED:
      return { ...state, fapho: action.payload };
    default:
      return { ...state };
  }
}

export default FaphoReducer;
