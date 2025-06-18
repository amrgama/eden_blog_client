import React from 'react'
import { Link } from 'react-router-dom'
import BreadCrumb from '../../componentes/breadCrumb/BreadCrumb'
import SignUpForm from '../../componentes/register/SignUpForm'

// Add at the top of your imports
import MetaTags from '../../componentes/ui-kits/MetaTags'

const SignUp = () => {
    return (
        <div id='signUp'>
            <MetaTags 
                title="Sign Up - Eden Blog"
                description="Create a new account on Eden Blog to start sharing your thoughts and connecting with others."
                keywords="sign up, register, create account, eden blog"
                ogImage="/blog.jpg"
                ogUrl={import.meta.env.VITE_SITE_URL + "/signUp"}
            />
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