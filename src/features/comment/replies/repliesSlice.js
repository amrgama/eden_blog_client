import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import repliesServices from "./repliesServices";

const initialState= {
    replies: {},
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ""
}

export const createReply = createAsyncThunk("comments/replies/create", 
async (reply, thunkAPI)=>{
    try{
        console.log("postId and reply", reply)
        return await commentServices.createReply(reply);
    }
    catch(err){
        let message = "";
        console.log("err in create reply on comment", err)
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
            message = "Faild to create reply on comment"
        }
        return thunkAPI.rejectWithValue(message)
    }
    
})

export const getMainReplies = createAsyncThunk("comments/replies/getMainReplies", 
async ({postId, commentId, query}, thunkAPI)=>{
    try{
        console.log("postId in fetch comments main replies", postId, "commentId", commentId, "query", query)
        return await repliesServices.getMainReplies({postId, commentId, query});
    }
    catch(err){
        let message = "";
        console.log("err in fetech comments replies", err)
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
            message = "Faild to fetech comments replies"
        }
        return thunkAPI.rejectWithValue(message)
    }
    
})

export const createReplyToReply = createAsyncThunk("comments/replies/create", 
async (reply, thunkAPI)=>{
    try{
        console.log("postId and reply", reply)
        return await repliesServices.createReplyToReply(reply);
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

export const getRepliesToReply = createAsyncThunk("comments/replies/getMainReplies", 
async ({postId, commentId, replyId}, thunkAPI)=>{
    try{
        console.log("in get replies to reply: postId", postId, "commentId", commentId, "replyId", replyId)
        return await repliesServices.getRepliesToReply({postId, commentId, replyId});
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

const repliesSlice = createSlice({
    name: "replies",
    initialState,
    reducers: {},
    extraReducers: (builder)=> {
        builder
        .addCase(createReply.pending, (state, action)=>{
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";
        })
        .addCase(createReply.fulfilled, (state, action)=>{
            state.replies = action.payload;
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.message = "";
        })
        .addCase(createReply.rejected, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(getMainReplies.pending, (state, action)=>{
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";
        })
        .addCase(getMainReplies.fulfilled, (state, action)=>{
            state.replies = action.payload;
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.message = "";
        })
        .addCase(getMainReplies.rejected, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.payload;
        })
        // .addCase(createReplyToReply.pending, (state, action)=>{
        //     state.isLoading = true;
        //     state.isSuccess = false;
        //     state.isError = false;
        //     state.message = "";
        // })
        // .addCase(createReplyToReply.fulfilled, (state, action)=>{
        //     state.replies = action.payload;
        //     state.isLoading = false;
        //     state.isSuccess = true;
        //     state.isError = false;
        //     state.message = "";
        // })
        // .addCase(createReplyToReply.rejected, (state, action)=>{
        //     state.isLoading = false;
        //     state.isSuccess = false;
        //     state.isError = true;
        //     state.message = action.payload;
        // })
    }
})

export const selectReplies = state => state.replies;
// export const {addComment}= repliesSlice.actions;
export default repliesSlice.reducer