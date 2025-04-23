import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getMainReplies, selectReplies } from '../../../../features/comment/replies/repliesSlice';
import Reply from "./reply"
import { toast } from 'react-toastify';
import SubReplies from './subReplies/SubReplies';
import {GiBottomRight3DArrow} from "react-icons/gi";

const Replies = ({postId, commentId, numOfMainReplies}) => {
    const {replies, isLoading, isSuccess, isError, message} = useSelector(selectReplies)
    const [allReplies, setAllReplies] = useState([]);
    const [skip, setSkip] = useState(0);
    const limit = 1;

    const [active, setActive] = useState(false);

    const [isMatched, setIsMatched] = useState(window.matchMedia("only screen and (max-width: 576px)").matches)

    const disptach = useDispatch();

    const handleBtn = (e)=>{
      const query = {limit, skip}
      console.log("query", query)
      disptach(getMainReplies({postId, commentId, query}))
    }

    const showLess = (e)=>{
      setAllReplies(prev =>{
        prev.pop();
        console.log("prev", prev)
        return [...prev];
      })
      console.log("skip", skip, "numofMainReplies", numOfMainReplies)
      setSkip(prev => prev - 1)
    }
    const [allNestedReplies, setAllNestedReplies]= useState([]);

    console.log("commentId", commentId, "allReplies", allReplies)
  // const [commentReplies] = allReplies?.filter((someReplies) =>{
  //   return someReplies.commentId === commentId
  // });
  // const [commentReplies] = allReplies

  // console.log("commentReplies", commentReplies)
  
  const renderedReplies = allReplies?.map((reply, i) =>{
    console.log("replyyyy", reply)
    console.log("numOfNestedReplies", reply.numOfNestedReplies)
    console.log("isMatched", isMatched)
    if(!isMatched){
      return <Reply 
              key={i} 
              commentId={commentId}
              reply= {reply} 
            />
    }

    return (
      <div 
        key={i}
        className='reply-mobile-sm'
      >
        <Reply  
          commentId={commentId}
          reply= {reply} 
        />
        {
          typeof reply.numOfNestedReplies === "number" && reply.numOfNestedReplies > 0 && isMatched &&
          <SubReplies 
              commentId={commentId} 
              mainReplyId={reply._id} 
              numOfNestedReplies={reply.numOfNestedReplies} 
              allNestedReplies={allNestedReplies} 
              setAllNestedReplies={setAllNestedReplies} 
          />
        }
      </div>
    )
  })

  useEffect(()=>{
    setIsMatched(window.matchMedia("only screen and (max-width: 576px)").matches)
  }, [])

    useEffect(()=>{
        if(isSuccess && replies.commentId === commentId){
          console.log("replies", replies)
          setAllReplies(prev => [...prev, ...replies?.values])
        }

        if(isSuccess && replies?.commentId === commentId && skip < numOfMainReplies){
          setSkip(prev => prev + 1)
        }

        if(isError){
          toast.error(message)
        }
    }, [isLoading, isSuccess, isError, message])

  return (
    <div className="main-replies w-100 d-flex flex-column gap-2 mt-3">
      {renderedReplies}
      {
        typeof numOfMainReplies === "number" && skip < numOfMainReplies &&
        <button
          type='button'
          onClick={handleBtn}
          className='normalize-btn w-fit bg-transparent text-start text-dark'
        >
          <GiBottomRight3DArrow className="me-1" style={{transform: "rotateZ(45deg)"}}/>
          {numOfMainReplies - skip} {( (numOfMainReplies - skip) === 1 )? "replie" : "replies"}
        </button>
      }
      {
        typeof numOfMainReplies === "number" && skip >= numOfMainReplies &&
        <button
          type='button'
          onClick={showLess}
          className='normalize-btn w-fit bg-transparent text-start text-dark'
        >
          <GiBottomRight3DArrow className="me-1" style={{transform: "rotateZ(-135deg)"}} />
          <span className="">hide</span>
        </button>
      }
    </div> 
  )
}

export default Replies