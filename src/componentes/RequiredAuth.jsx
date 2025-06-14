import React from 'react'
import { useSelector } from 'react-redux'
import { selectAuth } from '../features/auth/authSlice'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const RequiredAuth = ({returnType= "outlet", action="redirect", redirectTo="/login", children}) => {
    const user = JSON.parse(window.localStorage.getItem("user")) || useSelector(selectAuth)?.user
    const location = useLocation()
    console.log("authedUser>>", user);
    if(!!user){
        if(returnType == "outlet"){
            return <Outlet />;
        }else{
            return children;
        } 
    }
    switch(action){
        case "disable":{
            console.log("disabled**************");
            if(returnType == "outlet"){
                return <div className="disabled" style={{pointerEvents: "none"}}><Outlet /></div>
            }else{
                return <div className="disabled" style={{pointerEvents: "none"}}>{children}</div>;
            }
        }
        case "redirect":{
            return (
                <Navigate to={redirectTo || "/login"} state={{from: location}} replace />
            )
        }                
        case "hide":
            default: {
                return;
            }                
    }
}

export default RequiredAuth