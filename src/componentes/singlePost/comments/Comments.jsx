import React, { useContext, useEffect, useState } from 'react'
import CommentsItem from './CommentsItem'
import { getComments, selectComments } from '../../../features/comment/commentsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import {GiBottomRight3DArrow} from "react-icons/gi"
import { motion, AnimatePresence } from 'framer-motion'
import SkeletonComment from '../../skeletonLoading/singlePost/SkeletonComment'
const Comments = ({comments: {values, count}}) => {
  const postId = useParams().id;
  const {comments: newComments, isLoading, isSuccess, isError, message} = useSelector(selectComments)
  const dispatch = useDispatch();
  const [allComments, setAllComments] = useState([...values])
  const limit = 1;
  const [skip, setSkip] = useState(1);
  // const {comments}= useContext(CommentsContext);
  console.log("comments", values)
  
  const renderedComments = allComments?.map((comment, i) =>{
    console.log("comment in comments", comment);
    return <CommentsItem key={i} comment={comment} />   
  })
  
  // const renderedNewComments = newComments?.values?.map((comment, i) =>{
  //   return <CommentsItem key={i} comment={comment} />   
  // })

  const handleClick= (e)=>{
    dispatch(getComments({postId, query: {limit, skip}}))
  }
  
  useEffect(()=>{
    if(isSuccess){
      setAllComments(prev => [...prev, ...newComments?.values])
      setSkip(prev => prev + 1)
    }
    if(isError){
      toast.error(message)
    }
  }, [isLoading, isSuccess, isError, message])

  // if(isLoading){
  //   return <h1>Loading Comments !!</h1>
  // }
  return (
    <div className='comments text-start mt-4'>
        <span className='fs-5 fw-bold text-dark mb-3'>{count} Comments</span>
        <div className="d-flex flex-column gap-3 py-4">
          {renderedComments}
          {
            skip < count &&
            <div className='mt-3'>
              {/* <AnimatePresence mode="await" initial="false"> */}
              {
                !isLoading &&
                <motion.button
                initial={{backgroundColor: "rgb(0 0 0 / 0)"}}
                whileHover={{backgroundColor: "var(--bs-primary)"}}
                transition={{duration: 0.1}}
                type='button'
                onClick={handleClick}
                className='normalize-bt d-flex rounded-pill text-dark border border-2 border-dark'
                // style={{backgroundColor: "rgb(0,0,0)"}}
                >
                  <GiBottomRight3DArrow className="me-1" style={{transform: "rotateZ(45deg)", transition: "0.2s"}} />
                  view more comments
                  <span 
                    className="d-flex justify-content-center align-items-center ms-1 rounded-circle bg-primary text-white border border-1 border-dark"
                    style={{width: "20px", height: "20px"}}
                  >{count - skip}</span>
                </motion.button>
              }
              {/* </AnimatePresence> */}
              {
                isLoading &&
                <button                
                >Load...</button>
              }
            </div>
          }
        </div>
    </div>
  )
}

export default Comments