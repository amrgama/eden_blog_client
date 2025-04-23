import React, { useState } from 'react'
import ActionButton from '../../../ui-kits/buttons/ActionButton';
import { BsReddit } from 'react-icons/bs';

const RedditButton = ({value, bgColor, setActiveLink}) => {
  const [active, setActive] = useState(false);
  const handleClick = ()=>{
    setActive(!active)
    setActiveLink(prev => (prev === value)? prev: value)
  }
  
  return(
    <ActionButton 
      type='button'
      cb={handleClick}
      icon={<BsReddit className='fs-3 text-dark'/>}
      extraClasses={"p-1"}
      style={{width: "50px", height: "45px", background: bgColor ?? "white"}}
      defaultStyle={true}
    />
  )
}

export default RedditButton