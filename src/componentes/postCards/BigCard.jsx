import React from 'react'
import {BsEye} from "react-icons/bs"
import { Link } from 'react-router-dom'
import TimeAgo from '../singlePost/TimeAgo'
// import { useDispatch, useSelector } from 'react-redux'
// import { selectAuth } from '../../features/auth/authSlice'
// import { increaseReadings } from '../../features/post/postSlice'
import useMediaQuery from '../../hooks/useMediaQuery'
import { BASE_URL } from '../../api/axios'
import { combineWithBaseUrl } from '../../utils/helper'

const BigCard = ({postData, type, extraClasses, style}) => {
    const matches = useMediaQuery("(min-width: 576px)");

    // const dispatch= useDispatch();
    // const {user}= useSelector(selectAuth)

    // function incReadings(){
    //     console.log("postData.id, user.id", postData._id, user.id)
    //     dispatch(increaseReadings({postId: postData._id, readerId: user.id}))
    // }
    // pt-4 pt-sm-0 ${(direction === "horizontal")? "ps-sm-2 ps-lg-4" : ""} 
    const direction = type ?? "horizontal";
    return (
        <div 
            className={`big-card d-flex ${(direction === "vertical")? "flex-column": ""} gap-3 flex-wrap border border-dark box-shadow-sm bg-white p-3 p-md-4 ${extraClasses ?? ""}`}
            style={style}
        >
            <img
                src={postData.isStatic? postData.image: combineWithBaseUrl(postData.image)} 
                alt={`${postData.title} image`}
                className={`col-12 ${(direction === "horizontal")? "col-sm" : ""} h-100 d-block`}
                style={{minHeight: "200px", maxHeight: "280px", maxWidth: (direction === "horizontal" && matches)? "290px": "100%" ,objectFit: "fill", objectPosition: "center"}}
            />
            <div 
                className={`col-12 ${(direction === "horizontal")? "col-sm" : ""} text-start d-flex flex-column gap-3`}
            >
                <div className='d-flex flex-column gap-1'>
                    <div className='d-flex flex-wrap gap-1 fs-7 overflow-hidden' style={{maxHeight: "80px"}}>
                        {
                            postData.tags.slice(0, 4).map((tag, i) =>{
                                return <span key={i}> <span className='text-primary fw-bold'>#</span>{tag}</span>
                            })
                        }
                    </div>
                    <span className="category w-100 fw-bold text-capitalize">\ {postData.category}</span>
                </div>
                <h2 className='card-title m-0 fs-5 fw-bold text-dark'>
                    <Link 
                        // onClick={incReadings} 
                        to={`/blog/${postData._id}`} 
                        className='nav-link line-clamp-2 text-decoration-underline'
                    >
                        {postData.title}
                    </Link>
                </h2>
                <div className='d-flex align-items-center gap-2 gap-xl-3 fw-bold'>
                    <TimeAgo date={postData.createdAt} />
                    <span className='bg-primary' style={{width: "30px", height: "10px"}}></span>
                    <span className='d-flex align-items-center fw-normal'>
                        {postData?.readings ?? 0}
                        <BsEye className='ms-1' />
                    </span>
                </div>
                <div>
                    <span className='bg-primary text-white px-1 me-2 fw-bold'>By</span>
                    <span className='fw-bold text-capitalize fs-6 second-font-family'>{postData.author.firstName} {postData.author.lastName}</span>
                </div> 
            </div>
        </div>
    )
}

export default BigCard