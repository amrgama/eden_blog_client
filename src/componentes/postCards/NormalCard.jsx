import React from 'react'
import {BsEye} from "react-icons/bs"
import { Link } from 'react-router-dom'
import TimeAgo from '../singlePost/TimeAgo'
import { BASE_URL } from '../../api/axios'
import { combineWithBaseUrl } from '../../utils/helper'

const NormalCard = ({postData, extraClasses}) => {

  return (
    <div className={`${extraClasses} normal-card d-flex flex-column border border-dark box-shadow-sm bg-white p-3 p-md-4 overflow-hidden`} style={{height: "540px"}}>
        <img src={postData.isStatic? postData.image: combineWithBaseUrl(postData.image)} className='col-12 d-block'
        style={{minHeight: "200px", maxHeight: "220px"}} alt="..." />
        <div className='col-12 pt-4 text-start d-flex flex-column gap-2' style={{flex: 1}}>
            <div className='d-flex flex-wrap gap-1' style={{
                height: "50px",
                overflow: "hidden",
            }}>
                {
                    postData.tags.map((tag, i) =>{
                        return  <span key={i}>
                                    <span className='text-primary fw-bold me-1'>#</span>{tag}
                                </span>
                    })
                }
            </div>
            <span className="category w-100 fw-bold text-capitalize">\ {postData.category}</span>
            <h2 className='card-title mt-1 mb-0 mx-0 fs-4 fw-bold text-dark'>
                <Link to={`/posts/${postData._id}`} className='nav-link line-clamp-2'>
                    {postData.title}
                </Link>
            </h2>
            <div className='d-flex align-items-center gap-3 fw-bold'>
                <TimeAgo date={postData.createdAt} />
                <span className='bg-primary' style={{width: "30px", height: "10px"}}></span>
                <span className=''>{postData.readers || "0"} <BsEye className='ms-1' /></span>
            </div>
            <div>
                <span className='bg-primary text-white px-1 fw-bold'>By</span>
                <span className='d-block text-capitalize fs-6 second-font-family'>{postData.author?.userName}</span>
            </div> 
            {/* <p className='content text-secondary line-clamp d-lg-none'>{postData.desc?.length > 80? postData.desc?.slice(0, 80) + "..." : postData.desc}</p>            */}
        </div>
    </div>
  )
}

export default NormalCard