import React from 'react'
import BreadCrumb from '../../../componentes/breadCrumb/BreadCrumb'
import { Link } from 'react-router-dom'
import LogInForm from '../../../componentes/auth/LogInForm'

const LogIn = () => {
  return (
    <div id='logIn'>
        <BreadCrumb title={"Log In"} />
        <main className='py-5'>
            <div className="container">
                <div className="d-flex justify-content-center">
                   <LogInForm />
                </div>
            </div>
        </main>
    </div>
  )
}

export default LogIn