import React, { useEffect, useState } from 'react'
import images from '../../../assets/images'
import TimeAgo from '../TimeAgo'
import { AnimatePresence, motion } from 'framer-motion';
import ReplyForm from './replies/ReplyForm';
// import Reply from '../replies/Reply';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMainReplies, selectReplies } from '../../../features/comment/replies/repliesSlice';
import { toast } from 'react-toastify';
import Replies from './replies/replies';

const CommentsItem = ({comment: {value: {_id: commentId, userId: user, createdAt, content}, numOfMainReplies}}) => {
    const {id: postId} = useParams();
    const {replies, isLoading, isSuccess, isError, message} = useSelector(selectReplies)
    const [allReplies, setAllReplies] = useState([]);
    const [skip, setSkip] = useState(0);
    // console.log("date", date)
    const [active, setActive] = useState(false);
    const disptach = useDispatch();
    console.log("user in comment", user)
    const limit = 1;


  return (
    <div 
        className='d-flex flex-wrap border border-3 border-dark styled-box px-3 py-3'
        style={{maxWidth: "600px"}}
    >
        <img src={(user.firstName === "ahmed")?images.user_1: images.user_2} className='rounded-circle' style={{width: "40px", height: "40px"}} alt="..." />
        <div className="col d-flex flex-column gap-1 ps-2">
            <div className="d-flex">
                <span className="user d-inline-flex flex-column me-auto">
                    {/* <span className='user-full-name fw-bold text-capitalize'>{user?.firstName} {user?.lastName}</span>
                    <span className="user-user-name text-muted fs-8">{user?.userName}</span> */}
                    <span className='user-full-name fw-bold text-capitalize'>{(user.firstName === "ahmed")?"dane": "wanston"}</span>
                    <span className="user-user-name text-muted fs-8">{(user.firstName === "ahmed")?"@dane": "@wanston"}</span>
                </span>
                <TimeAgo date={createdAt} extraClasses={"fs-7"} />
            </div>
            <p className="content m-0 second-font-family text-secondary">
                {content}
            </p>
            <button 
                type='button'
                onClick={(e)=> setActive(!active)} 
                className="px-2 py-1 mt-1 ms-auto fs-7 rounded-pill border border-2 border-dark bg-primary text-white"
            >
                replay
            </button>
            {/* {   
                numOfMainReplies &&
                <Reply user={firstReply.userId} content={firstReply.content} createdAt={firstReply.createdAt} />
            
            } */}
            <AnimatePresence mode="await" initial="false">
                {   active &&
                    <motion.div
                    initial={{opacity: 0, visibility: "hidden", translateY: "100%"}}
                    animate={{opacity: 1, visibility: "visible", translateY: "0%"}}
                    exit={{opacity: 0, visibility: "visible", translateY: "100%"}}
                    transition={{duration: 0.1, type: "spring", stiffness: 200}}
                    className='w-100'
                    >
                        <ReplyForm commentId={commentId} user={user} />
                    </motion.div>
                }
            </AnimatePresence>
            {
                typeof numOfMainReplies === "number" && numOfMainReplies > 0 &&
                <Replies postId={postId} commentId={commentId} numOfMainReplies={numOfMainReplies} />
            }
        </div>
    </div>
  )
}

export default CommentsItem