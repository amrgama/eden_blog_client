import React from 'react'

const VisibleModal = ({children}) => {
  return (
    <div 
    className={`modal fade ${open? "show": ""}`} 
    id="staticBackdrop" 
    data-bs-backdrop="static" 
    data-bs-keyboard="false" 
    tabIndex="-1" 
    aria-labelledby="staticBackdropLabel"
    aria-modal="true"
    role="dialog"
    style="display: block;"
    >
        {children}
    </div>
  )
}

export default VisibleModal