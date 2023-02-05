import  ActionTypes  from "../constant/actionType";

interface InitialState {
  hotel: any[];
}

const initialState: InitialState = {
  hotel: []
};

function HotelReducer(state = initialState, action: any) {
  switch (action.type) {
    case ActionTypes.GET_CARDHOTEL:
      return { ...state };
    case ActionTypes.GET_CARDHOTEL_SUCCED:
      return { ...state, hotel: action.payload };
    case ActionTypes.GET_CARDHOTEL_FAILED:
      return { ...state, hotel: action.payload };
      // get id card
    case ActionTypes.GET_IDCARDHOTEL:
      return { ...state };
    case ActionTypes.GET_IDCARDHOTEL_SUCCED:
      return GetIdCardSucced(state, action);  
    case ActionTypes.GET_IDCARDHOTEL_FAILED:
      return GetIdCardSucced(state, action); 
    default:
      return { ...state, hotel: action.payload };
  }
}

const GetIdCardSucced = (state = initialState, action:any)=>{
   return{
    ...state,
    hotel:action.payload
   }
}

export default HotelReducer;