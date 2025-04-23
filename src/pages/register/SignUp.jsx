import React from 'react'
import { Link } from 'react-router-dom'
import BreadCrumb from '../../componentes/breadCrumb/BreadCrumb'
import SignUpForm from '../../componentes/register/SignUpForm'

const SignUp = () => {
  return (
    <div id='signUp'>
        <BreadCrumb title={"Sign Up"} />
        <main className='py-5'>
            <div className="container">
                <div className="d-flex justify-content-center">
                    <SignUpForm />
                </div>
            </div>
        </main>
    </div>
  )
}

export default SignUp