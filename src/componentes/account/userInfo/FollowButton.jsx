// import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { BsPersonPlus } from "react-icons/bs";
import ActionButton from '../../ui-kits/buttons/ActionButton';
import usePrivateFetch from "../../../hooks/usePrivateFetch";
import { toast } from 'react-toastify';
import { follow, selectAccount } from '../../../features/account/accountSlice';
import { useDispatch, useSelector } from 'react-redux';

const FollowButton = ({onFollow, accountId, className}) => {
  // const {callApi, response, isLoading, isSuccess, isError, errorMsg} = usePrivateFetch(`/user/${accountId}/follow`, "put");
 const {isLoading, isSuccess, isError, message, meta}= useSelector(selectAccount);
 const dispatch = useDispatch();

 console.log("accountId: ", accountId)
 function handleClick(e){
   console.log("e: ", e);
   // callApi()
   dispatch(follow(accountId));
 }

  useEffect(()=>{
    console.log(isLoading, isError, isSuccess, message);
    
    if(meta?.action === "follow"){
      if(isSuccess){
        onFollow && onFollow();
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
        icon={<BsPersonPlus className="fs-5" />}
        text={"follow"}
        extraClasses={className ?? ""}
        style={{height: "35px"}}
      />
    // <div 
    //     className='border border-1 border-dark shadow-very-sm'
    // >
    //     <button 
    //         onClick={handleClick}
    //         className={`normalize-btn px-3 rounded-0 text-dark bg-white ${!isDisabled? "disabled": ""}`}
            
    //     >
    //         <AnimatePresence mode="await" initial="false">
    //             { 
    //                 !active && 
    //                 <motion.span
    //                     initial={{originX: "center"}}
    //                     whileHover={{scale: 1.1, originX: "center"}}
    //                     exit={{visibility: "hidden", position: "absolute"}}
    //                     className="w-100 h-100 d-flex flex-wrap align-items-center justify-content-center gap-2"
    //                 >
    //                     <BsPersonPlus className="fs-5 text-dark" />
    //                     <span>Follow</span>
    //                 </motion.span>
    //             }
    //         </AnimatePresence>
            
    //         <AnimatePresence mode="await" initial="false">
    //         { 
    //             active && 
    //             <motion.span
    //                 initial={{originX: "center"}}
    //                 animate={{scale: 1.1}}
    //                 exit={{visibility: "hidden", position: "absolute"}}
    //                 transition={{duration: "0.2s", type: "spring", stiffness: "100"}}
    //                 className="w-100 h-100 d-flex flex-wrap align-items-center justify-content-center gap-2"
    //             >
    //                 <BsPersonCheckFill className="fs-5 text-primary" />
    //                 <span className='text-primary'>Following</span>
    //             </motion.span>
    //         }
    //       </AnimatePresence>           
    //     </button>
    // </div>
  )
}

export default FollowButton