import React, {useContext, useEffect, useState} from 'react'
import {IoIosSend} from "react-icons/io"
import { AnimatePresence, motion } from 'framer-motion';
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createReply, selectComments } from '../../../../../features/comment/commentsSlice';
import { createReplyToReply } from '../../../../../features/comment/replies/repliesSlice';
import { toast } from 'react-toastify';

const SubReplyForm = ({commentId, user, replyId, replyToId, setNewSubReply, setAllNestedReplies}) => {
    const {id: postId} = useParams()
    const [active, setActive] = useState(false)
    const {register, handleSubmit, formState: {errors}} = useForm();
    const dispatch = useDispatch();
    // const [isLoading, setIsLoading] = useState(false)
    // const { isLoading, isSuccess, isError, message} = useSelector(selectComments)

    const submit = (formData)=>{
        // console.log("content", formData)
        console.log("user in subReply form", user, "commentId", commentId, "replyToId", replyToId, "replyId", replyId, "content", formData)
        // try{
            setNewSubReply(prev => {
                    return {...prev, "creating": true, "created": false, "aborted": false}
                }
            );

            dispatch(
                createReplyToReply(
                                    {   postId,
                                        commentId, 
                                        replyId,
                                        replyToId, 
                                        "content": formData.subReply
                                    }
                                )
            )
            .then(res =>{
                console.log("res in dispatch", res)
                
                // setNewSubReply(prev => {
                //         return {...prev, value: {...res.payload}, "creating": false, "created": true, "aborted": false}
                //     }
                // );
                // setAllNestedReplies(prev => [...prev, {...res.payload}])
            })
            // .catch(err => {
            //     throw err;
            // })
            
        // }
        // catch(err){
        //     setNewSubReply(prev => {
        //             return {...prev, "creating": false, "created": false, "aborted": true}
        //         }
        //     );
        //     let message = "";
        //     console.log("err in create reply on reply", err)
        //     if(!err?.response){
        //         message = "No server response"
        //     }
        //     else if(err?.response?.status === 401){
        //         message = "You are not logged in"
        //     }
        //     else if(err?.response?.status === 403){
        //         message = "Your session is ended, log in again"
        //     }
        //     else{
        //         message = "Faild to create reply on reply"
        //     }

        //     toast.error(message)
        // }
    }

    // useEffect(()=>{
    //     if(isSuccess){
    //         toast.success("comment created")
    //     }
    //     if(isError){
    //         toast.error(message)
    //     }
    // }, [isLoading, isSuccess, isError, message])
    // if(isLoading) return <h1>Loading...</h1>
    return (
        <form className='form py-3' onSubmit={handleSubmit(submit)}>
            <div className="d-flex align-items-center position-relative rounded-pill bg-secondary px-3 py-3">
                <input 
                name="subReply" 
                id="subReply"
                type='text'
                placeholder='write a reply'
                {...register("subReply",{
                    required: true
                })}
                className="form-control bg-transparent p-0 rounded-0 border-bottom border-1 fs-5 text-white"
                style={{lineHeight: "1rem", resize: "none", boxShadow: "none", border:"none", outline: "none"}}>
                </input>
                <button
                name='submit' 
                type='submit'
                onClick={e => setActive(!active)}
                className={`normalize-btn bg-transparen ms-2 ${(errors.reply)? "disabled": ""}`}
                >
                    <AnimatePresence mode="await" initial="false">
                        { !false &&
                            <motion.span
                            initial={{originX: "center"}}
                            whileHover={{scale: 1.2, originX: "center"}}
                            exit={{visibility: "hidden", position: "absolute"}}
                            className='d-flex align-items-center justify-content-center bg-primary rounded-circle'
                            style={{width: "37px", height: "37px"}}
                            >
                                <IoIosSend className="fs-4 text-white" />
                            </motion.span>
                        }
                    </AnimatePresence>                  
                </button>
            </div>
        </form>
    )
}

export default SubReplyForm