import React from 'react'

const SkeletonUser = () => {
  return (
    <div className='user bg-white position-relative'>
        <div 
            className="w-fit p-2 bg-white border border-2 border-dark box-shadow-sm"
            style={{position: "absolute", left: "50%", transform: "translateX(-50%)", bottom: "calc(100% - 0.5rem)"}}
        >
            <span 
                className='user-img d-block placeholder-glow'
                style={{width: "70px", height:"70px"}}>
                <span className="col-12 h-100 placeholder"></span>
            </span>
        </div>
        <div className="p-4 d-flex flex-wrap align-items-center justify-content-center gap-2 position-relative">
            <span className="col-4 fw-bold fs-5 text-primary text-capitalize placeholder-glow">
                <span className="col-12 placeholder"></span>
            </span>
            <span className="col-8 text-center text-secondary placeholder-glow">
                <span className="col-12 placeholder"></span>
            </span>
            <div className="w-100 d-flex align-items-center justify-content-center gap-3">
                <span className="placeholder-glow" style={{width: "50px", height: "50px"}}>
                    <span className="col-12 h-100 placeholder"></span>
                </span>
                <span className="placeholder-glow" style={{width: "50px", height: "50px"}}>
                    <span className="col-12 h-100 placeholder"></span>
                </span>
                <span className="placeholder-glow" style={{width: "50px", height: "50px"}}>
                    <span className="col-12 h-100 placeholder"></span>
                </span>
            </div>
        </div>
    </div>
  )
}

export default SkeletonUser