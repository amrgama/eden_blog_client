import {configureStore} from "@reduxjs/toolkit"
import authReducer from "./features/auth/authSlice"
import accountReducer from "./features/account/accountSlice"
import postReducer from "./features/post/postSlice"
import postsReducer from "./features/posts/postsSlice"
import commentsReducer from "./features/comment/commentsSlice"
import repliesReducer from "./features/comment/replies/repliesSlice"
export const store = configureStore({
    reducer: {
        auth: authReducer,
        account: accountReducer,
        post: postReducer,
        posts: postsReducer,
        comments: commentsReducer,
        replies: repliesReducer,
    }
})