import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authServices from "./authServices";

const initialState = {
    user: JSON.parse(window.localStorage.getItem("user")) ?? {},
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
    meta: null
}

export const register = createAsyncThunk("auth/register", 
async(user, thunkAPI)=>{
    try{
        return await authServices.register(user)
    }
    catch(err){
        let message = "";
        if(!err?.response){
            message = "No server response"
        }
        else if(err?.response?.status === 400){
            message = "There is some user information missing"
        }
        else if(err?.response?.status === 401){
            window.localStorage.removeItem("user");
        }
        else if(err?.response?.status === 409){
            message = "Username or email used before"
        }
        else{
            message = "Signup faild"
        }
        return thunkAPI.rejectWithValue(message)
    }
})

export const login = createAsyncThunk("auth/login",
async(user, thunkAPI)=>{

    try{
        const response = await authServices.login(user)

        console.log("response in login", response)

        window.localStorage.setItem("user", JSON.stringify(response))
        window.localStorage.removeItem("guest");
        return response;
    }
    catch(err){
        let message = "";
        if(!err?.response){
            message = "No server response"
        }
        else if(err?.response?.status === 400){
            message = "There is some user information missing"
        }
        else if(err?.response?.status === 401){
            message = "Uncorrect email or password"
        }
        else{
            message = "Login faild"
        }
        return thunkAPI.rejectWithValue(message)
    }
})

export const logout = createAsyncThunk("auth/logout", async()=>{

    const response = await authServices.logout()

    console.log("response in logout", response)

    window.localStorage.removeItem("user")
    
    return response;
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state)=>{
            state.user= {}
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message= ""
        },
        resetAccessToken: (state, action)=>{
            state.user= {...state.user, accessToken: action.payload}
        },

    },
    extraReducers: (builder)=>{
        builder
        .addCase(register.pending, (state)=>{
            state.isLoading = true
            state.isSuccess = false
            state.isError = false
            state.message= ""
        })
        .addCase(register.fulfilled, (state, action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            state.message= ""
            state.meta= {...action.meta, action: "register"}
        })
        .addCase(register.rejected, (state, action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message= action.payload
        })
        .addCase(login.pending, (state)=>{
            state.isLoading = true
            state.isSuccess = false
            state.isError = false
            state.message= ""
        })
        .addCase(login.fulfilled, (state, action)=>{
            state.user = action.payload
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            state.message= ""
            state.meta= {...action.meta, action: "logIn"}
        })
        .addCase(login.rejected, (state, action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message= action.payload
        })
        .addCase(logout.pending, (state)=>{
            state.isLoading = true
            state.isSuccess = false
            state.isError = false
            state.message= ""
        })
        .addCase(logout.fulfilled, (state, action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            state.message= ""
            state.meta= {...action.meta, action: "logOut"}
        })
    }
})

export const selectAuth = (state) => state.auth;
export const {reset, resetAccessToken} = authSlice.actions;
export default authSlice.reducer