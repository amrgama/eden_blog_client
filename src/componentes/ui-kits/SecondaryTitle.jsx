import React from 'react'

const SecondaryTitle = ({title, extraClasses}) => {
  const className = `main-header w-100 d-flex align-items-center gap-3 ${extraClasses ?? ""}`
  return (
    <div className={className}>
        <span className='fw-bold fs-5 text-dark text-nowrap'>-------- x</span>
        <span className='text-capitalize fw-bold fs-5 text-dark m-0'>{title}</span>
        <span className='fw-bold fs-5 text-dark text-nowrap'>x --------</span>
    </div>
  )
}

export default SecondaryTitle