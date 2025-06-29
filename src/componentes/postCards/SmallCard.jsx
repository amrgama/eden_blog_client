import React from 'react'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../../api/axios'
import { combineWithBaseUrl } from '../../utils/helper'

const SmallCard = ({postData, extraClasses}) => {

  return (
    <div className={`${extraClasses} small-card d-flex h-fit gap-3`}>
      <img src={postData.isStatic? postData.image: combineWithBaseUrl(postData.image)} className='d-inline-block' style={{width: "150px", height:"120px", objectFit:"fill", objectPosition: "center"}} alt="..." />
      <div className="d-flex flex-wrap gap-1">
        <div className='d-flex flex-wrap'>
          {
              postData.tags.map((tag, i) =>{
              return <span key={i} className='me-1'> <span className='text-primary fw-bold me-1'>#</span>{tag}</span>
              })
          }
        </div>
        <span className="category w-100 fw-bold text-capitalize text-start">\ {postData.category}</span>
        <h3 className='card-title m-0 fs-6 fw-bold text-dark text-start'>
          <Link to={`/posts/${postData._id}`} className='nav-link line-clamp-2'>
            {postData.title}
          </Link>
        </h3>
      </div>
    </div>
  )
}

export default SmallCard