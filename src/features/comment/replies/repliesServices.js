import axios from "../../../api/axios";
import withInterceptors from "../../../utils/withInterceptors";

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

const createReplyToReply = async({postId, commentId, replyId, replyToId, content})=>{
    const axiosWithInterceptors = await withInterceptors();
    const response = await axiosWithInterceptors
    .post(`/post/${postId}/comment/${commentId}/reply/${replyId}/subReply/create`, JSON.stringify({content, replyToId}), {
        headers: {
            'content-type': "application/json",
        },
        withCredentials: true
    });
    console.log("response in create reply to reply", response)
    return response.data;
}

const getRepliesToReply = async({postId, commentId, replyId})=>{
    const response = await axios
    .get(`/post/${postId}/comment/${commentId}/reply/${replyId}/subReplies`, {
        headers: {
            'content-type': "application/json",
        }
    });
    console.log("response in get replies to reply", response)
    return response.data;
}

export default{
    createReply,
    getMainReplies,
    createReplyToReply,
    getRepliesToReply
}