import axios from "../../api/axios";
import { axiosPrivate } from "../../api/axios";

const register = async(userData)=>{
    const response = await axios.post("/register", JSON.stringify(userData),
    {
        headers: {'Content-Type': "application/json"},
        withCredentials: true
    })
    return response.data
}

const login = async(userData)=>{
    const response = await axios.post("/auth/login", JSON.stringify(userData),
    {
        headers: {'Content-Type': "application/json"},
        withCredentials: true
    })
    return response.data
}

const logout = async()=>{
    const response = await axios.get("/auth/logout",{
        withCredentials: true,
    })
    return response.data
}

const authServices ={
    register,
    login,
    logout,
}

export default authServices