import React from 'react'
import BlockButton from '../../userInfo/BlockButton'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { selectAuth } from '../../../../features/auth/authSlice';
import { BsPerson } from 'react-icons/bs';

const FollowerCard = ({follower}) => {
    const {username} = useParams();
    const {user}= useSelector(selectAuth);

    return (
        <div className={`d-flex align-items-center gap-2 px-3 py-2`}>
            {
                (!!!follower.vector)?
                    <span className="d-flex rounded-circle border border-dark" style={{width: "55px", height: "55px"}}>
                        <BsPerson className='fs-2 m-auto' />
                    </span>
                :
                    <img 
                        src={follower.vector} 
                        alt="follower image"
                        className='d-block rounded-circle border border-dark'
                        style={{width: "55px", height: "55px", objectFit: "contain", objectPosition: "center"}} 
                    />
            }
            <div className="col d-flex flex-wrap align-items-center gap-1 text-start">
                <div className="d-flex flex-column gap-1 me-auto">
                    <h5 className='fs-6 fw-500 m-0'>
                        <Link to={`/account/${follower.userName}`} className={"nav-link w-fit"}>{follower.firstName} {follower.lastName}</Link>
                    </h5>
                    <span className='text-muted fs-7 fw-500'>{follower.userName}</span>
                </div>
                {
                    user.userName === username &&
                    <BlockButton
                        className={"w-fit text-dark px-2 py-1 bg-white border border-dark shadow-very-sm"}
                    />
                }
            </div>
        </div>   
    )
}

export default FollowerCard