import React, { useState } from 'react'

const postStatus = ["public", "private"];

const Privacy = ({pubishRef, defaultVal}) => {
  const [value, setValue] = useState(defaultVal)

  const renderdLiElements = postStatus.map((status, i)=>{
    return (
      <li key={i} className="nav-item form-check text-end">
        <input 
          id="publicStatusBtn"
          name='statusBtn'
          type="radio"
          onChange={e => setValue(status)}
          defaultChecked={value === status}
          className="form-check-input"
        />
        <label className="form-check-label" htmlFor="publicStatusBtn">{status}</label>
      </li>
    )
  })

  return (
    <div className='d-block w-100 bg-white'>
        <span className="d-block fs-5 fw-500 border-bottom border-2 border-dark px-3 py-2">Publish</span>
        <input 
          type="hidden"
          ref={pubishRef}
          value={value}
        />
        <ul className='navbar-nav p-3' >
          {renderdLiElements}
        </ul>
    </div>
  )
}

export default Privacy