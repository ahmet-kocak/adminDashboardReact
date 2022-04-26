import {CREATE_POST, DELETE_POST, FETCH_POSTS, UPDATE_POST} from "../actions/type"

const initialState = []


export function userReducer (state = initialState, { type, payload }) {

  switch (type) {
    case CREATE_POST:return [...state,payload];
    case FETCH_POSTS:return [...payload];
    case DELETE_POST:return  [...state.filter(item=>item._id!==payload)];
    case UPDATE_POST:return  [...state.filter(item=>item._id!==payload._id),payload.data];
  default:
    return state
  }
};






















/* 
export  function userReducer (state,action,)  {
    
  

  switch (action.type) {
    case CREATE_POST:return [...state,action.payload];
    case FETCH_POSTS:return [...action.payload];
    case DELETE_POST:return  [...state.filter(item=>item._id!==action.payload)];
    case UPDATE_POST:return  [...state.filter(item=>item._id!==action.payload._id),action.payload.data];
    default:
      break;
  };
} 
 */
