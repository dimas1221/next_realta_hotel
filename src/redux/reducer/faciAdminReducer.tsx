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
    // insert
    case ActionTypes.ADD_FACIADMIN:
      return { ...state };
    case ActionTypes.ADD_FACIADMIN_SUCCED:
      return { ...state, faciAdmin: [...state.faciAdmin, action.payload] };
    case ActionTypes.ADD_FACIADMIN_FAILED:
      return { ...state, faciAdmin: [...state.faciAdmin, action.payload] };
    // delete
    case ActionTypes.DEL_FACI:
      return { ...state };
    case ActionTypes.DEL_FACI_SUCCED:
      return {
        ...state,
        faciAdmin: state.faciAdmin.filter(
          (faciAdmin) => faciAdmin.faci_id !== action.payload
        ),
      };
    case ActionTypes.DEL_FACI_FAILED:
      return {
        ...state,
        faciAdmin: state.faciAdmin.filter(
          (faciAdmin) => faciAdmin.faci_id !== action.payload
        ),
      };
    default:
      return { ...state };
  }
}

export default FaciAdminReducer;
