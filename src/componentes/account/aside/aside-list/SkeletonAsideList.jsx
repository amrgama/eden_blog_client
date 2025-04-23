import React from 'react'
import SkeletonAsideListCard from './SkeletonAsideListCard'

const SkeletonAsideList = ({title}) => {
    return (
        <div 
            className='w-100 bg-white'
        >
            <h4 className='px-3 py-2 fs-5 fw-500 lh-base m-0 border-bottom border-dark'>{title}</h4>
            <div className="d-flex flex-column gap-2">
                <div className="w-100 placeholder-glow" style={{height: "30px"}}>
                    <span className="d-block h-100 placeholder"></span>
                </div>
                <div className='overflow-auto' style={{maxHeight: "300px"}}>
                    <SkeletonAsideListCard />
                    <SkeletonAsideListCard />
                </div>
            </div>
        </div>
      )
}

export default SkeletonAsideList