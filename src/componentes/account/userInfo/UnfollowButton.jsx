// import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect } from 'react'
import { BsPersonDashFill } from "react-icons/bs";
import ActionButton from '../../ui-kits/buttons/ActionButton';
// import usePrivateFetch from '../../../hooks/usePrivateFetch';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { selectAccount, unfollow } from '../../../features/account/accountSlice';

const UnfollowButton = ({onUnfollow, accountId, className}) => {
  const {isLoading, isSuccess, isError, message, meta}= useSelector(selectAccount);
  const dispatch = useDispatch();

  console.log("accountId: ", accountId)
  function handleClick(e){
    // console.log("e: ", e);
    dispatch(unfollow(accountId));
  }

  useEffect(()=>{
    if(meta?.action === "unfollow"){
      if(isSuccess){
        onUnfollow && onUnfollow();
      }
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
        icon={<BsPersonDashFill className="fs-5" />}
        text={"unfollow"}
        extraClasses={className ?? ""}
        style={{height: "35px"}}
    />
  )
}

export default UnfollowButton