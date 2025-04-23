import React, {useContext, useEffect, useState} from 'react'
import {BsSend, BsSendFill} from "react-icons/bs"
import {IoSend} from "react-icons/io5"
import {IoIosSend} from "react-icons/io"
import { AnimatePresence, motion } from 'framer-motion';
import Lottie from "lottie-react"
import send from "../../../assets/animations/Send 2.json"
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { addComment, createComment, selectComments } from '../../../features/comment/commentsSlice';
import { useParams } from 'react-router-dom';
import CommentsContext from '../../../context/Comments';
import { toast } from 'react-toastify';

const AuthCommentForm = ({user}) => {
    const {id: postId} = useParams()
    const [active, setActive] = useState(false)
    // const {setComments} = useContext(CommentsContext)
    const {register, handleSubmit, formState: {errors}} = useForm();
    const dispatch = useDispatch();

    const {comments, isLoading, isSuccess, isError, message} = useSelector(selectComments)

    const submit = (formData)=>{
        // console.log("content", formData)
        console.log("user in comment", user, "content", formData)
        // setComments(prev =>{
        //     const newComment = {
        //         "userId": {...user},
        //         content: formData.comment,
        //         date: Date.now()
        //     }
        //     console.log("newComment", newComment);
        //     return [newComment, ...prev]
        // })
        // const newComment= {...user, "content": formData.comment}
        // dispatch(addComment(newComment))

        dispatch(createComment({postId, "content": formData.comment}))
    }

    useEffect(()=>{
        if(isSuccess){
            toast.success("comment created")
        }
        if(isError){
            toast.error(message)
        }
    }, [isLoading, isSuccess, isError, message])

    return (
        <form className='form py-3' onSubmit={handleSubmit(submit)}>
            <div className="d-flex align-items-center position-relative rounded-pill bg-secondary px-3 py-3">
                <input 
                name="comment" 
                id="comment"
                type='text'
                {...register("comment",{
                    required: true
                })}
                className="form-control bg-transparent p-0 rounded-0 border-bottom border-1 fs-5 text-white"
                style={{lineHeight: "1rem", resize: "none", boxShadow: "none", border:"none", outline: "none"}}>
                </input>
                <button
                name='submit' 
                type='submit'
                onClick={e => setActive(!active)}
                className={`normalize-btn bg-transparen ms-2 ${(errors.comment)? "disabled": ""}`}
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
                    {/* {
                        active &&
                        <Lottie  animationData={send} />
                    } */}
                  
                </button>
            </div>
        </form>
    )
}

export default AuthCommentForm