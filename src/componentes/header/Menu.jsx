import React, { useState } from 'react'
import Dropdown from '../ui-kits/Dropdown'
import { AiOutlineMenu } from "react-icons/ai";

const Menu = ({children}) => {
    const [show, setShow]= useState(false);

    function handleOnClick(){
    setShow(!show)
    }
    function hideOnBlur(){
    setShow(false)
    }
  return (
    <>
        <button 
            onClick={handleOnClick} 
            type="button" 
            className={`d-flex p-0 m-0 order-3 strike strike-w-100 border border-white bg-white ${show? "active": ""}`}
            style={{width: "50px", height: "40px"}}
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav" 
            aria-controls="navbarNav" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
        >
            <AiOutlineMenu className='text-dark fs-1 m-auto' />
        </button>
        <Dropdown show={show} extraClasses={""}>
            {children}
        </Dropdown>
    </>
  )
}

export default Menu