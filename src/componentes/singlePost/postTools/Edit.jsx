import React from 'react'
import {Link, useParams} from "react-router-dom"
import {AiTwotoneEdit, AiOutlineEdit} from "react-icons/ai"
import { AnimatePresence, motion } from 'framer-motion'

const Edit = () => {
  const {id: postId} = useParams();
  console.log("id", postId);

  return (
    <motion.li 
    initial={{backgroundColor: "rgb(255, 255, 255)", color: "var(--bs-dark)"}}
    whileHover={{backgroundColor: "var(--bs-primary)", color: "rgb(255, 255, 255)"}}
    transition={{duration: 0.1}}
    className="nav-item">
        <Link to={`/${postId}/edit`} className="nav-link px-2 lh-1">
          <AiOutlineEdit className="fs-5" />
        </Link>
    </motion.li>
  )
}

export default Edit