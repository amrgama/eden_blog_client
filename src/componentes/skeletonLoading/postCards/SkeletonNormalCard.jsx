import React from 'react'

const SkeletonNormalCard = () => {
  return (
    <div 
        className={`normal-card border border-2 border-dark box-shadow-sm bg-white p-3 p-md-4`}
        aria-hidden="true"
    >
        <span 
            className='col-12 d-block placeholder-glow'
            style={{height: "200px"}}
        >
            <span className="col-12 h-100 placeholder"></span>
        </span>
        <div className='col-12 pt-4 text-start d-flex flex-column gap-3'>
        <div className='d-flex flex-wrap gap-1 placeholder-glow'>
            <span className='col-3 text-primary fw-bold me-1 placeholder'></span>
            <span className='col-3 text-primary fw-bold me-1 placeholder'></span>
            </div>
            <span className="category w-100 fw-bold text-capitalize placeholder-glow">
                <span className="col-3 placeholder"></span>
            </span>
            <h2 className='card-title m-0 fs-4 fw-bold text-dark'>
                <span className='nav-link placeholder-glow'>
                    <span className="col-9 placeholder"></span>
                </span>
            </h2>
            <div className='w-100 d-flex align-items-center gap-2 gap-xl-3 fw-bold placeholder-glow'>
                <span className="col-2 placeholder"></span>
                <span className='bg-primary' style={{width: "30px", height: "10px"}}></span>
                <span className="col-2 placeholder"></span>
            </div>
            <div>
                <span className='bg-primary text-white px-1 fw-bold'>By</span>
                <span className='d-block text-capitalize fs-6 second-font-family placeholder-glow'>
                    <span className="col-4 placeholder"></span>
                </span>
            </div> 
            <p className='content text-secondary line-clamp d-lg-none d-xl-block placeholder-glow'>
                <span className="col-4 placeholder"></span>
                <span className="col-10 placeholder"></span>
                <span className="col-9 placeholder"></span>
            </p>           
        </div>
    </div>
  )
}

export default SkeletonNormalCard