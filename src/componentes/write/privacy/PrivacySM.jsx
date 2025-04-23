import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Dropdown from '../../ui-kits/Dropdown';

const postStatus = ["public", "private"];

const PrivacySM = ({pubishRef, defaultVal}) => {
    const [value, setValue] = useState(defaultVal)
    const [show, setShow] = useState(false);

    const renderdLiElements = postStatus.map((status, i)=>{
        return (
            <li key={i} className="nav-item form-check text-end">
                <input 
                id="publicStatusBtn"
                name='statusBtn'
                type="radio"
                onChange={e => setValue(status)}
                defaultChecked={value === status}
                className="form-check-input"
                />
                <label className="form-check-label" htmlFor="publicStatusBtn">{status}</label>
            </li>
        )
    })

    return(
        <div className='w-100 position-relative bg-white borde border-2 border-dark bo-shadow-sm'>
            <button 
                type='button' 
                onClick={(e) => setShow(!show)}
                onBlur={(e) => setShow(false)}
                className={`w-100 strike d-block bg-transparent border border-dark box-shadow-sm rounded-0 px-3 py-2 ${show? "active strike-w-50": ""}`}
            >
                <span className='fs-5 fw-500 text-dark'>Publish</span>
            </button>
            <Dropdown show={show}>
                <ul className='navbar-nav position-relative p-3 bg-white' >
                    {renderdLiElements}
                </ul>
            </Dropdown>
            {/* <AnimatePresence mode='await' initial="false">
                { 
                    show && 
                    <motion.div 
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        transition={{duration: 0.3}}
                        className={`dropdown w-100 position-absolute top-100 start-0 ${!show? "open": ""}`}
                    >
                        <div className="position-relative">
                            <ul className='navbar-nav position-relative p-3 bg-white' >
                                {renderdLiElements}
                            </ul>
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
            <input 
                type="hidden"
                ref={pubishRef}
                value={value}
            />
        </div>
    )
}

export default PrivacySM