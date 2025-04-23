import { AnimatePresence, motion } from 'framer-motion';
import React from 'react'

const Dropdown = ({show, extraClasses, children}) => {
    const className = `dropdown ${show? "show": ""} ${extraClasses ?? ""}`
  
    return (
        <AnimatePresence mode='await' initial="false">
            { 
                show && 
                <motion.div 
                    initial={{opacity: 0, visibility: "hidden"}}
                    animate={{opacity: 1, visibility: "visible"}}
                    exit={{opacity: 0, visibility: "hidden"}}
                    transition={{duration: 0.2}}
                    className={className}
                    style={{zIndex: 100}}
                >
                    <div className="position-relative">
                        {children}
                        <motion.div
                            initial={{scaleY: 1, transformOrigin: "bottom"}}
                            animate={{scaleY: 0, transformOrigin: "bottom"}}
                            exit={{scaleY: 1, transformOrigin: "bottom"}}
                            transition={{duration: 0.2, delay: 0.1}}
                            className="overlay"
                        ></motion.div>
                    </div>
                </motion.div>
            }
        </AnimatePresence>
    )
}

export default Dropdown