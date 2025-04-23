import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { BsPerson } from 'react-icons/bs'
import {HiOutlineLogout} from "react-icons/hi"
import { logout } from '../../features/auth/authSlice'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { reset } from '../../features/auth/authSlice'
import Dropdown from '../ui-kits/Dropdown'

const User = ({user}) => {
    const [show, setShow] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onLogout = async (e)=>{
        e.preventDefault();
        try{
            dispatch(logout())
            // dispatch(reset())
            navigate("/login")
        }
        catch(err){
            
            if(!err.response){
                toast.error("No server response")
            }
            else if(err && err.status === 500){
                toast.error("faild to logout")
            }
            console.log("error in logout", err)
        }
    }

    function handleOnClick(){
        setShow(prev => !prev)
    }
    function handleOnBlur(){
        setShow(false);
    }

  return (
    <div className='user position-relative'>
        <button 
            onClick={handleOnClick}
            onBlur={handleOnBlur}
            className={`toggler strike btn border-0 p-0 ${show? "active strike-w-100": ""}`}
        >
            <span className={`vector`}>
                <BsPerson className='fs-4 fw-bold text-dark' />
            </span>
        </button>
        <Dropdown show={show}>
            <div className='w-100 px-3 py-2 bg-secondary'>
                <span 
                    className="name w-100 text-capitalize fw-bold text-primary"
                >
                    {user?.firstName +" "+ user?.lastName}
                </span>
            </div>
            <ul className="w-100 bg-white navbar-nav flex-column">
                <motion.li
                    whileHover={{color: "var(--bs-primary) !important"}}
                    className='nav-item p-0'
                >
                    <Link to={`/account/${user.userName}`} className='nav-link px-3 m-0'>
                        Account
                    </Link>
                </motion.li>
                <motion.li
                    whileHover={{color: "var(--bs-primary) !important"}}
                    className='nav-item p-0'
                >
                    <button 
                        onClick={onLogout}
                        className='nav-link w-100 px-3 text-start'
                    >
                        Logout <HiOutlineLogout className="fs-5" />
                    </button>
                </motion.li>
            </ul>
        </Dropdown>
    </div>
  )
}

export default User