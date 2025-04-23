import axios from "../../../../api/axios";
import withInterceptors from "../../../../utils/withInterceptors";

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

const getNestedReplies = async({postId, commentId, replyId})=>{
    const response = await axios
    .get(`/post/${postId}/comment/${commentId}/reply/${replyId}/subReplies`, {
        headers: {
            'content-type': "application/json",
        }
    });
    console.log("response in get replies to reply", response)
    return response.data;
}


export default {
    createReplyToReply,
    getNestedReplies
}