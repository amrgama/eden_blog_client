import React, { useEffect, useState } from 'react'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { AnimatePresence, motion } from 'framer-motion'
import { useDispatch } from 'react-redux'
import {react} from "../../features/post/postSlice"

// const getUser = ()=>{
//   const isGuest = ()=>{
//     const guest = JSON.parse(window.localStorage.getItem("guest"))
//     return guest ?? false
//   }

//   if(isGuest) return null;

//   return JSON.parse(window.localStorage.getItem("user"))
// }

const LikeBtn = ({postId, userId, reactionList}) => {
  const dispatch = useDispatch()
  const user = JSON.parse(window.localStorage.getItem("user"));
  const [active, setActive] = useState(false);
  const [users, setUsers] = useState([])
  const [count, setCount] = useState(0);

  const onClick = (e)=>{
    setActive(!active)
    setCount(prev => {
      if(!active) return prev + 1
      return prev - 1
    })

    setUsers(prev => {
      if(!active) return [...prev, user]
      return prev.filter(prevUser => prevUser?._id !== userId)
    })

    dispatch(react({postId, userId}))
  }

  useEffect(()=>{
    // console.log("count", count)
    const foundedUser = reactionList?.some(user => user._id === userId)
    setActive(foundedUser)
    console.log("reactionList",reactionList, "foundedUser", foundedUser)

    setCount( reactionList?.length )
  }, [reactionList])

  return (
    <div 
    className="d-flex flex-wrap align-items-center"
    style={{maxWidth: "100px"}}>
      <span
        className='d-flex align-items-center justify-content-center bg-white rounded-circle'
        style={{width: "45px", height: "45px"}}
      >
        <button 
        onClick={onClick}
        className='like-btn btn p-0 bg-white'>
          <AnimatePresence mode="await" initial="false">
            { !active && 
              <motion.span
                initial={{originX: "center"}}
                whileHover={{scale: 1.2, originX: "center"}}
                exit={{visibility: "hidden", position: "absolute"}}
                className='d-block'
              >
                <AiOutlineHeart className='fs-4 text-dark' />
              </motion.span>
            }
          </AnimatePresence>
          <AnimatePresence mode="await" initial="false">
            { active && 
              <motion.span
              initial={{originX: "center"}}
              animate={{scale: 1.22}}
              exit={{visibility: "hidden", position: "absolute"}}
              transition={{duration: "0.2s", type: "spring", stiffness: "2000"}}
                className='d-block'
              >
                <AiFillHeart className='fs-4 text-danger' />
              </motion.span>
            }
          </AnimatePresence>
        </button>
      </span>
      <span 
      className="count d-flex align-items-center justify-content-center position-relative text-secondary px-1 bg-white"
      style={{minWidth: "30px"}}
      >
        <span
          className="opacity-0"
        >
          { count }
        </span>
        <AnimatePresence mode='await' initial="false">
          { active &&
            <motion.span
              exit={{translateY: "-100%", opacity: 0}}
              transition={{duration: 0.2, delay: 0.03}}
              className="position-absolute"
            >
              { count }
            </motion.span>
          }
        </AnimatePresence>
        <AnimatePresence mode='await' initial="false">
          { !active &&
            <motion.span
              exit={{translateX: "100%", opacity: 0}}
              transition={{duration: 0.2, delay: 0.03}}
              className="position-absolute"
            >
              { count }
            </motion.span>
          }
        </AnimatePresence>
      </span>
      
    </div>
  )
}

export default LikeBtn