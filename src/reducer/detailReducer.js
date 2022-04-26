import { DETAİL,LİSANCE } from "../actions/type";



const initialState={data:[],lisance:[]}
export function detailReducer (state=initialState, { type, payload }) {

  switch (type) {
    case DETAİL:return {...state, data:[payload]};
    case LİSANCE:return {...state,lisance:[payload,...state.lisance.filter(item=>item[2]!==payload[2])]};
   // [par,...data.filter(item=>item.indexOf(par)===-1)]
  default:
    return state
  }
};

