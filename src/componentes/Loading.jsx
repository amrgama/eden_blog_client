import React from 'react'
import Lottie from "lottie-react";
import loading from "../assets/animations/loading.json"
import { AnimatePresence, motion } from 'framer-motion';

const Loading = () => {
  return (
    <AnimatePresence mode="await" initial="false">
        <motion.div
            // initial={{scaleY: 1, transformOrigin: "bottom"}}
            // animate={{scaleY: 0, transformOrigin: "bottom", transitionTimingFunction: "ease-in"}}
            // exit={{scaleY: 1, transformOrigin: "bottom"}}
            // transition={{duration: 0.5, delay: 1}}
            className='w-100 h-100 d-flex align-items-center justify-content-center position-fixed top-0 start-0 bg-light'
            style={{zIndex: 10000}}
        >
            <Lottie  animationData={loading} />
        </motion.div>
    </AnimatePresence>
  )
}

export default Loading