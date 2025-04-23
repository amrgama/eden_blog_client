import React from 'react'

const SkeletonUserSetting = () => {

  return (
    <div 
        className='position-absolute bottom-0 end-0 border border-1 border-dark shadow-very-sm'
        style={{width: "35px", height: "35px", transform: "translate(17.5px, 0px)"}}
    >
        <button 
            className="normalize-btn rounded-0 bg-white placeholder-glow"
            style={{width: "35px", height: "35px"}}
        >
            <span className="col-12 h-100 d-block fs-5 text-dark placeholder" /> 
        </button>
    </div>
  )
}

export default SkeletonUserSetting