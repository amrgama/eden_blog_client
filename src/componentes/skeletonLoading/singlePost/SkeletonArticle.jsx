import React from 'react'
import {BsEye} from "react-icons/bs"
import SkeletonTimeAgo from '../SkeletonTimeAgo'

const SkeletonArticle = () => {
  return (
    <article className='d-block w-100 position-relative p-4 bg-white d-flex flex-column align-items-start gap-3'>
        <span 
            className='col-12 d-block placeholder-glow'
            style={{height: "350px"}}
        >
            <span className="col-12 h-100 placeholder"></span>
        </span>
        <div className="w-100 d-flex align-items-center justify-content-between">
            <div className='col-6 d-flex flex-wrap gap-1 placeholder-glow'>
                <span className='col-3 text-primary fw-bold me-1 placeholder'></span>
                <span className='col-3 text-primary fw-bold me-1 placeholder'></span>
            </div>
            <div className='col-4 ms-auto d-flex align-items-center gap-2 gap-xl-3'>
                <span className="col-6">
                    <SkeletonTimeAgo />
                </span>
                <span className='bg-primary' style={{width: "30px", height: "10px"}}></span>
                <span className='col text-nowrap text-secondary placeholder-glow'>
                    <span className="col-12 placeholder"></span>
                </span>
                <span className="placeholder-glow" style={{width: "5px"}}>
                    <span className="col-12 placeholder"></span>
                </span>
            </div>
        </div>
        <span className="category w-100 fw-bold text-start text-capitalize placeholder-glow">
            <span className="col-3 placeholder"></span>
        </span>
        <h2 className='card-title col-12 m-0 fs-4 fw-bold text-dark text-start'>
            <span className='nav-link placeholder-glow'>
                <span className="col-9 placeholder"></span>
            </span>
        </h2>
        <span className='content col-12 second-font-family text-secondary text-start p-0 placeholder-glow'>
            <span className="col-4 placeholder"></span>
            <span className="col-10 placeholder"></span>
            <span className="col-9 placeholder"></span>
            <span className="col-12 placeholder"></span>
            <span className="col-5 placeholder"></span>
            <span className="col-9 placeholder"></span>
        </span>
    </article>
  )
}

export default SkeletonArticle