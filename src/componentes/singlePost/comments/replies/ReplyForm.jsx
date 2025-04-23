import React, {useContext, useEffect, useState} from 'react'
import {IoIosSend} from "react-icons/io"
import { AnimatePresence, motion } from 'framer-motion';
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
// import CommentsContext from '../../../context/Comments';
import { toast } from 'react-toastify';
import { createReply, selectComments } from '../../../../features/comment/commentsSlice';

const ReplyForm = ({commentId, user}) => {
    const {id: postId} = useParams()
    const [active, setActive] = useState(false)
    const {register, handleSubmit, formState: {errors}} = useForm();
    const dispatch = useDispatch();

    const { isLoading, isSuccess, isError, message} = useSelector(selectComments)

    const submit = (formData)=>{
        // console.log("content", formData)
        console.log("user in reply", user, "commentId", commentId, "content", formData)

        dispatch(createReply({postId, commentId, "content": formData.reply}))
    }

    // useEffect(()=>{
    //     if(isSuccess){
    //         toast.success("comment created")
    //     }
    //     if(isError){
    //         toast.error(message)
    //     }
    // }, [isLoading, isSuccess, isError, message])
    if(isLoading) return <h1>Loading...</h1>
    return (
        <form className='form py-3' onSubmit={handleSubmit(submit)}>
            <div className="d-flex align-items-center position-relative rounded-pill bg-secondary px-3 py-3">
                <input 
                name="reply" 
                id="reply"
                type='text'
                placeholder='write a reply'
                {...register("reply",{
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

export default ReplyForm