import React from 'react'
import ControlledFormInput from '../../../form/ControlledFormInput';

const BioInput = ({bioRef, defaultVal}) => {
    function handleOnChange(e){
        bioRef.current= e.currentTarget.value;
    }
  return (
    <ControlledFormInput
        id={"bio"}
        name={"bio"}
        type={"text"}
        placeholder={"bio"}
        onChange={handleOnChange}
        value={bioRef.current}
        extraClasses={"py-2"}
    />
  )
}

export default BioInput