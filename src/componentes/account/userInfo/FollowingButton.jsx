import React, { useEffect, useState } from 'react'
import { BsPersonCheckFill } from "react-icons/bs";
import ActionButton from '../../ui-kits/buttons/ActionButton';
import { useDispatch, useSelector } from 'react-redux';
import { selectAccount, unfollow } from '../../../features/account/accountSlice';

const FollowingButton = ({accountId, className}) => {
  const {isLoading, isSuccess, isError, message, meta}= useSelector(selectAccount);
  const dispatch = useDispatch();

  console.log("accountId: ", accountId)
  function handleClick(e){
    console.log("e: ", e);
    // callApi()
    dispatch(unfollow(accountId));
  }

  useEffect(()=>{
    console.log(isLoading, isError, isSuccess, message);

    // if(isSuccess){
    //   setFollowing(prev => [...prev, response.new])
    // }
    if(meta?.action === "unfollow"){

      if(isError && !!message){
        toast.error(message);
      }
    }
  }, [isLoading, isError, isSuccess, message])

  return (
    <ActionButton
        cb={handleClick}
        isLoading={isLoading}
        isDisable={isLoading || isError}
        icon={<BsPersonCheckFill className="fs-5" />}
        text={"following"}
        extraClasses={className ?? ""}
        style={{height: "35px"}}
    />
  )
}

export default FollowingButton