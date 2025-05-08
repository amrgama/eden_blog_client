import { useState } from "react";
import withInterceptors from "../utils/withInterceptors";
import { toast } from "react-toastify";

const usePrivateFetch= (base_url, defaultMethod= "get", apiConfig= {}, navigate) =>{

    const [isIdel, setIsIdel]= useState(true);
    const [isLoading, setIsLoading]= useState(false);
    const [isSuccess, setIsSuccess]= useState(false);
    const [isError, setIsError]= useState(false);
    const [errorMsg, setErrorMsg]= useState("");
    
    async function callApi(url, data= {}, method= defaultMethod){

        try{
            setIsIdel(false);
            setIsLoading(true);
            const axiosWithInterceptors = await withInterceptors();
            let api= "";
            if(!!base_url && !!url){
                api= base_url + url;
            }else if(!!base_url && !!!url){
                api= base_url;
            }
            else if(!!!base_url && !!url){
                api= url;
            }
            
            const response = await axiosWithInterceptors[`${method ?? "get"}`](api, data, apiConfig);
            setIsLoading(false);
            setIsSuccess(true);

            return response.data;
        }
        catch(err){
            console.log("error")
            setIsLoading(false);
            setIsError(true);
            setErrorMsg(err);
            console.log("error in usefetch", err);
            let message= "";
            if(!err?.response){
                message = "No server response"
            }
            else if(err?.response?.status === 400){
                message = "Missing some post information"
            }
            else if(err?.response?.status === 401){
                message = "You are not logged in"
                if(!!navigate) navigate("/login")
            }
            else if(err?.response?.status === 403){
                message = "Your session is ended, log in again"
                if(!!navigate) navigate("/login")
            }
            else{
                message = err?.message
            }
            toast.error(message);
            return err;
        }
    }

    return {
        callApi,
        isIdel,
        isLoading,
        isSuccess,
        isError,
        errorMsg
    }
}

export default usePrivateFetch;