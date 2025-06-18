import React, { useState, useRef, useEffect } from 'react'
import Dropdown from '../ui-kits/Dropdown'
import { AiOutlineMenu } from "react-icons/ai";

const Menu = ({children}) => {
    const [show, setShow]= useState(false);
    const menuRef = useRef(null);

    function handleOnClick(){
        setShow(!show)
    }
    
    function hideOnBlur(){
        setShow(false)
    }
    
    useEffect(() => {
        // Function to handle clicks outside the menu
        function handleClickOutside(event) {
            // If menuRef is set and the click is outside menuRef
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShow(false);
            }
        }
        
        // Add event listener when menu is shown
        if (show) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        
        // Cleanup the event listener
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [show]);
    
    return (
        <div ref={menuRef} className='order-3'>
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
        </div>
    )
}

export default Menu