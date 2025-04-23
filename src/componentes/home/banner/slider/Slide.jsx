import React from 'react'
import {BsEye} from "react-icons/bs"

const Slide = ({postData}) => {
  return (
    <div className='bg-dark ps-1 pt-1 pe-2 pb-2' style={{height: "550px"}}>
      <img src={postData.image} className='w-100 h-100 d-block position-relative' alt="..." />
      <div className="overlay w-100 h-100 px-3 py-5 p-sm-5 d-flex flex-column align-items-center justify-content-evenly position-absolute top-0 start-0">
        <div className='d-flex flex-wrap align-items-center gap-3'>
          {
            postData.tags.map((tag, i) =>{
              return <span key={i} className='text-white'> <span className='text-primary fw-bold me-1'>#</span>{tag}</span>
            })
          }
        </div>
        <span className='display-4 text-capitalize fw-bolder text-white d-block' style={{maxWidth: "700px"}}>
          {postData.title}
        </span>
        <div className='d-flex align-items-center gap-3 fw-bold text-white'>
          <span className='text-capitalize'>{postData.date}</span>
          <span className='bg-primary' style={{width: "30px", height: "10px"}}></span>
          <span>{postData.readers} <BsEye className='ms-1' /></span>
        </div>
        <div className="user d-flex align-items-center gap-3">
          <img src={postData.userImg} className='rounded-circle d-block' style={{maxWidth: "60px", maxHeight: "60px"}} alt="..." />
          <span className='text-capitalize text-light fw-bold fs-5'>{postData.userName}</span>
        </div>
      </div>
    </div>
  )
}

export default Slide