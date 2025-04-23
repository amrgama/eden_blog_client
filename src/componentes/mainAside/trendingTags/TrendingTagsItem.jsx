import React from 'react'
import { Link } from 'react-router-dom'

const TrendingTagsItem = ({text, href, index}) => {
  return (
    <li className={`nav-item w-100 px-3 py-2 border border-1 border-dark overflow-hidden`}>
        <Link to={href} className="nav-link text-dark text-start text-capitalize p-0">
           <span className='fs-5 fw-bold text-primary'>#</span> {text}
        </Link>
    </li>
  )
}

export default TrendingTagsItem