import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import commentServices from "./commentsServices";

const initialState= {
    comments: {},
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ""
}

export const createComment = createAsyncThunk("comments/create", 
async (comment, thunkAPI)=>{
    try{
        console.log("postId and comment", comment)
        return await commentServices.create(comment);
    }
    catch(err){
        let message = "";
        console.log("err in create comment", err)
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
            message = "Faild to create comment"
        }
        return thunkAPI.rejectWithValue(message)
    }
    
})

export const getComments = createAsyncThunk("comments/getComments", 
async ({postId, query}, thunkAPI)=>{
    try{
        console.log("postId in fetch comments", postId, "query", query)
        return await commentServices.getComments({postId, query});
    }
    catch(err){
        let message = "";
        console.log("err in fetech comments", err)
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
            message = "Faild to fetech comments"
        }
        return thunkAPI.rejectWithValue(message)
    }
    
})

export const getCommentMainReplies = createAsyncThunk("comments/getMainReplies", 
async ({postId, commentId, query}, thunkAPI)=>{
    try{
        console.log("postId in fetch comments main replies", postId, "commentId", commentId, "query")
        return await commentServices.getMainReplies({postId, commentId, query});
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

export const createReply = createAsyncThunk("comments/reply/create", 
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

const commentSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {
        addComment: (state, action)=>{
            state.comments = [action.payload, ...state.comments]
        }
    },
    extraReducers: (builder)=> {
        builder
        .addCase(createComment.pending, (state, action)=>{
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";
        })
        .addCase(createComment.fulfilled, (state, action)=>{
            state.comments = {...state.comments};
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.message = "";
        })
        .addCase(createComment.rejected, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(getComments.pending, (state, action)=>{
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";
        })
        .addCase(getComments.fulfilled, (state, action)=>{
            state.comments = action.payload
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.message = "";
        })
        .addCase(getComments.rejected, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(createReply.pending, (state, action)=>{
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";
        })
        .addCase(createReply.fulfilled, (state, action)=>{
            state.comments = action.payload;
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
        .addCase(getCommentMainReplies.pending, (state, action)=>{
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";
        })
        .addCase(getCommentMainReplies.fulfilled, (state, action)=>{
            state.comments = action.payload;
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.message = "";
        })
        .addCase(getCommentMainReplies.rejected, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.payload;
        })
    }
})

export const selectComments = state => state.comments;
export const {addComment}= commentSlice.actions;
export default commentSlice.reducer