import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import images from '../../assets/images'

import User from './User'
import { useSelector } from 'react-redux'
import { selectAuth } from '../../features/auth/authSlice'
import { navbarTabsConfig } from '../../utils/config'
import Dropdown from '../ui-kits/Dropdown'
import useMediaQuery from '../../hooks/useMediaQuery'
import Menu from './Menu'
import LinkButton from '../ui-kits/LinkButton'
import ActionButton from '../ui-kits/buttons/ActionButton'
const Navbar = () => {
  const {user} = useSelector(selectAuth)
  const {pathname} = useLocation();
  const matches_lg= useMediaQuery("(min-width: 992px)")

  const renderedNavbarTabs = navbarTabsConfig.map((item, i)=> {
    if(item.protected && !!Object.keys(user).length){

      return(
        <li key={i} className="nav-item">
          <Link
            to={item.link}
            className={`nav-link h-100 strike px-3 lh-lg text-capitalize text-center position-relative ${(pathname === item.link)? "active": ""}`} 
          >
            {item.label}
          </Link>
        </li>
      )  
    }

    if(!item.protected){

      return(
        <li key={i} className="nav-item">
          <Link
            to={item.link}
            className={`nav-link h-100 px-3 strike lh-lg text-capitalize text-center position-relative ${(pathname === item.link)? "active": ""}`} 
          >
            {item.label}
          </Link>
        </li>
      )
    }
  })

  return (
    <nav className="navbar w-100 navbar-expand-lg p-0">
      <div className="container">
        <div className="d-flex align-items-center w-100 position-relative">
          <Link className="navbar-brand" to="#">
            <img src={images.logo} alt="..." />
          </Link>
          {
            matches_lg &&
            <div className="d-none d-lg-block collapse navbar-collapse order-4 order-lg-2" id="navbarNav" style={{height: "40px"}}>
              <ul className="navbar-nav h-100 mt-3 mt-lg-0 mx-auto">
                {renderedNavbarTabs}
              </ul>
            </div>
          }
          {
            !matches_lg &&
            <Menu>
              <ul className="w-100 bg-white navbar-nav flex-column">
                {renderedNavbarTabs}
              </ul>
            </Menu>
          }
          <div className="auth d-flex flex-wrap ms-auto gap-3 me-2 me-lg-0 order-lg-3" style={{height: "40px"}}>
              {  !!!Object.keys(user).length &&
                <>
                  <LinkButton link={"/login"} text={"Log In"} extraClasses={"strike text-center px-3 border border-2 rounded-pill shadow-none"} />
                  
                  <LinkButton 
                    link={"/signup"} 
                    text={"Sign Up"} 
                    color={"white"}
                    extraClasses={"d-none d-md-flex strike text-white text-center text-white bg-primary px-3 border border-2 rounded-pill shadow-none"} 
                  />
                </>
              }  
            {!!Object.keys(user).length && <User user={user} />}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar