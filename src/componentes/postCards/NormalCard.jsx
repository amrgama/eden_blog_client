import React from 'react'
import {BsEye} from "react-icons/bs"
import { Link } from 'react-router-dom'
import TimeAgo from '../singlePost/TimeAgo'

const NormalCard = ({postData, extraClasses}) => {

  return (
    <div className={`${extraClasses} normal-card border border-dark box-shadow-sm bg-white p-3 p-md-4`}>
        <img src={postData.image} className='col-12 d-block'
        style={{maxHeight: "350px"}} alt="..." />
        <div className='col-12 pt-4 text-start d-flex flex-column gap-3'>
            <div className='d-flex flex-wrap gap-1'>
                {
                    postData.tags.map((tag, i) =>{
                        return  <span key={i}>
                                    <span className='text-primary fw-bold me-1'>#</span>{tag}
                                </span>
                    })
                }
            </div>
            <span className="category w-100 fw-bold text-capitalize">\ {postData.category}</span>
            <h2 className='card-title m-0 fs-4 fw-bold text-dark'>
                <Link to={`/blog/${postData._id}`} className='nav-link'>
                    {postData.title}
                </Link>
            </h2>
            <div className='d-flex align-items-center gap-3 fw-bold'>
                <TimeAgo date={postData.createdAt} />
                <span className='bg-primary' style={{width: "30px", height: "10px"}}></span>
                <span className=''>{postData.readers} <BsEye className='ms-1' /></span>
            </div>
            <div>
                <span className='bg-primary text-white px-1 fw-bold'>By</span>
                <span className='d-block text-capitalize fs-6 second-font-family'>{postData.author?.userName}</span>
            </div> 
            <p className='content text-secondary line-clamp d-lg-none'>{postData.content}</p>           
        </div>
    </div>
  )
}

export default NormalCard