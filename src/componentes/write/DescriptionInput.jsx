import React, { useRef } from 'react'
import ControlledTextarea from '../form/ControlledTextarea'

const DescriptionInput = ({defaultValue, descriptionRef}) => {

  function onChange(e){
    descriptionRef.current = e.currentTarget.value;
  }

  return (
    <ControlledTextarea
      onChange={onChange}
      id={"desc"}
      name={"desc"}
      placeholder={"Description"}
      value={descriptionRef.current ?? defaultValue}
      textareaWrapperClasses={"p-0 m-0"}
      textareaClasses= {"border border-2 border-dark shadow-none"}
    />
  )
}

export default DescriptionInput