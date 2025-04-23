import React from 'react'
import { useSelector } from 'react-redux'
import { selectAuth } from '../features/auth/authSlice'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const RequiredAuth = () => {
    const user = JSON.parse(window.localStorage.getItem("user")) || useSelector(selectAuth)?.user
    const location = useLocation()
    // console.log("Auth/user", user)
    if(Object.keys(user).length){
        return <Outlet />
    }

    return (
        <Navigate to={"/login"} state={{from: location}} replace />
    )
}

export default RequiredAuth