import React from 'react'
import { Link } from 'react-router-dom'

const CategoriesItem = ({text, href, index}) => {
  return (
    <li className={`nav-item w-100 px-3 py-2 ${(index == 0)? "": "border-top"} border-1 border-secondary`}>
        <Link to={href} className="nav-link text-dark text-start text-capitalize p-0">
            {text}
        </Link>
    </li>
  )
}

export default CategoriesItem