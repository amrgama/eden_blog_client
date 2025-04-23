// import { axiosPrivate } from "../../api/axios";
import axios from "../../api/axios";
import withInterceptors from "../../utils/withInterceptors";

export const upload = async(formData)=>{
    const axiosWithInterceptors = await withInterceptors();
    const response = await axios
    .post("/file/upload",formData, {
        headers: {"content-type": "multipart/form-data"}
    })
    // .then(res=> console.log("res",res))
    console.log("response in upload image", response)
    return response.data;
}

export const create = async(postData)=>{
    const axiosWithInterceptors = await withInterceptors();
    const response = await axiosWithInterceptors
    .post("/post/create",JSON.stringify({...postData}))
    // .then(res=> console.log("res",res))
    console.log("response in create", response)
    return response.data;
}

export const edit = async({id, ...rest})=>{
    const axiosWithInterceptors = await withInterceptors();
    const response = await axiosWithInterceptors
    .put(`/post/edit/${id}`,JSON.stringify({...rest}))
    console.log("response in edit", response)
    return response.data;
}

export const reactOnPost = async(postId, userId)=>{
    const axiosWithInterceptors = await withInterceptors();
    const response = await axiosWithInterceptors
    .put(`/post/react?postId=${postId}&userId=${userId}`, JSON.stringify({}), {
        headers: {
            'content-type': "application/json",
        },
        withCredentials: true
    });
    console.log("response in react", response)
    return response.data;
}

export const incReadingsByOne = async(postId, isReader)=>{
    const response = await axios
    .put(`/post/increase-readings?postId=${postId}&isReader=${isReader}`);
    console.log("response in increase readings", response)
    return response.data;
}

export const save = async(postId)=>{
    const axiosWithInterceptors = await withInterceptors();
    const response = await axiosWithInterceptors
    .put(`/post/save/${postId}`)
    console.log("response in save", response)
    return response.data;
}

export const remove = async(id)=>{
    const axiosWithInterceptors = await withInterceptors();
    const response = await axiosWithInterceptors
    .delete(`/post/delete/${id}`)
    console.log("response in edit", response)
    return response.data;
}

export const getPostById = async(postId)=>{
    // const axiosWithInterceptors = await withInterceptors();
    const response = await axios
    .get(`/post/${postId}`,{
        headers: {
            'content-type': "application/json",
        },
    })
    console.log("response in getPostById", response)
    return response.data;
}

export const getUserPosts = async({userName, query: {skip, limit}})=>{
    console.log("userName in getUserPosts service", userName)
    const response = await axios
    .get(`/user/${userName}/userPosts?skip=${skip}&&limit=${limit}`)
    console.log("response in getUserPosts", response)
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
    getPostById,
    getMyPosts,
    getUserPosts,
    upload,
    create,
    edit,
    incReadingsByOne,
    reactOnPost,
    save,
    remove,
}