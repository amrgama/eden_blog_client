import axios from "../../api/axios";
import withInterceptors from "../../utils/withInterceptors";

const create = async({postId, content, replayTo})=>{
    const axiosWithInterceptors = await withInterceptors();
    const response = await axiosWithInterceptors
    .put(`/post/${postId}/userComment/create`, JSON.stringify({postId, content, replayTo}), {
        headers: {
            'content-type': "application/json",
        },
        withCredentials: true
    });
    console.log("response in comment", response)
    return response.data;
}

const getComments = async({postId, query: {limit, skip}})=>{
    // const axiosWithInterceptors = await withInterceptors();
    const response = await axios
    .get(`/post/${postId}/comments?limit=${limit}&&skip=${skip}`,{
        headers: {
            'content-type': "application/json",
        },
    })
    console.log("response in get Comments", response)
    return response.data;
}

const createReply = async({postId, commentId, content})=>{
    const axiosWithInterceptors = await withInterceptors();
    const response = await axiosWithInterceptors
    .put(`/post/${postId}/comment/${commentId}/reply/create`, JSON.stringify({content}), {
        headers: {
            'content-type': "application/json",
        },
        withCredentials: true
    });
    console.log("response in comment", response)
    return response.data;
}

const getMainReplies = async({postId, commentId, query:{limit, skip}})=>{
    const axiosWithInterceptors = await withInterceptors();
    const response = await axiosWithInterceptors
    .get(`/post/${postId}/comment/${commentId}/replies?limit=${limit}&&skip=${skip}`, {
        headers: {
            'content-type': "application/json",
        }
    });
    console.log("response in comment replies", response)
    return response.data;
}

export default {
    create,
    getComments,
    createReply,
    getMainReplies
}