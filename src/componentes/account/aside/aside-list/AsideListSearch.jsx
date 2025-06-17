import React, { useEffect } from 'react'
import SearchInput from '../../../ui-kits/SearchInput'
import useFetch from "../../../../hooks/useFetch"
import { toast } from 'react-toastify';
import { handleUrlQuery } from '../../../../utils/helper';

const AsideListSearch = ({baseSearchURL="/user/search", searchParams= {}, setIsEmpty, getSearchResult}) => {
    const {callApi, response, isLoading, isSuccess, isError, errorMsg}= useFetch();
    // searchParams= searchParams ?? {};
    console.log("baseSearchURL", baseSearchURL)
    function search(query){
        console.log("searchParams//", searchParams);
        searchParams.keyword= query;
    console.log("searchParams", searchParams);
        const searchURL= handleUrlQuery(baseSearchURL, searchParams);
        console.log("searchURL", searchURL)
        // console.log("query>>", query);
        if(!!!query){
            setIsEmpty(true);
        }
        else{
            setIsEmpty(false);
            callApi(searchURL)
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