import { AnimatePresence, motion } from 'framer-motion';
import Lottie from 'lottie-react';
import React, { useState } from 'react'
import spinnerLoading from "../../../assets/animations/spinner-loading.json"

const ActionButton = ({text, icon, cb, isLoading, isDisable, extraClasses, defaultStyle, style}) => {
    const className = `d-flex flex-wrap align-items-center rounded-0 ${(defaultStyle)? "border border-dark shadow-very-sm" : ""} ${extraClasses ?? ""}`
    const [active, setActive]= useState(false);

    const handleClick = (e)=>{    
      cb(e);
    }
  
  return(
    <button 
      onClick={handleClick}
      type='button'
      className={className}
      style={style}
    >
      <AnimatePresence mode="await" initial="false">
        <motion.span
          initial={{originX: "center"}}
          whileHover={{scale: 1.1, color: "var(--bs-primary)", originX: "center"}}
          exit={{visibility: "hidden", position: "absolute"}}
          className={`w-100 h-100 d-flex flex-wrap align-items-center justify-content-center gap-1 ${active? "text-primary": ""}`}
        >
          {
            (isLoading)?
              <Lottie 
                animationData={spinnerLoading} 
                loop={true} 
                className={'d-flex align-items-center'} 
                style={{width: "20px", height: "20px"}}
              />
            :
            <>
              { icon && icon }
            </>
          }
          { 
            text &&
            <span>{text}</span>
          }
        </motion.span>
      </AnimatePresence>
    </button>
  )
}

export default ActionButton