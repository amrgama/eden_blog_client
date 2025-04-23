import React from 'react'
import { Link } from 'react-router-dom'

const VerySmallCard = ({postData, extraClasses, whiteText=false}) => {

  return (
    <div className={`${extraClasses} very-small-card d-flex gap-3`}>
      <img src={postData.image} className='d-inline-block' style={{width: "50px", height: "50px", objectFit: "fill", objectPosition: "center"}} alt="..." />
      <div className="d-flex flex-column flex-wrap gap-1">
        <h4 className={`card-title m-0 fs-7 fw-bold ${whiteText? "text-white": "text-dark"} text-start`}>
          <Link 
            to={`/blog/${postData._id}`} className='nav-link'
          >
            {postData.title}
          </Link>
        </h4>
        <div className='d-flex flex-wrap align-items-center mt-auto'>
            <span className='bg-primary fs-7 text-white px-1 me-1 fw-bold'>By</span>
            <Link to={`/account/${postData.author?.userName}`} className={`nav-link text-capitalize fs-7 ${whiteText? "text-white": "text-muted"} fw-bold second-font-family`}>{postData.author?.firstName} {postData.author?.lastName}</Link>
        </div>
      </div>
    </div>
  )
}

export default VerySmallCard