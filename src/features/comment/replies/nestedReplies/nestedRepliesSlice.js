import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import nestedRepliesServices from "./nestedRepliesServices";


const initialState= {
    nestedReplies: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ""
}

export const createReplyToReply = createAsyncThunk("replies/nestedReplies/createOne", 
async ({postId, commentId, replyId, nestedReply}, thunkAPI)=>{
    try{
        console.log("postId, commentId, replyId, nestedReply in nestedReply", postId, commentId, replyId, nestedReply)
        return await nestedRepliesServices.createReplyToReply({postId, commentId, replyId, nestedReply});
    }
    catch(err){
        let message = "";
        console.log("err in create reply on reply", err)
        if(!err?.response){
            message = "No server response"
        }
        else if(err?.response?.status === 401){
            message = "You are not logged in"
        }
        else if(err?.response?.status === 403){
            message = "Your session is ended, log in again"
        }
        else{
            message = "Faild to create reply on reply"
        }
        return thunkAPI.rejectWithValue(message)
    }
    
})

export const getNestedReplies = createAsyncThunk("replies/nestedReplies/get", 
async ({postId, commentId, replyId}, thunkAPI)=>{
    try{
        console.log("in get replies to reply: postId", postId, "commentId", commentId, "replyId", replyId)
        return await nestedRepliesServices.getNestedReplies({postId, commentId, replyId});
    }
    catch(err){
        let message = "";
        console.log("err in get replies to reply", err)
        if(!err?.response){
            message = "No server response"
        }
        else if(err?.response?.status === 401){
            message = "You are not logged in"
        }
        else if(err?.response?.status === 403){
            message = "Your session is ended, log in again"
        }
        else{
            message = "Faild to get replies to reply"
        }
        return thunkAPI.rejectWithValue(message)
    }
    
})

const nestedRepliesSlice = createSlice({
    name: "nestedReplies",
    initialState,
    reducers: {},
    extraReducers: (builder)=> {
        builder
        .addCase(createReplyToReply.pending, (state, action)=>{
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";
        })
        .addCase(createReplyToReply.fulfilled, (state, action)=>{
            state.nestedReplies = [action.payload, ...state.nestedReplies];
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.message = "";
        })
        .addCase(createReplyToReply.rejected, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(getNestedReplies.pending, (state, action)=>{
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";
        })
        .addCase(getNestedReplies.fulfilled, (state, action)=>{
            state.nestedReplies = action.payload;
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.message = "";
        })
        .addCase(getNestedReplies.rejected, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.payload;
        })
    }
})

export const selectNestedReplies = state => state.nestedReplies;
export default nestedRepliesSlice.reducer