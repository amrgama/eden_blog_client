import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './header/Header'
import Footer from './footer/Footer'
// import Loading from './Loading'
import PageLoading from './ui-kits/PageLoading'


const Layout = () => {
  // console.log("userin local", JSON.parse(window.localStorage.getItem("user")))
  // const user = JSON.parse(window.localStorage.getItem("user"));
  // const isGuest = (!user)? true: false;
  
  // if(isGuest){
   
  //   const hasGuestBefore = JSON.parse(window.localStorage.getItem("guest"))
  //   if(!hasGuestBefore){
  //     const guestId = generate_uuid();
  //     window.localStorage.setItem("guest", JSON.stringify({"id": guestId}))
  //   }
  // }
  // else{
  //   window.localStorage.removeItem("guest")
  // }
  const [pageLoading, setPageLoading]= useState(true);
  
  window.addEventListener("load", e=> setPageLoading(false))
  return (
    <>
        {
          pageLoading &&
          <PageLoading />
        }
        {
          !pageLoading &&
          <>
            <Header />
            <Outlet />
            <Footer />
          </>
        }
    </>
  )
}

export default Layout