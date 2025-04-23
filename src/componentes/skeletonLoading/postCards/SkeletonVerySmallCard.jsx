import React from 'react'

const SkeletonVerySmallCard = () => {
  return (
    <div 
        className={`very-small-card d-flex flex-wrap gap-3`}
        aria-hidden="true"
    >
        <span 
            className='card-image col-2 placeholder-glow'
            style={{height: "70px"}}
        >
            <span className="col-12 h-100 placeholder"></span>
        </span>
        <div className="col-8 d-flex flex-wrap gap-1">
            <h4 className={`card-title w-100 m-0 fs-6 fw-bold text-start`}>
                <span className='nav-link placeholder-glow'>
                    <span className="col-9 placeholder"></span>
                </span>
            </h4>
            <div className='w-100 d-flex flex-wrap align-items-center'>
                <span className='bg-primary text-white px-1 me-1 fw-bold'>By</span>
                <span className={`col-5 text-capitalize fs-6 second-font-family placeholder-glow`}>
                    <span className="col-12 placeholder"></span>
                </span>
            </div>
        </div>
    </div>
  )
}

export default SkeletonVerySmallCard