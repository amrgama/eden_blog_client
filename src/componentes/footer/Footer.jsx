import React from 'react'
import {BsTwitter, BsInstagram} from 'react-icons/bs'
import {FaFacebookF, FaQuora} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import images from '../../assets/images'
import VerySmallCard from '../postCards/VerySmallCard'
import SkeletonVerySmallCard from '../skeletonLoading/postCards/SkeletonVerySmallCard'
import { data } from '../../assets/data'
import useMediaQuery from '../../hooks/useMediaQuery'

const Footer = () => {
    const matches_max_768 = useMediaQuery("(max-width: 768px")
    const renderedPopulerCards= data.map((post, i)=>{
        return <VerySmallCard key={i} postData={post} />
    })

  return (
    <footer className='py-5'>
        <div className="container pt-4 d-flex justify-content-between flex-wrap gap-4 gap-lg-3 gap-xl-4">
            <div className="col-12 col-md-6 col-xl-4">
                <img src={images.logo} className='d-block mb-3'
                style={{maxWidth: "130px"}} alt="..." />
                <p className='text-start text-secondary m-0' style={{maxWidth: matches_max_768? "100%" : "400px"}}>
                    Thrive celebrates both the journey and the destination. We’re motivated like most who seek more out of life: to leap out of bed (or stumble), embrace risk, and chase after life worth living.
                </p>
            </div>
            <div className="col col-sm" style={{minWidth: "150px"}}>
                <span className='d-block fs-5 fw-bold text-capitalize text-start text-dark mb-3'>\ categories</span>
                <div className="d-flex flex-column align-items-start gap-2">
                    <Link to={"/"} className="text-secondar text-dark"><span className='fw-bold text-primary'>\</span> spaces</Link>
                    <Link to={"/"} className="text-secondar text-dark"><span className='fw-bold text-primary'>\</span> electric</Link>
                    <Link to={"/"} className="text-secondar text-dark"><span className='fw-bold text-primary'>\</span> travle</Link>
                    <Link to={"/"} className="text-secondar text-dark"><span className='fw-bold text-primary'>\</span> holiday</Link>
                </div>
            </div>
            <div className="col col-sm" style={{minWidth: "150px"}}>
                <span className='d-block fs-5 fw-bold text-capitalize text-start text-dark mb-3'># tags cloud</span>
                <div className="d-flex flex-column align-items-start gap-2">
                    <Link to={"/"} className="text-secondar text-dark"><span className='fw-bold text-primary'>#</span> spaces</Link>
                    <Link to={"/"} className="text-secondar text-dark"><span className='fw-bold text-primary'>#</span> electric</Link>
                    <Link to={"/"} className="text-secondar text-dark"><span className='fw-bold text-primary'>#</span> travle</Link>
                    <Link to={"/"} className="text-secondar text-dark"><span className='fw-bold text-primary'>#</span> holiday</Link>
                </div>
            </div>
            <div className="col-12 col-sm" style={{minWidth: "300px"}}>
                <span className='d-block fs-5 fw-bold text-capitalize text-start text-dark mb-3'>popular post</span>
                <div className="d-flex flex-column gap-3">
                    {renderedPopulerCards}
                </div>
            </div>
            <div className="social-box col-12 d-flex align-items-center justify-content-center gap-3 mt-3">
                <Link to="/" className="d-flex align-items-center justify-content-center border border-2 border-white box-shadow-sm" 
                style={{width: "80px", height: "80px", background: "#63cdf1"}}>
                    <BsTwitter className='fs-1 text-white'/>
                </Link>
                <Link to="/" className="d-flex align-items-center justify-content-center border border-2 border-white box-shadow-sm" 
                style={{width: "80px", height: "80px", background: "#3563c2"}}>
                    <FaFacebookF className='fs-1 text-white' style={{color: "#3563c2"}}/>
                </Link>
                <Link to="/" className="d-flex align-items-center justify-content-center border border-2 border-white box-shadow-sm" 
                style={{width: "80px", height: "80px", background: "#E4405F"}}>
                    <BsInstagram className='fs-1 text-white' style={{color: "#E4405F"}}/>
                </Link>
                <Link to="/" className="d-flex align-items-center justify-content-center border border-2 border-white box-shadow-sm" 
                style={{width: "80px", height: "80px", background: "#A82400"}}>
                    <FaQuora className='fs-1 text-white' style={{color: "#A82400"}}/>
                </Link>
            </div>
        </div>
    </footer>
  )
}

export default Footer