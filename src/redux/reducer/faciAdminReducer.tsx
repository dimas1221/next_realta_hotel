import ActionTypes from "../constant/actionType";

interface InitialState {
  faciAdmin: any[];
}

const initialState: InitialState = {
  faciAdmin: [],
};

function FaciAdminReducer(state = initialState, action: any) {
  switch (action.type) {
    case ActionTypes.GET_FACIADMIN:
      return { ...state };
    case ActionTypes.GET_FACIADMIN_SUCCED:
      return { ...state, faciAdmin: action.payload };
    case ActionTypes.GET_FACIADMIN_FAILED:
      return { ...state, faciAdmin: action.payload };
    default:
      return { ...state };
  }
}

export default FaciAdminReducer;
