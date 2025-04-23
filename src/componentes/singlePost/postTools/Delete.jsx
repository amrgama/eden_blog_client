import React, { useState } from 'react'
import {Link, useParams} from "react-router-dom"
import {RiDeleteBin5Fill, RiDeleteBin5Line} from "react-icons/ri";
import { AnimatePresence, motion } from 'framer-motion'
import Modal from '../../modal/Modal';
import { deletePost } from '../../../features/post/postSlice';

const Delete = () => {
    const [open, setOpen] = useState(false);
    const modelId = "staticBackdrop1"
    const {id: postId} = useParams();

    return (
    <motion.li
    // initial={{backgroundColor: "rgb(255, 255, 255)", color: "var(--bs-dark)"}}
    // whileHover={{backgroundColor: "var(--bs-primary)", color: "rgb(255, 255, 255)"}}
    // transition={{duration: 0.1}}
    className="nav-item lh-lg">
        <motion.button
            // type="button"
            initial={{backgroundColor: "rgb(255, 255, 255)", color: "var(--bs-dark)"}}
            whileHover={{backgroundColor: "var(--bs-primary)", color: "rgb(255, 255, 255)"}}
            transition={{duration: 0.1}}
            onClick={(e)=> setOpen(true)} 
            data-bs-toggle="modal"
            data-bs-target={"#" + modelId}
            className="normalize-btn w-100 px-2 rounded-0"
        >
            <RiDeleteBin5Line className="fs-5" />
        </motion.button>
        <Modal 
        title={"Delete post"} 
        actionText={"delete"}
        modelId={modelId}
        action={deletePost}
        actionParam={postId}
        open={open}
        setOpen={setOpen}
        >
            <p>Are you sure you want delete post</p>
        </Modal>
    </motion.li>
  )
}

export default Delete