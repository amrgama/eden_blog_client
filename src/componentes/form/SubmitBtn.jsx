import React from 'react'
import Lottie from "lottie-react"
import spinner from "../../assets/animations/spinner.json"
import { AnimatePresence, motion } from 'framer-motion'

const SubmitBtn = ({text, isLoading, isDisabled, onClick, extraClasses}) => {

    return(
        <div
            className={`btn-wrapper h-100 rounded-pill position-relative ${extraClasses}`}
        >
            <AnimatePresence mode='wait' initial="false">
                { isLoading &&
                    <motion.span 
                    initial= {{ opacity: 0, y: -60 }}
                    animate= {{ opacity: 1, y: 0 }}
                    exit={{opacity: 0, y: -60}}
                    transition={{duration: 0.3}}
                    className='loading-animation w-100 h-100 position-absolute top-0 start-0 d-flex justify-content-center px-3 fs-5'>
                        <Lottie  animationData={spinner} />
                    </motion.span>
                }
            </AnimatePresence>
            <AnimatePresence mode='wait' initial="false">
                { !isLoading &&
                <motion.button
                initial= {{ opacity: 0, scaleY: 0, transformOrigin: "bottom"}}
                animate= {{ opacity: 1, scaleY: 1, transformOrigin: "bottom"}}
                exit={{opacity: 0, scaleY:0, transformOrigin: "bottom"}}
                transition={{duration: 0.2, delay: 0.1}}
                type='submit' 
                // onClick={onClick? onClick: ()=> {}}
                className={`btn btn-primary position-absolute top-0 start-0 px-3 fs-6 fw-bold text-white ${isDisabled? "disabled": ""}`}>
                    {text}
                </motion.button>
                }
            </AnimatePresence>
        </div>
    )
}

export default SubmitBtn