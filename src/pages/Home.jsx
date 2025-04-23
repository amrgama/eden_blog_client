import React, { useEffect, useState } from 'react'
import FirstSection from '../componentes/home/firstSection/FirstSection'
import Banner from '../componentes/home/banner/Banner'
import SecondSection from '../componentes/home/secondSection/SecondSection'
import ThirdSection from '../componentes/home/thirdSection/ThirdSection'
import { motion, AnimatePresence } from 'framer-motion'
const Home = () => {
  // const [pageLoading, setPageLoading]= useState(true);
  // window.addEventListener("load", e=> setPageLoading(false))
  // useEffect(()=>{
  //   console.log("pageLoading", pageLoading)
  // }, [pageLoading])
  // if(pageLoading) return <h1>loading</h1>
  return (
    <div id='home position-relative'>
      <Banner />
      <FirstSection />
      <SecondSection />
      {/* <ThirdSection /> */}
      {/* <AnimatePresence mode="await" initial="false">
        <motion.div
         initial={{scaleY: 1, transformOrigin: "bottom"}}
         animate={{scaleY: 0, transformOrigin: "bottom", transitionTimingFunction: "ease-in"}}
         exit={{scaleY: 1, transformOrigin: "bottom"}}
         transition={{duration: 0.3, delay: 0.1}}
          className="overlay w-100 h-100 bg-light position-absolute top-0 start-0"
          style={{zIndex: 1000000}}
        >    
        </motion.div>
      </AnimatePresence> */}
    </div>
  )
}

export default Home