import React from 'react'
import images from '../../assets/images'
import Navbar from './Navbar'
import useMediaQuery from '../../hooks/useMediaQuery'

const Header = () => {
  const matches_max_lg = useMediaQuery("(max-width: 992px)")

  return (
    <header 
    className='d-flex align-items-center position-relative' 
    style={{minHeight: matches_max_lg? "80px": "92px", zIndex: "1000"}}> 
      <Navbar />
    </header> 
  )
}

export default Header