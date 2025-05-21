import React, { useEffect, useState } from 'react'
import FirstSection from '../componentes/home/firstSection/FirstSection'
import Banner from '../componentes/home/banner/Banner'
import SecondSection from '../componentes/home/secondSection/SecondSection'
import ThirdSection from '../componentes/home/thirdSection/ThirdSection'
import { motion, AnimatePresence } from 'framer-motion'
import { data } from '../assets/data'
const Home = () => {
  const posts= JSON.parse(window.localStorage.getItem("posts")) ?? [];
  console.log("posts>>", posts);
  // if(!!!JSON.parse(window.localStorage.getItem("posts"))?.length){
  //   window.localStorage.setItem("posts", JSON.stringify(data));
  // }
  // const [pageLoading, setPageLoading]= useState(true);
  // window.addEventListener("load", e=> setPageLoading(false))
  // useEffect(()=>{
  //   console.log("pageLoading", pageLoading)
  // }, [pageLoading])
  // if(pageLoading) return <h1>loading</h1>
  return (
    <div id='home position-relative'>
      <Banner posts={posts}/>
      <FirstSection posts={posts?.filter(post=> post?.isHandPicked)}/>
      <SecondSection posts={posts}/>
      <ThirdSection posts={posts?.filter(post=> post?.isFeatured)}/>
    </div>
  )
}

export default Home