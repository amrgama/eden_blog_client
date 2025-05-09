import { useSelector } from "react-redux";
import axios, { axiosPrivate } from "../api/axios";
import useRefreshToken from "./useRefreshToken";
import { useEffect } from "react";
import { selectUser } from "../features/auth/authSlice";

const useAxiosPrivate = async()=>{
    const user = useSelector(selectUser)
    const refresh = useRefreshToken()
    useEffect(()=>{

        const requestIntercept = axiosPrivate.interceptors.request.use(
            config =>{
                if(!config.headers['Authorization']){
                    config.headers['Authorization'] = `Bear ${user.accessToken}`
                }
                return config;
            }, (error)=> Promise.reject(error)
        )

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async(error)=>{
                const prevRequest = error?.config
                if(error?.response?.status === 403 && !prevRequest.sent){
                    prevRequest.sent = true;
                    const newAccessToken = await refresh()

                    prevRequest.headers["Authorization"] = `Bear ${newAccessToken}`
                    axiosPrivate(prevRequest)
                }
                else if(error?.response?.status === 401 && !prevRequest.sent){
                    window.localStorage.removeItem("user");
                }
                return Promise.reject(error);
            }
        )

        return ()=>{
            axiosPrivate.interceptors.request.eject(requestIntercept)
            axiosPrivate.interceptors.response.eject(responseIntercept)
        }
    }, [user, refresh])
}

export default useAxiosPrivate