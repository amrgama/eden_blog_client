import React from 'react'
import ErrorMsg from './ErrorMsg'
import { AnimatePresence } from 'framer-motion'

const Textarea = ({id, name, type, placeholder, register, errorMsg, extraClasses}) => {
    return (
        <div className={`textarea-wrapper w-100 d-flex flex-column align-items-center gap-2 ${extraClasses? extraClasses : ""}`}>
            <textarea
              id={id}
              type={type}
              name={name}
              className={`form-control h-100 p-3 ${errorMsg? "text-danger": "text-dark"}`}
              placeholder={placeholder}
              {...register}            
            />
            <AnimatePresence mode="wait" initial={false}>
              { errorMsg && <ErrorMsg message={errorMsg} />}
            </AnimatePresence>
        </div>
      )
}

export default Textarea