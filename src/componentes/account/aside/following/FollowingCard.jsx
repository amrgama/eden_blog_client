import React, { useEffect, useState } from 'react'
import UnfollowButton from '../../userInfo/UnfollowButton'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { selectAuth } from '../../../../features/auth/authSlice';
import { BsPerson } from 'react-icons/bs';
import { selectAccount } from '../../../../features/account/accountSlice';
import FollowButton from '../../userInfo/FollowButton';

const FollowingCard = ({user}) => {
    const {username} = useParams();
    const {user: authUser}= useSelector(selectAuth);
    const {user: account, meta}= useSelector(selectAccount);
    const [showFollowButton, setShowFollowButton]= useState(false);
    const [showUnfollowButton, setShowUnfollowButton]= useState(true);
    // const [isSuccess, setIsSuccess]= useState(false);

    // useEffect(()=>{
    //     console.log("isSuccess", isSuccess, "meta.action", meta.action)
    //     if(isSuccess && meta.action === "unfollow"){
    //         setShowFollowButton(true);
    //     }
    // }, [account, isSuccess])
    function handleOnFollow(){
        setShowUnfollowButton(true);
        setShowFollowButton(false);
    }
    function handleOnUnfollow(){
        setShowUnfollowButton(false);
        setShowFollowButton(true);
    }

    return (
        <div className={`d-flex align-items-center gap-2 px-3 py-2`}>
            {
                (!!!user.vector)?
                    <span className="d-flex rounded-circle border border-dark" style={{width: "55px", height: "55px"}}>
                        <BsPerson className='fs-2 m-auto' />
                    </span>
                :
                    <img 
                        src={user.vector} 
                        alt="follower image"
                        className='d-block rounded-circle border border-dark'
                        style={{width: "55px", height: "55px", objectFit: "contain", objectPosition: "center"}} 
                    />
            }
            <div className="col d-flex flex-wrap align-items-center gap-1 text-start">
                <div className="d-flex flex-column gap-1 me-auto">
                    <h5 className='fs-6 fw-500 m-0'>
                        <Link to={`/account/${user.userName}`} className={"nav-link w-fit"}>{user.firstName} {user.lastName}</Link>
                    </h5>
                    <span className='text-muted fs-7 fw-500'>{user.userName}</span>
                </div>
                {
                    ((authUser?.userName === username) && showUnfollowButton && !showFollowButton)?
                        <UnfollowButton
                            onUnfollow={handleOnUnfollow}
                            accountId={user._id}
                            className={"w-fit text-dark bg-white px-2 py-1 border border-dark shadow-very-sm"}
                        />
                    :
                        <FollowButton
                            onFollow={handleOnFollow}
                            accountId={user._id}
                            className={"w-fit text-dark bg-white px-2 py-1 border border-dark shadow-very-sm"}
                        />
                }
            </div>
        </div>   
    )
}

export default FollowingCard