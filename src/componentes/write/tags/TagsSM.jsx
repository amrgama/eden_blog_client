import React, { useRef, useState } from 'react'
import UserTags from './UserTags';
import TrendingTags from './TrendingTags';
import { AnimatePresence, motion } from 'framer-motion'
import Dropdown from '../../ui-kits/Dropdown';

const TagsSM = () => {
    const [show, setShow] = useState(false);

    return (
        <div className='tags w-100 position-relative bg-white'>
             <button 
                type='button' 
                onClick={(e) => setShow(!show)}
                onBlur={(e) => setShow(false)}
                className={`w-100 strike d-block bg-transparent border border-dark box-shadow-sm rounded-0 px-3 py-2 ${show? "active strike-w-50": ""}`}
            >
                <span className='fs-5 fw-bold text-dark'>Tags</span>
            </button>
            <Dropdown show={show} extraClasses={"bg-white"}>
                <UserTags />
                <TrendingTags />
            </Dropdown>
            {/* <AnimatePresence mode='await' initial="false">
                { 
                    show && 
                    <motion.div 
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        transition={{duration: 0.3}}
                        className={`dropdown w-100 position-absolute top-100 start-0 ${!show? "show": ""}`}
                    >
                        <div className="position-relative">
                            <div className='navbar-nav position-relative p-3 bg-white' >
                                <UserTags />
                                <TrendingTags />
                            </div>
                            <motion.div
                                initial={{scaleY: 1, transformOrigin: "bottom"}}
                                animate={{scaleY: 0, transformOrigin: "bottom", transitionTimingFunction: "ease-in"}}
                                exit={{scaleY: 1, transformOrigin: "bottom"}}
                                transition={{duration: 0.3, delay: 0.18}}
                                className="overlay"
                            ></motion.div>
                        </div>
                    </motion.div>
                }
            </AnimatePresence> */}
        </div>
    )
}

export default TagsSM