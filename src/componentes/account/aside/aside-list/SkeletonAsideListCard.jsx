import React from 'react'
import SkeletonImage from '../../../skeletonLoading/SkeletonImage'

const SkeletonAsideListCard = () => {
    return (
        <div className={`d-flex align-items-center gap-2 px-3 py-2`}>
            <div
                style={{width: "60px", height: "60px"}} 
            >
                <SkeletonImage extraClasses={"rounded-circle"} />
            </div>
            <div className="col d-flex flex-wrap align-items-center gap-1 text-start">
                <div className="w-100 d-flex flex-column gap-1 me-auto">
                    <span className='w-75 fw-500 placeholder-glow'>
                        <span className="d-block h-100 placeholder"></span>    
                    </span>
                    <span className='w-50 text-muted fs-7 fw-500 placeholder-glow'>
                        <span className="d-block h-100 placeholder"></span>
                    </span>
                </div>
            </div>
        </div>   
    )
}

export default SkeletonAsideListCard