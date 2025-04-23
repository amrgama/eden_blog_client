import React from 'react'
// import images from '../../assets/images'
import {BsTwitter, BsReddit, BsQuora, BsYoutube, BsPerson} from 'react-icons/bs'
import {GrFacebookOption} from 'react-icons/gr'
import { Link } from 'react-router-dom'
import FollowingButton from '../author/userInfo/FollowingButton'
import FollowButton from '../author/userInfo/FollowButton'

const User = ({author, authUser}) => {
  return (
    <div className='user bg-white position-relative'>
        <span className='d-block' style={{width: "80px", height:"80px"}}></span>
        <div 
            className="p-2 bg-white rounded-circle border border-2 border-dark box-shadow-sm"
            style={{position: "absolute", left: "50%", transform: "translateX(-50%)", bottom: "calc(100% - 1.5rem)", zIndex: 1}}
        >
            {
                !author.vector &&
                <span className="d-flex" style={{width: "80px", height:"80px"}}>
                    <BsPerson className='display-4 m-auto' />
                </span>
            }

            {
                author.vector &&
                <img 
                    src={author?.vector} 
                    className='vector rounded-circle' alt="..."
                    style={{width: "80px", height:"80px"}} 
                />
            }
        </div>
        <div 
            className="px-4 py-5 d-flex flex-column flex-wrap align-items-center justify-content-center gap-3 bg-white position-relative"
        >
            <div className='d-flex flex-column align-items-center'>
                <span className="fw-bold fs-5 text-primary text-capitalize">{author?.firstName} {author?.lastName}</span>
                {
                    author?.userName &&
                    <span className="fs-8 text-secondary">
                        <span className="fw-bold text-primary">{author?.userName[0]}</span>
                        {author?.userName?.slice(1, author.userName.length)}
                    </span>
                }
            </div>
            {!!author?.bio && <span className="fs-6 text-dark">{author?.bio}</span>}
            {
                !!Object.keys(author?.socialLinks).length &&
                <div className="w-100 d-flex align-items-center justify-content-center gap-3">
                    {
                        author.socialLinks?.quora &&    
                        <Link to={`${author.socialLinks?.quora}`} className="p-2 d-flex align-items-center justify-content-center border border-3 border-dark" 
                        style={{width: "50px", height: "45px", background: "#63cdf1"}}>
                            <BsQuora className='fs-1 text-dark'/>
                        </Link>
                    }
                    {
                        author.socialLinks?.reddit &&    
                        <Link to={`${author.socialLinks?.reddit}`} className="p-2 d-flex align-items-center justify-content-center border border-3 border-dark" 
                        style={{width: "50px", height: "45px", background: "#63cdf1"}}>
                            <BsReddit className='fs-1 text-dark'/>
                        </Link>
                    }
                    {
                        author.socialLinks?.youtube &&    
                        <Link to={`${author.socialLinks?.youtube}`} className="p-2 d-flex align-items-center justify-content-center border border-3 border-dark" 
                        style={{width: "50px", height: "45px", background: "#63cdf1"}}>
                            <BsYoutube className='fs-1 text-dark'/>
                        </Link>
                    }
                    {
                        author.socialLinks?.facebook &&    
                        <Link to={`${author.socialLinks?.facebook}`} className="p-2 d-flex align-items-center justify-content-center border border-3 border-dark" 
                        style={{width: "50px", height: "45px", background: "#63cdf1"}}>
                            <GrFacebookOption className='fs-1 text-dark'/>
                        </Link>
                    }
                    {
                        author.socialLinks?.twitter &&
                        <Link to={`${author.socialLinks?.twitter}`} className="p-2 d-flex align-items-center justify-content-center border border-3 border-dark" 
                        style={{width: "50px", height: "45px", background: "#3563c2"}}>
                            <BsTwitter className='fs-1 text-dark'/>
                        </Link>
                    }
                </div>
            }
        </div>
        <div 
            className="w-100 d-flex align-items-center justify-content-center gap-3 position-absolute start-0 top-100 bg-dange"
            style={{height: "35px", transform: "translateY(-17px)"}}
        >
            {
                (authUser?.userName !== author.userName) &&
                <>
                    {
                        (author.followers.some(item => item._id === authUser.id)) ?
                            <FollowingButton
                                authorId={author._id}
                                className={"text-dark bg-white px-3 py-1 border-bottom border-dark shadow-very-sm"} 
                            />                                 
                        :
                            <FollowButton
                                authorId={author._id}
                                className={"text-dark bg-white px-3 py-1 border-bottom border-dark shadow-very-sm"} 
                            />
                    }
                </>
            }
        </div>
    </div>
  )
}

export default User