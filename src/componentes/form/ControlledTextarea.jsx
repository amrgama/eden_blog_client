import React from 'react'
import ErrorMsg from './ErrorMsg'
import { AnimatePresence } from 'framer-motion'

const ControlledTextarea = ({id, name, type, onChange, value, placeholder, errorMsg, textareaWrapperClasses, textareaClasses}) => {
    return (
        <div className={`textarea-wrapper w-100 d-flex flex-column align-items-center gap-2 ${textareaWrapperClasses? textareaWrapperClasses : ""}`}>
            <textarea
              id={id}
              type={type}
              name={name}
              onChange={onChange}
              value={value}
              placeholder={placeholder}
              className={`form-control h-100 p-3 ${errorMsg? "text-danger": "text-dark"} ${textareaClasses? textareaClasses: ""}`}            
            />
            <AnimatePresence mode="wait" initial={false}>
              { errorMsg && <ErrorMsg message={errorMsg} />}
            </AnimatePresence>
        </div>
      )
}

export default ControlledTextarea