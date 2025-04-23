import axios from "../../api/axios";
import withInterceptors from "../../utils/withInterceptors";

const getAccount = async(username)=>{
    console.log("userName in accountinfo service", username)
    const response = await axios
    .get(`/user/account?username=${username}`)
    console.log("response in get my account", response)
    return response.data;
}

const getMyAccount = async(username)=>{
    console.log("userName in accountinfo service", username)
    const axiosWithInterceptors = await withInterceptors();
    const response = await axiosWithInterceptors
    .get(`/user/my-account?username=${username}`)
    console.log("response in get my account", response)
    return response.data;
}

const getAccountInfo = async(userName)=>{
    console.log("userName in accountinfo service", userName)
    const axiosWithInterceptors = await withInterceptors();
    const response = await axiosWithInterceptors
    .get(`/user/${userName}/accountInfo`)
    console.log("response in get user account", response)
    return response.data;
}

const getMyAccountInfo = async()=>{
    const axiosWithInterceptors = await withInterceptors();
    const response = await axiosWithInterceptors
    .get(`/user/myAccountInfo`)
    console.log("response in get my account", response)
    return response.data;
}

const getUserPosts = async(userName)=>{
    console.log("userName in getUserPosts service", userName)
    const response = await axios
    .get(`/user/${userName}/userPosts`)
    console.log("response in getUserPosts", response)
    return response.data;
}

const getMyPosts = async()=>{
    const axiosWithInterceptors = await withInterceptors();
    const response = await axiosWithInterceptors
    .get(`/user/myPosts`)
    console.log("response in get myPosts", response)
    return response.data;
}

const uploadVector = async(formData)=>{
    const axiosWithInterceptors = await withInterceptors();
    const response = await axiosWithInterceptors
    .post("/file/upload",formData, {
        headers: {"content-type": "multipart/form-data"}
    })
    // .then(res=> console.log("res",res))
    console.log("response in upload user vector", response)
    return response.data;
}

const editAccount = async(userInformation)=>{
    const axiosWithInterceptors = await withInterceptors();
    const response = await axiosWithInterceptors
        .put(`/user/account/edit`,JSON.stringify({...userInformation}))
        console.log("response in edit user account", response)
        return response.data;
    
}

const follow = async(accountId)=>{
    const axiosWithInterceptors = await withInterceptors();
    const response = await axiosWithInterceptors
        .put(`/user/${accountId}/follow`, {})
        console.log("response in follow user account", response)
        return response.data;
}
const unfollow = async(accountId)=>{
    const axiosWithInterceptors = await withInterceptors();
    const response = await axiosWithInterceptors
        .put(`/user/${accountId}/unfollow`, {})
        console.log("response in unfollow user account", response)
        return response.data;
}

const block = async(accountId)=>{
    const axiosWithInterceptors = await withInterceptors();
    const response = await axiosWithInterceptors
        .put(`/user/${accountId}/block`, {})
        console.log("response in block user account", response)
        return response.data;
}

export default {
    getAccount,
    getMyAccount,
    getAccountInfo,
    getMyAccountInfo,
    getMyPosts,
    getUserPosts,
    uploadVector,
    editAccount,
    follow,
    unfollow,
    block
}