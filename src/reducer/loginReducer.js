import {FETCHİNG,FETCHED,ERROR } from "../actions/type"

const initialState = {data:[],fetched:false,fetching:false,error:{}}
export function loginReducer (state = initialState, { type, payload })  {

    switch (type) {
    case FETCHİNG:return { ...state,fetching:true}
    case FETCHED: return { ...state,fetching:false,fetched:true, data:payload }
    case ERROR:   return { ...state,fetching:false,error:payload }
    default: return state
    };
  
  
  }
  