import React from 'react'
import ErrorMsg from '../form/ErrorMsg'

const Description = ({id, name, placeholder, register, errMsg, extraClasses}) => {
    const classes = extraClasses? extraClasses: ""
    return (
    <div className={`w-100 ${classes}`}>
        <textarea 
            id={id}
            name={name} 
            rows="3"
            placeholder={placeholder}
            {...register}
            className={`form-control rounded-0 text-dark p-3`}
            style={{background: "transparent", resize: "none"}}
        >
        </textarea>
        <AnimatePresence mode='await' initial="false">
            {errMsg && <ErrorMsg message={errMsg} extraClasses={"mt-1"} />}
        </AnimatePresence>
    </div>
  )
}

export default Description