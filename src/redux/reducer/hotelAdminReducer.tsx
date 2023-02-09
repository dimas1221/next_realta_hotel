import  ActionTypes  from "../constant/actionType";

interface InitialState {
  hotelAdmin: any[];
}

const initialState: InitialState = {
  hotelAdmin: [],
};

function HotelAdminReducer(state = initialState, action: any) {
  switch (action.type) {
    case ActionTypes.GET_HOTELADMIN:
      return { ...state };
    case ActionTypes.GET_HOTELADMIN_SUCCED:
      return { ...state, hotelAdmin: action.payload };
    case ActionTypes.GET_HOTELADMIN_FAILED:
      return { ...state, hotelAdmin: action.payload };
      // insert
    case ActionTypes.ADD_HOTELADMIN:
      return {...state};
    case ActionTypes.ADD_HOTELADMIN_SUCCED:
      return {...state, hotelAdmin: [...state.hotelAdmin, action.payload]};
    case ActionTypes.ADD_HOTELADMIN_FAILED:
      return {...state, hotelAdmin: [...state.hotelAdmin, action.payload]};
    default:
      return { ...state};
  }
}

export default HotelAdminReducer;