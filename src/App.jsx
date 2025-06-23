import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import DinamicPage from './pages/DinamicPage'
import LatestNew from './pages/LatestNew'
import SinglePost from './pages/SinglePost'
import SignUp from './pages/register/SignUp'
import LogIn from './pages/auth/logIn/LogIn'
import {ToastContainer} from "react-toastify"
import Write from './pages/write/Write'
import Layout from './componentes/Layout'
import RequiredAuth from './componentes/RequiredAuth'
import Account from './pages/account/Account'
import Trending from './pages/Trending'
import JoinToUsModal from './componentes/modal/JoinToUsModal'
import { Suspense } from 'react'
import PageLoading from './componentes/ui-kits/PageLoading'
import { postsLoader } from './utils/helper'

function App() {

  return (
    <div className=''>
          <Suspense fallback={<PageLoading />}>
            <Routes>
              <Route path='/' element={<Layout />} loader={()=> postsLoader()}>
                  <Route path='signup' element={<SignUp />}></Route>
                  <Route path='login' element={<LogIn />}></Route>
                  <Route index element={<Home />}></Route>
                  <Route path='latest-new' element={<LatestNew />}>
                    {/* <Route path=':id' element={<SinglePost />}></Route> */}
                  </Route>
                  <Route path='trending' element={<Trending />}>
                    {/* <Route path=':id' element={<SinglePost />}></Route> */}
                  </Route>
                  <Route path='posts'>
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
          </Suspense>
      <ToastContainer />
    </div>
  )
}

export default App

