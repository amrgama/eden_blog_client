import React, { useState } from 'react'
import {BsQuora} from 'react-icons/bs'
import ActionButton from '../../../ui-kits/buttons/ActionButton';

const QuoraButton = ({value, bgColor, setActiveLink}) => {
  const [active, setActive] = useState(false);
  const handleClick = ()=>{
    setActive(!active)
    setActiveLink(prev => (prev === value)? prev: value)
  }
  
  return(
    <ActionButton
      type={"button"}
      icon={<BsQuora className='fs-3 text-dark'/>}
      cb={handleClick}
      extraClasses={"p-1"}
      defaultStyle={true}
      style={{width: "50px", height: "45px", background: bgColor}}
    />
  )
}

export default QuoraButton