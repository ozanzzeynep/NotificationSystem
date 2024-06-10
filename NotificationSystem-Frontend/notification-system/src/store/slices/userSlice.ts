

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../constant";


type loginValues = {
    email:string,
    password:string,
}
type registerValues = {
    nameSurname: string,
    email: string,
    password: string,
}

export function getUser (){
    var user = localStorage.getItem('user');
    if(user){
        user = JSON.parse(user);
    }else{
        user = null;
    }
    return user;
}
export const loginUser = createAsyncThunk(
    'login',
    async(data: loginValues)=>{
        const request = await axios.post(BACKEND_BASE_URL + "/api/auth/authenticate",data);
        const response = await request.data;
        localStorage.setItem('user',JSON.stringify(response));
        return response;
    }
);


export const registerUser = createAsyncThunk(
    'register',
    async(data: registerValues) =>{
        const request = await axios.post(BACKEND_BASE_URL + "/api/auth/register",data);
        const response = await request.data;
        localStorage.setItem('user', JSON.stringify(response));
        return response;
    }
)
export const logout = createAsyncThunk(
    'logout',
    async(_,{rejectWithValue})=>{
        localStorage.removeItem("userInfo");
        return true;
    }
)

const userSlice = createSlice({
    name:'user',
    initialState:{
        loading:false,
        user: null,
        error: null,
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(loginUser.pending,(state)=>{
            state.loading = true;
            state.user = null;
            state.error = null;
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.loading = false;
            state.user = action.payload;
            state.error = null;
        })
        .addCase(loginUser.rejected,(state:any,action)=>{
            state.loading = false;
            state.user = null;
            console.log(action.error.message);
            if(action.error.message === 'Request failed with status code 401'){
                state.error = 'Access Denied! Invalid email and password';
            }else{
                state.error = action.error.message;
            }
        })
    }
});

export default userSlice.reducer;