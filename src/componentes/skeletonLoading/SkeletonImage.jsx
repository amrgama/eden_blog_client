import React from 'react'

const SkeletonImage = ({extraClasses}) => {
    const className= `w-100 h-100 placeholder-glow overflow-hidden ${extraClasses ?? ""}`

    return (
        <div className={className}>
            <span className='d-block h-100 placeholder'></span>
        </div>
    )
}

export default SkeletonImage