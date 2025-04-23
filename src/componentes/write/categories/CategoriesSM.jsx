import React, { useEffect, useState } from 'react'
import ErrorMsg from '../../form/ErrorMsg'
import { AnimatePresence, motion } from 'framer-motion'
import Dropdown from '../../ui-kits/Dropdown'
const categories = ["lifestyle", "sport", "english"]

const CategoriesSM = ({id, name, value, onChange: handle, errMsg}) => {
    const [show, setShow] = useState(false);
    // const [category, setCategory] = useState()
    // console.log("catValue", value)
    const renderedLi = categories.map((cat, i) =>{
    return(
        <li key={i} className="nav-item form-check text-end p-0">
            <input 
                className="btn-check"
                name='categoryBtn'
                type="radio"
                id={`${cat}`}
                onChange={e => handle(e.target.value)}
                defaultChecked={value === cat}
                value={cat}
            />
            <label className="w-100 btn btn-primary border-dark" htmlFor={`${cat}`}>{cat}</label>
        </li>
    )
  })

  return (
    <div className="categories w-100 position-relative bg-white">
        <div className={`d-block w-100 ${errMsg? "text-danger": "text-dark"}`}>
            <button 
                type='button' 
                onClick={(e) => setShow(!show)}
                onBlur={(e) => setShow(false)}
                className={`w-100 strike d-block bg-transparent border border-dark box-shadow-sm rounded-0 px-3 py-2 ${show? "active strike-w-50": ""}`}
            >
                <span className="fs-5 fw-500 text-dark">Categories</span>
            </button>
            <Dropdown show={show}>
                <ul className='navbar-nav gap-2 position-relative p-3 bg-white' >
                    {renderedLi}
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
                        className={`dropdown w-100 position-absolute top-100 start-0 ${!show? "show": ""}`}
                    >
                        <div className="position-relative">
                            <ul className='navbar-nav position-relative p-3 bg-white' >
                                {renderedLi}
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
            id={id}
            name={name}
            type="hidden" 
            />
        </div>
        <AnimatePresence mode='await' initial="false">
            {errMsg && <ErrorMsg message={errMsg} extraClasses={"mt-1"} />}
        </AnimatePresence>
    </div>
  )
}

export default CategoriesSM