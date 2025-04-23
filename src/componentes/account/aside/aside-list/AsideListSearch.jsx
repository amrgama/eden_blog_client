import React, { useEffect } from 'react'
import SearchInput from '../../../ui-kits/SearchInput'
import useFetch from "../../../../hooks/useFetch"
import { toast } from 'react-toastify';

const AsideListSearch = ({setIsEmpty, getSearchResult}) => {
    const {callApi, response, isLoading, isSuccess, isError, errorMsg}= useFetch();

    function search(query){
        if(!!!query){
            setIsEmpty(true);
        }
        else{
            setIsEmpty(false);
            callApi(`/user/search?keyword=${query}`)
        }
        // console.log("query: ",query)
    }

    useEffect(()=>{
        if(isSuccess && response.data){
            getSearchResult(response.data.users);
        }

        if(isError && errorMsg){
            if(!!!response){
                toast.error("something went wrong try again");
            }
            if(response.status === 401){
                toast.error(errorMsg);
            }
            else if(response.status === 400){
                toast.error(errorMsg);
            }
            else{
                toast.error("faild to search in this account followers");
            }
        }
    }, [isLoading, isSuccess, isError, response])
    return (
        <SearchInput
            cb={search}
            isLoading={isLoading}
            placeholder={"search"}
            className={"text-start text-dark border-bottom border-dark"}
        />
    )
}

export default AsideListSearch