import React, { useEffect, useState } from 'react'
import images from '../../../../assets/images'
import TimeAgo from '../../TimeAgo'
import { AnimatePresence, motion } from 'framer-motion';
import SubReplyForm from './subReplies/SubReplyForm';
import SubReply from './subReplies/SubReply';
import SubReplies from './subReplies/SubReplies';


const Reply = ({commentId, reply: {_id: replyId, userId: user, createdAt, content, numOfNestedReplies}}) => {
    const [active, setActive] = useState(false);
    const [newSubReply, setNewSubReply]= useState({value: {}, creating: false, created: false, aborted: false})
    const [allNestedReplies, setAllNestedReplies] = useState([]);
    const [isMatched, setIsMatched] = useState(window.matchMedia("only screen and (max-width: 576px)").matches)
    console.log("numOfNestedReplies", numOfNestedReplies)
    
    useEffect(()=>{
        setIsMatched(window.matchMedia("only screen and (max-width: 576px)").matches)
    }, [])

    return (
    <div className='w-100 d-flex flex-wrap border border-3 border-dark styled-box px-3 py-2'>
        <img src={images.user_2} className='rounded-circle' style={{width: "37.5px", height: "37.5px"}} alt="..." />
        <div className="col d-flex flex-wrap justify-content-between gap-1 ps-2">
            <div className="user d-flex flex-column">
                {/* <span className='user-full-name fw-bold text-capitalize'>{user?.firstName} {user?.lastName}</span>
                <span className="user-user-name text-muted fs-8">{user?.userName}</span> */}
                <span className='user-full-name fw-bold text-capitalize'>{(user.firstName === "ahmed")?"dane": "wanston"}</span>
                <span className="user-user-name text-muted fs-8">{(user.firstName === "ahmed")?"@dane": "@wanston"}</span>
            </div>
           <TimeAgo date={createdAt} extraClasses={"fs-7"} />
            <p className="content col-12 m-0 second-font-family text-secondary">
                {content}
            </p>
            <button 
            type='button'
            onClick={(e)=> setActive(!active)} 
            className="px-2 py-1 mt-1 ms-auto fs-7 rounded-pill border border-2 border-dark bg-primary text-white">
                replay
            </button>
            <AnimatePresence mode="await" initial="false">
                {   active &&
                    <motion.div
                    initial={{opacity: 0, visibility: "hidden", translateY: "100%"}}
                    animate={{opacity: 1, visibility: "visible", translateY: "0%"}}
                    exit={{opacity: 0, visibility: "visible", translateY: "100%"}}
                    transition={{duration: 0.1, type: "spring", stiffness: 200}}
                    className='w-100'
                    >
                        <SubReplyForm commentId={commentId} replyId={replyId} replyToId={replyId} setNewSubReply={setNewSubReply} />
                    </motion.div>
                }
            </AnimatePresence>
            {
                newSubReply.creating &&
                <h5>creating new reply...</h5>
            }
            {
                newSubReply.created && !isMatched &&
                <SubReply commentId={commentId} mainReplyId={replyId} nestedreply={newSubReply.value} setAllNestedReplies={setAllNestedReplies} />
            }
            {
                typeof numOfNestedReplies === "number" && numOfNestedReplies > 0 && !isMatched &&
                <SubReplies 
                    commentId={commentId} 
                    mainReplyId={replyId} 
                    numOfNestedReplies={numOfNestedReplies} 
                    allNestedReplies={allNestedReplies} 
                    setAllNestedReplies={setAllNestedReplies} 
                />
            }
        </div>
    </div>
  )
}

export default Reply