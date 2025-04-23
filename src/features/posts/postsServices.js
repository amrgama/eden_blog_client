import axios from "../../api/axios";
import withInterceptors from "../../utils/withInterceptors";

export const getMorePosts = async({userId, query: {skip, limit}})=>{
    console.log("userId in getMorePosts service", userId)
    const response = await axios
    .get(`/post/more?userId=${userId}&&skip=${skip}&&limit=${limit}`)
    console.log("response in get more posts", response)
    return response.data.posts;
}

export const getUserPosts = async({userName, query: {skip, limit}})=>{
    console.log("userName in getUserPosts service", userName)
    const response = await axios
    .get(`/user/${userName}/userPosts?skip=${skip}&&limit=${limit}`)
    console.log("response in getUserPosts", response)
    return response.data.posts;
}

export const getPostsByQuery = async(query)=>{
    // const {category, tag, skip, limit}= query;
    // const findByKey= (!!category)? "category": "tag";
    // const findByValue= (!!category)? category : tag;
    // console.log("findByKey", findByKey, "findByValue", findByValue)
    // const response = await axios
    // .get(`/post?${findByKey}=${findByValue}&&skip=${skip}&&limit=${limit}`, {params: query})
    const response = await axios
    .get(`/post`, {params: query})
    console.log("response in getPostsByQuery", response)
    return response.data.posts;
}

export const getMyPosts = async(skip, limit)=>{
    const axiosWithInterceptors = await withInterceptors();
    const response = await axiosWithInterceptors
    .get(`/user/myPosts?skip=${skip}&&limit=${limit}`)
    console.log("response in get myPosts", response)
    return response.data.posts;
}

export default {
    getMyPosts,
    getUserPosts,
    getPostsByQuery,
    getMorePosts
}