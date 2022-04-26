import axios from "axios";
import {apiEndpoint} from "../config/helpers"
import { CREATE_POST, DELETE_POST, FETCH_POSTS, UPDATE_POST,FETCHİNG,FETCHED,ERROR,DETAİL,LİSANCE } from "./type";

export function signin (user) {
    
    return  async (dispatch)=> {
      dispatch({type:FETCHİNG})
      try {await axios.post(`${apiEndpoint}login`,user)
      .then(res=>{localStorage.setItem ('jwtToken', JSON.stringify(res.data));dispatch({type:FETCHED,payload:res.data})})
      .catch (err => {dispatch({type:ERROR,payload:err.response.data})})} 
      catch (error) { dispatch({type:ERROR,payload:error.err.response.data})}
  }}


  export function signup (user) {
   
      return  async (dispatch)=> {
        dispatch({type:FETCHİNG})
        try {await axios.post(`${apiEndpoint}register`,user);dispatch({type:FETCHED})} 
        catch (error) { dispatch({type:ERROR,payload:error})}
  }}
  
  

export const createPost = (post) => 
{ return async (dispatch) => {
    try {await axios.post(apiEndpoint,post);
    dispatch({type:CREATE_POST,payload:post});} 
    catch (error) {console.log(error);}
}};

export const fetchPost = () => {
  return async (dispatch) => {
    try {const res  = await axios.get(`${apiEndpoint}dashboard/rol`);
        dispatch({type:FETCH_POSTS,payload:res.data})}
    catch (error) {console.log(error);}
}}; 


export const deletePost = (id) =>{ 
 
    return async  (dispatch) => {
  try {await axios.delete(`${apiEndpoint}dashboard/rol/${id}`);
     dispatch({type:DELETE_POST,payload:id,}) ;}
  catch (error) {console.log(error);}
};}

export const updatePost=(id,router,updatedPost)=>{
  
    return async (dispatch)=>{
  try {await axios.patch(`${apiEndpoint}${router}${id}`,updatedPost);
 dispatch({ type:UPDATE_POST, payload:{_id:id, data:updatedPost} })  ;} 
  catch (error) {console.log(error.message);}
}}


export function detailPost (data) {
 
  return  async (dispatch)=> {
    try {await dispatch({type:DETAİL, payload:data})} 
    catch (error) { console.log(error)}
}}


export function detailLisanceAdd (data) {
  return  async (dispatch)=> {
    try {await dispatch({type:LİSANCE, payload:data})} 
    catch (error) { console.log(error)}
}}


