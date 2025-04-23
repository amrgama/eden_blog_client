import React from 'react'

const MainTitle = ({title, extraClasses}) => {
  const className = `main-header w-100 d-flex align-items-center gap-3 mb-4 ${extraClasses ?? ""}`
  return (
    <div className={className}>
        <span className='fw-bolder fs-1 text-dark text-nowrap'>-------- x</span>
        <h1 className='text-capitalize fw-bolder fs-1 text-dark m-0'>{title}</h1>
        <span className='fw-bolder fs-1 text-dark text-nowrap'>x --------</span>
    </div>
  )
}

export default MainTitle