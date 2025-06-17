import React from 'react'
import useFetch from '../../../../hooks/useFetch'
import { useEffect } from 'react';
import AsideListSearch from '../aside-list/AsideListSearch';
import AsideList from '../aside-list/AsideList';
import SuggestedAccountsCard from './SuggestedAccountsCard';
import { useState } from 'react';
import { useRef } from 'react';

const SuggestedAccounts = ({user}) => {
   const [searchResult, setSearchResult]= useState([]);
    const [isEmptyQuery, setIsEmptyQuery]= useState(true);
    const {callApi, isLoading, isSuccess, response, isError}= useFetch();
    const suggestedAccountsRef = useRef(response?.data?.suggestedAccounts || []);
    console.log("searchResult", searchResult, "isEmptyQuery", isEmptyQuery)
    
    if(isEmptyQuery){
        suggestedAccountsRef.current= response?.data?.suggestedAccounts;
    }
    else{
        suggestedAccountsRef.current= searchResult;
    }

    useEffect(()=>{
        callApi("/user/suggested-accounts", "get", null, true);
    }, []);

    console.log("response", response?.data);
     const renderedItems= suggestedAccountsRef.current?.map((user, i)=>{
          return (
              <React.Fragment key={i}>
                  <SuggestedAccountsCard user={user} />
                  { i !== (suggestedAccountsRef.current.length - 1) && <hr className='m-0 bg-dark border-bottom border-dark' />}
              </React.Fragment>
          )
      })
    if(isError || !!!response?.data?.suggestedAccounts?.length) return;
  return (
    <AsideList title={"People to follow"}>
        <AsideListSearch searchParams={{accountId: user._id, searchIn: "suggested_accounts"}} setIsEmpty={setIsEmptyQuery} getSearchResult={setSearchResult} />
        <div className='overflow-auto' style={{maxHeight: "300px"}}>
            {renderedItems}
        </div>
    </AsideList>
  )
}

export default SuggestedAccounts