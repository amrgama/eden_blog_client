import React from 'react'

const SkeletonReply = () => {
  return (
    <div 
        className='d-flex flex-wrap border border-3 border-dark styled-box px-3 py-3'
        style={{maxWidth: "600px"}}
        aria-hidden="true"
    >
        <span 
            className='rounded-circle overflow-hidden placeholder-glow' 
            style={{width: "37.5px", height: "37.5px"}}
        >
            <span className="col-12 h-100 placeholder"></span>
        </span>
        <div className="col d-flex flex-column gap-1 ps-2">
            <div className="d-flex">
                <span className="user col-6 d-inline-flex flex-column me-auto placeholder-glow">
                    <span className='user-full-name col-12 mb-1 fw-bold text-capitalize placeholder'></span>
                    <span className="user-user-name col-12 text-muted fs-8 placeholder"></span>
                </span>
                <span className="col-4">
                    <SkeletonTimeAgo />
                </span>
            </div>
            <p className="content col-7 m-0 second-font-family text-secondary placeholder-glow">
                <span className="col-12 placeholder"></span>
            </p>
            <button 
                type='button' 
                className="col-2 p-0 mt-1 ms-auto fs-7 rounded-pill border border-2 border-dark bg-primary placeholder-glow"
                style={{height: "30px"}}
            >
                <span className="col-12 h-100 placeholder"></span>
            </button>
        </div>
    </div>
  )
}

export default SkeletonReply