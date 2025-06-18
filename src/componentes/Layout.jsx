import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './header/Header'
import Footer from './footer/Footer'
import PageLoading from './ui-kits/PageLoading'
import { PostsContextProvider } from '../context/Posts'

const Layout = () => {
  return (
    <PostsContextProvider>
      <Header />
      <Outlet />
      <Footer />
    </PostsContextProvider>
  )
}

export default Layout