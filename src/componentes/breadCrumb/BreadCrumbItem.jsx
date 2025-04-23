import React from 'react'
import { Link } from 'react-router-dom'

const BreadCrumbItem = ({text, path, isActive=false}) => {
    
    if(isActive){
        return(
            <li className="breadcrumb-item text-capitalize active" aria-current="page">
                {text.split("-").join(" ")}
            </li>
        )
    }
    
    return(
        <li className="breadcrumb-item" aria-current="page">
            {
                <Link to={path} className='text-dark text-capitalize'>
                    {text.split("-").join(" ")}
                </Link>
            }
        </li>
    )
}

export default BreadCrumbItem