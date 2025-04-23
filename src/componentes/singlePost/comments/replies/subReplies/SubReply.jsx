import React, { useState } from 'react'
import images from '../../../../../assets/images'
import TimeAgo from '../../../TimeAgo'
import { AnimatePresence, motion, transform } from 'framer-motion';
import SubReplyForm from '.././subReplies/SubReplyForm';
import {GiBottomRight3DArrow} from "react-icons/gi";

const SubReply = ({commentId, mainReplyId, nestedReply: {_id: replyId, replyToId, userId: user, createdAt, content}, setAllNestedReplies}) => {
    // console.log("date", date)
    const [active, setActive] = useState(false);
    const [newSubReply, setNewSubReply]= useState({value: {}, creating: false, created: false, aborted: false})
    console.log("user in nestedreply ", user, "mainReplyId", mainReplyId, "replyToId", replyToId)
    return (
    <div className='w-100 d-flex flex-wrap border border-3 border-dark styled-box px-3 py-2'>
        <img src={images.user_1} className='rounded-circle' style={{width: "35px", height: "35px"}} alt="..." />
        <div className="col d-flex flex-wrap justify-content-between gap-1 ps-2">
            <div className='w-100 d-flex justify-content-between'>
                <div className="user d-flex flex-column">
                    <span>
                        <span className='user-full-name me-1 fw-bold text-capitalize'>{user?.firstName} {user?.lastName}</span>
                        <GiBottomRight3DArrow className="fs-8" style={{transform: "rotateZ(-45deg)"}} />
                        {
                            replyToId &&
                            <span className='replyTo fs-7 ms-2 text-secondary fw-bold text-capitalize'>{replyToId.firstName} {replyToId.lastName}</span>
                        }
                    </span>
                    <span className="user-user-name text-muted fs-8">{user?.userName}</span>
                </div>
                
                <TimeAgo date={createdAt} extraClasses={"fs-7"} />
            </div>
            <p className="content col-12 m-0 second-font-family text-secondary">
                {content}
            </p>
            <button 
                type='button'
                onClick={(e)=> setActive(!active)} 
                className="px-2 py-1 mt-1 ms-auto fs-7 rounded-pill border border-2 border-dark bg-primary text-white"
            >
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
                        <SubReplyForm 
                            commentId={commentId} 
                            replyId={mainReplyId} 
                            replyToId={replyId} 
                            setNewSubReply={setNewSubReply} 
                            setAllNestedReplies={setAllNestedReplies} 
                        />
                    </motion.div>
                }
            </AnimatePresence>
            {
                newSubReply.creating &&
                <h5>creating new reply...</h5>
            }
            {/* {
                newSubReply.created &&

            } */}
        </div>
    </div>
  )
}

export default SubReply