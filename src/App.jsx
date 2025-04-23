import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import DinamicPage from './pages/DinamicPage'
import LatestNews from './pages/LatestNews'
import SinglePost from './pages/SinglePost'
import SignUp from './pages/register/SignUp'
import LogIn from './pages/auth/logIn/LogIn'
import {ToastContainer} from "react-toastify"
import Write from './pages/write/Write'
import Layout from './componentes/Layout'
import RequiredAuth from './componentes/RequiredAuth'
import Account from './pages/account/Account'
import Trending from './pages/Trending'


function App() {

  return (
    <div className=''>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='signup' element={<SignUp />}></Route>
          <Route path='login' element={<LogIn />}></Route>
          <Route index element={<Home />}></Route>
          <Route path='latest-new' element={<LatestNews />}></Route>
          <Route path='trending' element={<Trending />}></Route>
          <Route path='blog'>
            <Route index element={<DinamicPage />}></Route>
            <Route path=':id' element={<SinglePost />}></Route>
          </Route>
          {/* protected routes */}
          <Route element={<RequiredAuth />}>
            <Route path="account/:username" element={<Account />}></Route>
            <Route path='/write' element={<Write />}></Route>
            <Route path=':id/edit' element={<Write />}></Route>
          </Route>
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App

