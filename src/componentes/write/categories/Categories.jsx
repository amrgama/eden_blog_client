import React, { useEffect, useState } from 'react'
import ErrorMsg from '../../form/ErrorMsg'
import { AnimatePresence } from 'framer-motion'

const categories = ["lifestyle", "sport", "english"]

const Categories = ({id, name, value, onChange: handle, errMsg}) => {
  // const [category, setCategory] = useState()
  console.log("catValue", value)
  const renderedLi = categories.map((cat, i) =>{
    return(
        <li key={i} className="nav-item form-check text-end p-0">
            <input 
                className="btn-check"
                name='categoryBtn'
                type="radio"
                id={`${cat}`}
                onChange={e => handle(e.target.value)}
                defaultChecked={value === cat}
                value={cat}
            />
            <label className="w-100 btn btn-primary border-dark" htmlFor={`${cat}`}>{cat}</label>
        </li>
    )
  })

  return (
    <div className="category w-100 bg-white">
      <div className={`d-block w-100 border border-2 border-dark ${errMsg? "text-danger": "text-dark"}`}>
          <span className="d-block fs-5 fw-500 border-bottom border-2 border-dark px-3 py-2">Categories</span>
          <input
            id={id}
            name={name}
            type="hidden" 
          />
          <ul className='navbar-nav p-3 gap-2' >
            {renderedLi}
          </ul>
      </div>
      <AnimatePresence mode='await' initial="false">
        {errMsg && <ErrorMsg message={errMsg} extraClasses={"mt-1"} />}
      </AnimatePresence>
    </div>
  )
}

export default Categories