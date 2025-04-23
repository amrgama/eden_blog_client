import React from 'react'

const SkeletonSmallCard = () => {
  return (
    <div 
        className={`small-card w-100 d-flex flex-wrap gap-3`}
        aria-hidden="true"
    >
        <span 
            className='card-image col-6 placeholder-glow'
            style={{height: "100px"}}
        >
            <span className="col-12 h-100 placeholder"></span>
        </span>
        <div className="col-5 d-flex flex-wrap gap-1">
            <div className='col-12 d-flex flex-wrap gap-1 placeholder-glow'>
                <span className='col-5 h-fit text-primary fw-bold me-1 placeholder'></span>
                <span className='col-5 h-fit text-primary fw-bold me-1 placeholder'></span>
            </div>
            <span className="category col-12 fw-bold text-capitalize text-start placeholder-glow">
                <span className="col-5 placeholder"></span>
            </span>
            <h3 className='card-title w-100 m-0 fs-6 fw-bold text-dark text-start'>
                <span className='nav-link placeholder-glow'>
                    <span className="col-9 placeholder"></span>
                </span>
            </h3>
      </div>
    </div>
  )
}

export default SkeletonSmallCard