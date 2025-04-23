import React from 'react'

const HiddenModal = ({children}) => {
  return (
    <div 
    className={`modal fade ${open? "show": ""}`} 
    id="staticBackdrop" 
    data-bs-backdrop="static" 
    data-bs-keyboard="false" 
    tabIndex="-1" 
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
    >
        {children}
    </div>
  )
}

export default HiddenModal 