import { useEffect, useState } from "react";
import axios from "../api/axios";
import withInterceptors from "../utils/withInterceptors";

const useFetch= (defaultMethod= "get", defaultApiConfig= null) =>{
    const [response, setResponse]= useState(true);
    const [isIdel, setIsIdel]= useState(true);
    const [isLoading, setIsLoading]= useState(false);
    const [isSuccess, setIsSuccess]= useState(false);
    const [isError, setIsError]= useState(false);
    const [errorMsg, setErrorMsg]= useState("");
    const apiConfigVal = defaultApiConfig;

    async function callApi(url, method= defaultMethod, data= null, withAuth= false, apiConfig= apiConfigVal){

        if(!!!url){
            throw new Error("You must pass url");
        }

        try{
            if(!!apiConfig){
                setIsIdel(false);
                setIsLoading(true);
                if(withAuth){
                    const axiosWithInterceptors= await withInterceptors();
                    
                    setResponse(await axiosWithInterceptors[`${method}`](url, data, apiConfig));
                }else{
                    setResponse(await axios[`${method}`](url, data, apiConfig));
                }
                setIsLoading(false);
                setIsSuccess(true);
            }
            else{
                setIsIdel(false);
                setIsLoading(true);
                 if(withAuth){
                    const axiosWithInterceptors= await withInterceptors();
                    
                    setResponse(await axiosWithInterceptors[`${method ?? "get"}`](url, data));
                }else{
                    setResponse(await axios[`${method ?? "get"}`](url, data));
                }
                setIsLoading(false);
                setIsSuccess(true);
            }

            return response.data;
        }
        catch(err){
            console.log("error in useFetch", err)
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
        response,
        errorMsg
    }
}

export default useFetch;