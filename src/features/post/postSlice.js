import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postServices, { create, edit, getPostById, remove, save, upload } from "./postServices";

const initialState ={
    post: {},
    isIdel: true,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
    meta: null
}

export const uploadImg = createAsyncThunk("post/upload-image", 
async (formData, thunkAPI)=>{
    try{
        console.log("formData in upload image", formData)
        return await postServices.upload(formData);
    }
    catch(err){
        let message = "";
        console.log("err in create post", err)
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
            message = "Your session is ended, log in again"
        }
        else{
            message = "Faild to create post"
        }
        return thunkAPI.rejectWithValue(message)
    }
    
})

export const createPost = createAsyncThunk("post/create", 
async (post, thunkAPI)=>{
    try{
        console.log("postData in create", post)
        return await postServices.create(post);
    }
    catch(err){
        let message = "";
        console.log("err in create post", err)
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
            message = "Your session is ended, log in again"
        }
        else{
            message = "Faild to create post"
        }
        return thunkAPI.rejectWithValue(message)
    }
    
})

export const editPost = createAsyncThunk("post/edit", 
async (postData, thunkAPI)=>{
    try{
        console.log("postData in edit", postData)
        return await postServices.edit(postData);
    }
    catch(err){
        let message = "";
        console.log("err in create post", err)
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
            message = "Your session is ended, log in again"
        }
        else{
            message = "Faild to edit post"
        }
        return thunkAPI.rejectWithValue(message)
    }
    
})

export const getPost = createAsyncThunk("post/get", 
async (postId, thunkAPI)=>{
    try{
        console.log("postId in fetch post", postId)
        return await postServices.getPostById(postId);
    }
    catch(err){
        let message = "";
        console.log("err in fetech post", err)
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
            message = "Faild to fetech post"
        }
        return thunkAPI.rejectWithValue(message)
    }
    
})

export const increaseReadings = createAsyncThunk("post/increase-readings", 
async ({postId, isReader}, thunkAPI)=>{
    try{
        console.log("postId and isReader", postId, isReader)
        return await postServices.incReadingsByOne(postId, isReader);
    }
    catch(err){
        let message = "";
        console.log("err in increase reading by one", err)
        if(!err?.response){
            message = "No server response"
        }
        else if(err?.response?.status === 400){
            message = err.respons.errorMsg
        }
        else{
            message = "Faild to increase readings by one"
        }
        return thunkAPI.rejectWithValue(message)
    }
    
})

export const react = createAsyncThunk("post/react", 
async ({postId, userId}, thunkAPI)=>{
    try{
        console.log("postId and userId", postId, userId)
        return await postServices.reactOnPost(postId, userId);
    }
    catch(err){
        let message = "";
        console.log("err in fetech post", err)
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
            message = "Faild to react on post"
        }
        return thunkAPI.rejectWithValue(message)
    }
    
})

export const deletePost = createAsyncThunk("post/delete", 
async (postId, thunkAPI)=>{
    try{
        console.log("post id", postId)
        return await postServices.remove(postId);
    }
    catch(err){
        let message = "";
        console.log("err in delete post", err)
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
            message = "Your session is ended, log in again"
        }
        else{
            message = "Faild to delete post"
        }
        return thunkAPI.rejectWithValue(message)
    }
    
})

export const savePost = createAsyncThunk("post/save", 
async (postId, thunkAPI)=>{
    try{
        console.log("postId in save post", postId)
        return await postServices.save(postId);
    }
    catch(err){
        let message = "";
        console.log("err in fetech post", err)
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
            message = "Faild to save post"
        }
        return thunkAPI.rejectWithValue(message)
    }
    
})

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        reset: (state)=>{
            state.post= {}
            state.isLoading= false
            state.isSuccess= false
            state.isError= false
            state.message= ""
        },
        setPostData: (state, action)=>{
            state = action.payload
        },
        updatePostData: (state, action)=>{
            state = {...state, ...action.payload}
        }
    },
    extraReducers: (builder)=>{
        builder
        .addCase(uploadImg.pending, (state, action)=>{
            state.isIdel= false
            state.isLoading= true
            state.isSuccess= false
            state.isError= false
            state.message= ""
        })
        .addCase(uploadImg.fulfilled, (state, action)=>{
            state.isIdel= false
            state.isLoading= false
            state.isSuccess= true
            state.isError= false
            state.message= ""
        })
        .addCase(uploadImg.rejected, (state, action)=>{
            state.isIdel= false
            state.isLoading= false
            state.isSuccess= false
            state.isError= true
            state.message= action.payload
        })
        .addCase(createPost.pending, (state, action)=>{
            state.isIdel= false
            state.isLoading= true
            state.isSuccess= false
            state.isError= false
            state.message= ""
            state.meta= {...action.meta, "action": "create_post"}
        })
        .addCase(createPost.fulfilled, (state, action)=>{
            state.isIdel= false
            state.isLoading= false
            state.isSuccess= true
            state.isError= false
            state.message= ""
        })
        .addCase(createPost.rejected, (state, action)=>{
            state.isIdel= false
            state.isLoading= false
            state.isSuccess= false
            state.isError= true
            state.message= action.payload
        })
        .addCase(editPost.pending, (state, action)=>{
            state.isIdel= false
            state.isLoading= true
            state.isSuccess= false
            state.isError= false
            state.message= ""
            state.meta= {...action.meta, "action": "edit_post"}
        })
        .addCase(editPost.fulfilled, (state, action)=>{
            state.isIdel= false
            state.isLoading= false
            state.isSuccess= true
            state.isError= false
            state.message= ""
        })
        .addCase(editPost.rejected, (state, action)=>{
            state.isIdel= false
            state.isLoading= false
            state.isSuccess= false
            state.isError= true
            state.message= action.payload
        })
        .addCase(deletePost.pending, (state, action)=>{
            state.isIdel= false
            state.isLoading= true
            state.isSuccess= false
            state.isError= false
            state.message= ""
        })
        .addCase(deletePost.fulfilled, (state, action)=>{
            state.post= {}
            state.isIdel= false
            state.isLoading= false
            state.isSuccess= true
            state.isError= false
            state.message= ""
            state.meta= action.meta
        })
        .addCase(deletePost.rejected, (state, action)=>{
            state.isIdel= false
            state.isLoading= false
            state.isSuccess= false
            state.isError= true
            state.message= action.payload
        })
        .addCase(getPost.pending, (state, action)=>{
            state.isIdel= false
            state.isLoading= true
            state.isSuccess= false
            state.isError= false
            state.message= ""
            state.meta= {...action.meta, "action": "get_post"}
        })
        .addCase(getPost.fulfilled, (state, action)=>{
            state.post = {...action.payload}
            state.isIdel= false
            state.isLoading= false
            state.isSuccess= true
            state.isError= false
            state.message= ""
        })
        .addCase(getPost.rejected, (state, action)=>{
            state.isIdel= false
            state.isLoading= false
            state.isSuccess= false
            state.isError= true
            state.message= action.payload
        })
        .addCase(react.rejected, (state, action)=>{
            state.message = action.payload
        })
        .addCase(savePost.rejected, (state, action)=>{
            state.message = action.payload
        })
    }
})

export const selectPost = state => state.post;
export const {reset, setPostData, updatePostData} = postSlice.actions;
export default postSlice.reducer;