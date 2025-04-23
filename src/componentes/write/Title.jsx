import React from 'react'
import ErrorMsg from '../form/ErrorMsg'
import { AnimatePresence } from 'framer-motion'

const Title = ({id, name, placeholder, onChange, value, errMsg, extraClasses}) => {
  
  console.log("titleinput value", value)
  const classeName = extraClasses? extraClasses: ""
  console.log(errMsg)
  return (
    <div className={`title bg-white ${classeName ?? ""}`}>
        <input
            id={id}
            name={name}
            type="text" 
            placeholder={placeholder}
            onChange={(e)=> onChange(e.target.value)}
            value={value}
            className={`form-control rounded-0 px-3 py-2 fs-3 ${errMsg? "text-danger": "text-dark"}`}
            style={{background: "transparent"}} 
        />
        <AnimatePresence mode='await' initial="false">
            {errMsg && <ErrorMsg message={errMsg} extraClasses={"mt-1"} />}
        </AnimatePresence>
    </div>
  )
}

export default Title