import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAuth } from '../../../features/auth/authSlice';
import UnAuthCommentForm from './UnAuthCommentForm';
import AuthCommentForm from './AuthCommentForm';


const CreateComment = () => {
    const {user} = useSelector(selectAuth);
    console.log("user in createComment", user);
    
  return (
    <div id='createComment' className='text-start py-4'>
        <span className='fs-5 fw-bold text-dark mb-4'>Leave Comment</span>
        {   user &&
            <AuthCommentForm user={{...user}} />
        }
        {   !user &&
            <UnAuthCommentForm user={{...user}} />
        }
    </div>
  )
}

export default CreateComment