import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getMainReplies, getRepliesToReply, selectReplies } from '../../../../../features/comment/replies/repliesSlice';
import { toast } from 'react-toastify';
import SubReply from './SubReply';
import { useParams } from 'react-router-dom';
import {GiBottomRight3DArrow} from "react-icons/gi";
import { selectNestedReplies } from '../../../../../features/comment/replies/nestedReplies/nestedRepliesSlice';

const SubReplies = ({commentId, mainReplyId, allNestedReplies, setAllNestedReplies}) => {
    const {id: postId} = useParams();
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [isError, setIsError] = useState(false);
    // const {nestedReplies, isLoading, isSuccess, isError, message} = useSelector(selectNestedReplies)
    const [active, setActive] = useState(false);
   
    const disptach = useDispatch();

    const handleBtn = (e)=>{
      setActive(true)
      try{
        setIsLoading(true)
        disptach(getRepliesToReply({postId, commentId, "replyId": mainReplyId}))
        .then(res=> {
          setAllNestedReplies(prev => [...prev, res.payload])
          setIsLoading(false);
          setIsSuccess(true);
        })
      }
      catch(err){
        console.log("error in subReplies", err)
        setIsLoading(false)
        setIsError(true)
        setActive(false)
        toast.error("faild to get replies to reply for some reasone")
      }
    }

  const nestedReplies = allNestedReplies?.find((someReplies) =>{
                        console.log("nestedreplies", someReplies)
                        return someReplies.repliesToId === mainReplyId
                      });

  console.log("nestedReplies", nestedReplies)
  const renderedNestedReplies = nestedReplies?.values?.map((nestedReply, i) =>{
    return <SubReply 
              key={i} 
              commentId={commentId} 
              mainReplyId={nestedReplies.repliesToId || mainReplyId} 
              nestedReply={nestedReply} 
              setAllNestedReplies={setAllNestedReplies} 
            />

  })

  const showLess = ()=>{
    setNestedReplies({})
  }

    // useEffect(()=>{
    //     if(isSuccess){
    //       allSubReplies(prev => [...prev, replies])
    //     }

    //     if(isSuccess && replies?.repliesTo === replyId){
    //       setSkip(prev => prev + 1)
    //     }

    //     if(isError){
    //       toast.error(message)
    //     }
    // }, [isLoading, isSuccess, isError, message])
  if(isLoading) return <h5>Loading replies...</h5>
  return (
    <div className="sub-replies w-100 ps-5 ps-md-0 d-flex flex-column gap-2 mt-3">
      {renderedNestedReplies}
      {
        !active &&
        <button
          type='button'
          onClick={handleBtn}
          className='normalize-btn w-fit bg-transparent text-start text-dark'
        >
          <GiBottomRight3DArrow className="me-1" style={{transform: "rotateZ(45deg)"}}/>
          view {nestedReplies?.count} {( nestedReplies?.count === 1 )? "replie" : "replies"}
        </button>
      }
      {
        active &&
        <button
          type='button'
          // onClick={showLess}
          className='normalize-btn w-fit bg-transparent text-start text-dark'
        >
          <GiBottomRight3DArrow className="me-1" style={{transform: "rotateZ(-135deg)"}} />
          <span className="">hide</span>
        </button>
      }
    </div> 
  )
}

export default SubReplies