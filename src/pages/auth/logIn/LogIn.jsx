import React from 'react'
import BreadCrumb from '../../../componentes/breadCrumb/BreadCrumb'
import { Link } from 'react-router-dom'
import LogInForm from '../../../componentes/auth/LogInForm'

// Add at the top of your imports
import MetaTags from '../../../componentes/ui-kits/MetaTags'

const LogIn = () => {
    return (
        <div id='logIn'>
            <MetaTags 
                title="Log In - Eden Blog"
                description="Log in to your Eden Blog account to access personalized content and features."
                keywords="login, sign in, account access, eden blog"
                ogImage="/blog.jpg"
                ogUrl={import.meta.env.VITE_SITE_URL + "/log-in"}
            />
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