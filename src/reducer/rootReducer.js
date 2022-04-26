import { combineReducers } from "redux";
import { loginReducer } from "./loginReducer";
import  {userReducer}  from "./userReducer";
import  {detailReducer}  from "./detailReducer";



export default combineReducers({userReducer,loginReducer,detailReducer})