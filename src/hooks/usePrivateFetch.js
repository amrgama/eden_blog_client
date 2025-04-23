import { useState } from "react";
import withInterceptors from "../utils/withInterceptors";

const usePrivateFetch= (url, method, apiConfig) =>{
    
    if(!!!url){
        throw new Error("You must input api variable");
    }

    const [isIdel, setIsIdel]= useState(true);
    const [isLoading, setIsLoading]= useState(false);
    const [isSuccess, setIsSuccess]= useState(false);
    const [isError, setIsError]= useState(false);
    const [errorMsg, setErrorMsg]= useState("");
    
    async function callApi(data= {}){

        try{
            setIsIdel(false);
            setIsLoading(true);
            const axiosWithInterceptors = await withInterceptors();
            const response = await axiosWithInterceptors[`${method ?? "get"}`](url, data, apiConfig);
            setIsLoading(false);
            setIsSuccess(true);

            return response.data;
        }
        catch(err){
            console.log("error")
            setIsLoading(false);
            setIsError(true);
            setErrorMsg(err);
            console.log("error in usefetch", err)
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