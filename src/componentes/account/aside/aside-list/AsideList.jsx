import React from 'react'

const AsideList = ({title, children}) => {

  return (
    <div 
        className='w-100 bg-white'
    >
        <h4 className='px-3 py-2 fs-5 fw-500 text-capitalize lh-base m-0 border-bottom border-dark'>{title}</h4>
        <div className="d-flex flex-column gap-2 pb-2">
            {children}
        </div>
    </div>
  )
}

export default AsideList