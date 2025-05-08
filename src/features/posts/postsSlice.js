import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postsServices from "./postsServices";

const initialState ={
    posts: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ""
}

export const getMyPosts = createAsyncThunk("user/myAccount/posts",
async({skip, limit}, thunkAPI)=>{
    try{
        console.log("skip and limit in getMyPosts", skip, limit)
        return await postsServices.getMyPosts(skip, limit);
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
async({userName, query}, thunkAPI)=>{
    try{
        console.log("userName in getUserPosts", userName, "query", query)
        return await postsServices.getUserPosts({userName, query});
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

export const getPostsByQuery = createAsyncThunk("posts/get-by-query",
async(query, thunkAPI)=>{
    try{
        console.log("query in getPosts by query", query)
        return await postsServices.getPostsByQuery(query);
    }
    catch(err){
        let message = "";
        if(!err?.response){
            message = "No server response"
        }
        else if(err?.response?.status === 400){
            message = err.response.data
        }
        else{
            message = "Faild to get user posts"
        }
        return thunkAPI.rejectWithValue(message)
    }
})

export const getMorePosts = createAsyncThunk("posts/more",
async({userId, query}, thunkAPI)=>{
    try{
        // console.log("userId in getMorePosts", userId, "query", query)
        return await postsServices.getMorePosts({userId, query});
    }
    catch(err){
        let message = "";
        if(!err?.response){
            message = "No server response"
        }
        else if(err?.response?.status === 400){
            message = err.response.data
        }
        else{
            message = "Faild to get blogger posts"
        }
        return thunkAPI.rejectWithValue(message)
    }
})

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(getMyPosts.fulfilled, (state, action)=>{
            state.posts = action.payload.posts
            state.meta= {
                ...state.meta,
                limit: action.payload.limit,
                page: action.payload.page,
                pageCount: action.payload.pageCount
            }
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
            state.posts = action.payload.posts
            state.meta= {
                ...state.meta,
                limit: action.payload.limit,
                page: action.payload.page,
                pageCount: action.payload.pageCount
            }
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
        .addCase(getPostsByQuery.pending, (state, action)=>{
            state.isLoading= true
            state.isSuccess= false
            state.isError= false
            state.message= ""
            state.meta= {...state.meta, action: "get_posts_by_query"}
        })
        .addCase(getPostsByQuery.fulfilled, (state, action)=>{
            state.posts = action.payload.posts;
            state.meta= {
                ...state.meta,
                limit: action.payload.limit,
                page: action.payload.page,
                pageCount: action.payload.pageCount
            }
            state.isLoading= false
            state.isSuccess= true
            state.isError= false
            state.message= ""
        })
        .addCase(getPostsByQuery.rejected, (state, action)=>{
            state.isLoading= false
            state.isSuccess= false
            state.isError= true
            state.message= action.payload
        })
        .addCase(getMorePosts.pending, (state, action)=>{
            state.isLoading= true
            state.isSuccess= false
            state.isError= false
            state.message= ""
            state.meta= {...state.meta, action: "get_more_posts"}
        })
        .addCase(getMorePosts.fulfilled, (state, action)=>{
            state.posts = [...state.posts, ...action.payload.posts]
            state.meta= {
                ...state.meta,
                limit: action.payload.limit,
                page: action.payload.page,
                pageCount: action.payload.pageCount
            }
            state.isLoading= false
            state.isSuccess= true
            state.isError= false
            state.message= ""
        })
        .addCase(getMorePosts.rejected, (state, action)=>{
            state.isLoading= false
            state.isSuccess= false
            state.isError= true
            state.message= action.payload
        })
    }
})

export const selectPosts = state => state.posts;
export default postsSlice.reducer;