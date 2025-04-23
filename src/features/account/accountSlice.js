import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import accountServices from "./accountServices";

const initialState = {
    user: {},
    posts: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
    meta: null
}

export const getMyAccount = createAsyncThunk("user/my-account",
async(username, thunkAPI)=>{
    try{
        console.log("username in getMyAccount", username)
        return await accountServices.getMyAccount(username);
    }
    catch(err){
        let message = "";
        if(!err?.response){
            message = "No server response"
        }
        else if(err?.response){
            message = err.response.errorMsg
        }
        else{
            message = "Faild to get your account"
        }
        return thunkAPI.rejectWithValue(message)
    }
})

export const getAccount = createAsyncThunk("user/account",
async(username, thunkAPI)=>{
    try{
        console.log("username in getAccount", username);
        return await accountServices.getAccount(username);
    }
    catch(err){
        console.log("error in getAccount", err)
        let message = "";
        if(!err?.response){
            message = "No server response"
        }
        else if(err?.response){
            message = err.response.errorMsg
        }
        else{
            message = "Faild to get this account"
        }
        return thunkAPI.rejectWithValue(message)
    }
})

export const getMyAccountInfo = createAsyncThunk("user/my-account/info",
async(userName, thunkAPI)=>{
    try{
        console.log("userName in getMyAccountInfo", userName)
        return await accountServices.getMyAccountInfo();
    }
    catch(err){
        let message = "";
        if(!err?.response){
            message = "No server response"
        }
        else if(err?.response?.status === 400){
            message = "Missing some post information"
        }
        else if(err?.response?.status === 401){
            message = "You are not logged in"
        }
        else if(err?.response?.status === 403){
            message = "Your session is ended, login again"
        }
        else if(err?.response?.status === 404){
            message = "This account not found"
        }
        else{
            message = "Faild to get your account"
        }
        return thunkAPI.rejectWithValue(message)
    }
})

export const getAccountInfo = createAsyncThunk("user/account/info",
async(userName, thunkAPI)=>{
    try{
        console.log("userName in getAccountInfo", userName)
        return await accountServices.getAccountInfo(userName);
    }
    catch(err){
        let message = "";
        if(!err?.response){
            message = "No server response"
        }
        else if(err?.response?.status === 400){
            message = "Missing some post information"
        }
        else if(err?.response?.status === 404){
            message = "This account not found"
        }
        else{
            message = "Faild to get user account"
        }
        return thunkAPI.rejectWithValue(message)
    }
})

export const getMyPosts = createAsyncThunk("user/my-account/posts",
async(userName, thunkAPI)=>{
    try{
        console.log("userName in getMyPosts", userName)
        return await accountServices.getMyPosts();
    }
    catch(err){
        let message = "";
        if(!err?.response){
            message = "No server response"
        }
        else if(err?.response?.status === 400){
            message = "Missing some post information"
        }
        else if(err?.response?.status === 401){
            message = "You are not logged in"
        }
        else if(err?.response?.status === 403){
            message = "Your session is ended, login again"
        }
        else{
            message = "Faild to get your account"
        }
        return thunkAPI.rejectWithValue(message)
    }
})

export const getUserPosts = createAsyncThunk("user/account/posts",
async(userName, thunkAPI)=>{
    try{
        console.log("userName in getUserPosts", userName)
        return await accountServices.getUserPosts(userName);
    }
    catch(err){
        let message = "";
        if(!err?.response){
            message = "No server response"
        }
        else if(err?.response?.status === 400){
            message = "Missing some post information"
        }
        else if(err?.response?.status === 404){
            message = "user account not found"
        }
        else{
            message = "Faild to get user posts"
        }
        return thunkAPI.rejectWithValue(message)
    }
})

export const uploadVector = createAsyncThunk("user/vector/upload", 
async (formData, thunkAPI)=>{
    try{
        console.log("formData in upload vector", formData)
        return await accountServices.uploadVector(formData);
    }
    catch(err){
        let message = "";
        if(!err?.response){
            message = "No server response"
        }
        else if(err?.response?.status === 400){
            message = "Missing some post information"
        }
        else if(err?.response?.status === 401){
            message = "You are not logged in"
        }
        else if(err?.response?.status === 403){
            message = "Your session is ended, login again"
        }
        else{
            message = "Faild to upload user vector"
        }
        return thunkAPI.rejectWithValue(message)
    }
    
})

export const editAccount = createAsyncThunk("user/account/edit",
async(userInformation, thunkAPI)=>{
    try{
        console.log("userInformation in editAccount function", userInformation)
        return await accountServices.editAccount(userInformation);
    }
    catch(err){
        let message = "";

        if(!err?.response){
            message = "No server response"
        }
        else if(err?.response?.status === 401){
            message = "You are not logged in"
        }
        else if(err?.response?.status === 403){
            message = "Your session is ended, login again"
        }
        else{
            message = "Faild to edit your account"
        }
        return thunkAPI.rejectWithValue(message)
    }
})

export const follow = createAsyncThunk("account/follow",
async(accountId, thunkAPI)=>{
    try{
        console.log("accountId in follow function", accountId)
        return await accountServices.follow(accountId);
    }
    catch(err){
        let message = "";

        if(!err?.response){
            message = "No server response"
        }
        else if(err?.response?.status === 401){
            message = "You are not logged in"
        }
        else if(err?.response?.status === 403){
            message = "Your session is ended, login again"
        }
        else{
            message = err.errorMsg || "Faild to follow this account"
        }
        return thunkAPI.rejectWithValue(message)
    }
})
export const unfollow = createAsyncThunk("account/unfollow",
async(accountId, thunkAPI)=>{
    try{
        console.log("accountId in unfollow function", accountId)
        return await accountServices.unfollow(accountId);
    }
    catch(err){
        let message = "";

        if(!err?.response){
            message = "No server response"
        }
        else if(err?.response?.status === 401){
            message = "You are not logged in"
        }
        else if(err?.response?.status === 403){
            message = "Your session is ended, login again"
        }
        else{
            message = err.errorMsg || "Faild to unfollow this account"
        }
        return thunkAPI.rejectWithValue(message)
    }
})
export const block = createAsyncThunk("account/block",
async(accountId, thunkAPI)=>{
    try{
        console.log("accountId in block function", accountId)
        return await accountServices.block(accountId);
    }
    catch(err){
        let message = "";

        if(!err?.response){
            message = "No server response"
        }
        else if(err?.response?.status === 401){
            message = "You are not logged in"
        }
        else if(err?.response?.status === 403){
            message = "Your session is ended, login again"
        }
        else{
            message = err.errorMsg || "Faild to block this account"
        }
        return thunkAPI.rejectWithValue(message)
    }
})

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {},
  extraReducers: (builder)=>{
    builder
    .addCase(getMyAccount.pending, (state, action)=>{
        state.isLoading= true
        state.isSuccess= false
        state.isError= false
        state.message= ""
        state.meta= {...action.meta, action: "get-my-account"}
    })
    .addCase(getMyAccount.fulfilled, (state, action)=>{
        state.user = {...action.payload}
        state.isLoading= false
        state.isSuccess= true
        state.isError= false
        state.message= ""
    })
    .addCase(getMyAccount.rejected, (state, action)=>{
        state.isLoading= false
        state.isSuccess= false
        state.isError= true
        state.message= action.payload
    })
    .addCase(getAccount.pending, (state, action)=>{
        state.isLoading= true
        state.isSuccess= false
        state.isError= false
        state.message= ""
        state.meta= {...action.meta, action: "get-account"}
    })
    .addCase(getAccount.fulfilled, (state, action)=>{
        state.user = {...action.payload}
        state.isLoading= false
        state.isSuccess= true
        state.isError= false
        state.message= ""
    })
    .addCase(getAccount.rejected, (state, action)=>{
        state.isLoading= false
        state.isSuccess= false
        state.isError= true
        state.message= action.payload
    })
    .addCase(getMyAccountInfo.pending, (state, action)=>{
        state.isLoading= true
        state.isSuccess= false
        state.isError= false
        state.message= ""
    })
    .addCase(getMyAccountInfo.fulfilled, (state, action)=>{
        state.user = {...action.payload}
        state.isLoading= false
        state.isSuccess= true
        state.isError= false
        state.message= ""
    })
    .addCase(getMyAccountInfo.rejected, (state, action)=>{
        state.isLoading= false
        state.isSuccess= false
        state.isError= true
        state.message= action.payload
    })
    .addCase(getAccountInfo.pending, (state, action)=>{
        state.isLoading= true
        state.isSuccess= false
        state.isError= false
        state.message= ""
    })
    .addCase(getAccountInfo.fulfilled, (state, action)=>{
        state.user = {...action.payload}
        state.isLoading= false
        state.isSuccess= true
        state.isError= false
        state.message= ""
    })
    .addCase(getAccountInfo.rejected, (state, action)=>{
        state.isLoading= false
        state.isSuccess= false
        state.isError= true
        state.message= action.payload
    })
    .addCase(getMyPosts.pending, (state, action)=>{
        state.isLoading= true
        state.isSuccess= false
        state.isError= false
        state.message= ""
    })
    .addCase(getMyPosts.fulfilled, (state, action)=>{
        state.posts = [...action.payload]
        state.isLoading= false
        state.isSuccess= true
        state.isError= false
        state.message= ""
    })
    .addCase(getMyPosts.rejected, (state, action)=>{
        state.isLoading= false
        state.isSuccess= false
        state.isError= true
        state.message= action.payload
    })
    .addCase(getUserPosts.pending, (state, action)=>{
        state.isLoading= true
        state.isSuccess= false
        state.isError= false
        state.message= ""
    })
    .addCase(getUserPosts.fulfilled, (state, action)=>{
        state.posts = [...action.payload]
        state.isLoading= false
        state.isSuccess= true
        state.isError= false
        state.message= ""
    })
    .addCase(getUserPosts.rejected, (state, action)=>{
        state.isLoading= false
        state.isSuccess= false
        state.isError= true
        state.message= action.payload
    })
    .addCase(uploadVector.pending, (state, action)=>{
        state.isLoading= true
        state.isSuccess= false
        state.isError= false
        state.message= ""
    })
    .addCase(uploadVector.fulfilled, (state, action)=>{
        state.isLoading= false
        state.isSuccess= true
        state.isError= false
        state.message= ""
    })
    .addCase(uploadVector.rejected, (state, action)=>{
        state.isLoading= false
        state.isSuccess= false
        state.isError= true
        state.message= action.payload
    })
    .addCase(editAccount.pending, (state, action)=>{
        state.isLoading= true
        state.isSuccess= false
        state.isError= false
        state.message= ""
    })
    .addCase(editAccount.fulfilled, (state, action)=>{
        state.isLoading= false
        state.isSuccess= true
        state.isError= false
        state.message= ""
    })
    .addCase(editAccount.rejected, (state, action)=>{
        state.isLoading= false
        state.isSuccess= false
        state.isError= true
        state.message= action.payload
    })
    .addCase(follow.pending, (state, action)=>{
        state.isLoading= true
        state.isSuccess= false
        state.isError= false
        state.message= ""
        state.meta= {...action.meta, action: "follow"}
    })
    .addCase(follow.fulfilled, (state, action)=>{
        state.user= {
            ...state.user, 
            following: [action.payload.followedAccount, ...(state.user?.following ?? [])]
        }
        state.isLoading= false
        state.isSuccess= true
        state.isError= false
        state.message= ""
    })
    .addCase(follow.rejected, (state, action)=>{
        state.isLoading= false
        state.isSuccess= false
        state.isError= true
        state.message= action.payload
    })
    .addCase(unfollow.pending, (state, action)=>{
        state.isLoading= true
        state.isSuccess= false
        state.isError= false
        state.message= ""
        state.meta= {...action.meta, action: "unfollow"}
    })
    .addCase(unfollow.fulfilled, (state, action)=>{
        state.user= {...state.user, following_count: state.user.following_count - 1, following: state.user?.following?.filter(account => account._id.toString() !== action.payload.followerId.toString())}
        state.isLoading= false
        state.isSuccess= true
        state.isError= false
        state.message= ""
    })
    .addCase(unfollow.rejected, (state, action)=>{

        state.isLoading= false
        state.isSuccess= false
        state.isError= true
        state.message= action.payload
    })
    .addCase(block.pending, (state, action)=>{
        state.isLoading= true
        state.isSuccess= false
        state.isError= false
        state.message= ""
        state.meta= {...action.meta, action: "block"}
    })
    .addCase(block.fulfilled, (state, action)=>{
        state.user= {
            ...state.user, 
            blockList: [...action.payload.blockList]
        }
        state.isLoading= false
        state.isSuccess= true
        state.isError= false
        state.message= ""
    })
    .addCase(block.rejected, (state, action)=>{
        state.isLoading= false
        state.isSuccess= false
        state.isError= true
        state.message= action.payload
    })
  } 
})

export const selectAccount = state => state.account;
export default accountSlice.reducer;