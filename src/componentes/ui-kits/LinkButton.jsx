import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom';

const LinkButton = ({text, icon, link, color, isActive, extraClasses, style}) => {
  const location= useLocation();
  const url = location.pathname + location.search;
  const className = `main-button nav-link d-flex flex-wrap align-items-center justify-content-center border border-dark shadow-very-sm position-relative ${(url.endsWith(link) || isActive)? "active": ""} ${extraClasses ?? ""}`
  
  console.log("url", url, url.endsWith(link));
    // function handleOnClick(){
    //   setActive(prev => !prev);
    // }

  return(
    <Link
      // onClick={handleOnClick}
      to={link}
      className={className}
      style={style}
    >
      <span
        className={`w-100 h-100 d-flex flex-wrap align-items-center justify-content-center gap-1`}
      >
        { icon && icon }
        {text && text}
      </span>
    </Link>
  )
}

export default LinkButton