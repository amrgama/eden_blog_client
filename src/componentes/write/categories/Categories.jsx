import React, { useEffect, useState } from 'react'
import ErrorMsg from '../../form/ErrorMsg'
import { AnimatePresence } from 'framer-motion'

// const categories = ["lifestyle", "sport", "english"]

const Categories = ({id, name, value, onChange: handle, errMsg}) => {
  const [categories, setCategories] = useState(["lifestyle", "sport", "english"]);
  console.log("catValue", value)
 
  const createCategory= (e)=>{
      const enterKey = e.key || e.code;
  
      if(enterKey === "Enter") {
        e.preventDefault()
        e.stopPropagation()
        console.log("e.target.value", e.target.value);
        const value= e.target.value;
        handle(value);
        setCategories(prev => [...prev, value])
        e.target.value= "";
      }
    }
    // console.log("categories", categories);
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
           <div className='user-tags'>
            <div className="head p-3 border-bottom border-2 border-dark">
              <input
                type='text'
                onKeyDown={createCategory}
                placeholder='type your category'
                className='d-block w-100 px-2 py-1 bg-transparent border-1 text-dark text-start'
              />
            </div>
            <ul className='navbar-nav p-3 gap-2' >
              {renderedLi}
            </ul>
          </div>
        </div>
      <AnimatePresence mode='await' initial="false">
        {errMsg && <ErrorMsg message={errMsg} extraClasses={"mt-1"} />}
      </AnimatePresence>
    </div>
  )
}

export default Categories