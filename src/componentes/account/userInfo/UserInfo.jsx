import React, { useEffect, useState } from 'react'
import {BsTwitter, BsPerson, BsQuora, BsReddit, BsYoutube} from 'react-icons/bs'
import {GrFacebookOption} from 'react-icons/gr'
import { Link } from 'react-router-dom'
import UserSetting from './UserSetting'
import { isObjEmpty } from '../../../utils/helper'
import FollowButton from './FollowButton'
import WriteButton from './WriteButton'
import FollowingButton from './FollowingButton'

const UserInfo = ({account, authUser}) => {
    // const {username} = useParams();
    // const {user: account, isLoading, isSuccess, isError, message} = useSelector(selectAccount)
    // const selectedAuthUser = useSelector(selectAuth)?.user;
    // const [authUser, setAuthUser] = useState(JSON.parse(window.localStorage.getItem("user")) || selectedAuthUser);
    // const dispatch = useDispatch();
    // const [following, setFollowing]= useState([]);
    // const [followers, setFollowers]= useState([]);
    // const [blockList, setBlockList]= useState([]);


    // useEffect(()=>{
    //     if(authUser.id === user._id){
    //         setFollowing([...authUser.following]);
    //         setFollowers([...authUser.followers]);
    //         setBlockList([...authUser.blockList]);
    //     }

    //     if(authUser.id !== user._id){
    //         setFollowing([...account.following]);
    //         setFollowers([...account.followers]);
    //         setBlockList([...account.blockList]);
    //     }
    // }, [])
    // useEffect(()=>{
    //     if(!isLoading && !isSuccess && !isError && !message){
    //         if(authUser && authUser?.userName === username){
    //             console.log("authUser", authUser)
    //             dispatch(getMyAccountInfo())
    //         }
    //         else{
    //             console.log("account", account)
    //             dispatch(getAccountInfo(username))
    //         }
    //     }
    //     if(isError){
    //         toast.error(message)
    //     }
    // }, [isLoading, isSuccess, isError, message])
    
    // if(isLoading || (!isLoading && !isSuccess && !isError)) return 
    console.log("in userInfo: account", account);
    // console.log("*".repeat(10), "authUser.id", authUser.id, authUser, "account.followers", account.followers)
    // console.log("#".repeat(15))
    return (
        <section className='user-info'>
            <div className="container p-0 px-lg-2" style={{maxWidth: "800px"}}>
                <span className='d-block' style={{width: "80px", height:"80px"}}></span>
                <div className='position-relative'>
                    <div 
                        className="p-2 bg-white rounded-circle border border-2 border-dark box-shadow-sm"
                        style={{position: "absolute", left: "50%", transform: "translateX(-50%)", bottom: "calc(100% - 1.5rem)", zIndex: 1}}
                    >
                        {
                            !account.vector &&
                            <span className="d-flex" style={{width: "80px", height:"80px"}}>
                                <BsPerson className='display-4 m-auto' />
                            </span>
                        }

                        {
                            account.vector &&
                            <img 
                                src={account?.vector} 
                                className='vector rounded-circle' alt="..."
                                style={{width: "80px", height:"80px"}} 
                            />
                        }
                    </div>
                    <div 
                        className="px-4 py-5 d-flex flex-column flex-wrap align-items-center justify-content-center gap-3 bg-white position-relative"
                    >
                        <div className='d-flex flex-column align-items-center'>
                            <span className="fw-bold fs-5 text-primary text-capitalize">{account?.firstName} {account?.lastName}</span>
                            {
                                account?.userName &&
                                <span className="fs-8 text-secondary">
                                    <span className="fw-bold text-primary">{account?.userName[0]}</span>
                                    {account?.userName?.slice(1, account.userName.length)}
                                </span>
                            }
                        </div>
                        <div className="d-flex align-items-center gap-3">
                            <div className="fw-500 text-muted"><span className="text-dark">{account?.followers_count}</span> followers</div>
                            <div className="fw-500 text-muted"><span className="text-dark">{account?.following_count}</span> following</div>
                            <div className="fw-500 text-muted"><span className="text-dark">{account?.posts_count}</span> blogs</div>
                        </div>
                        {!!account?.bio && <span className="fs-6 text-dark">{account?.bio}</span>}
                        {
                            !!Object.keys(account?.socialLinks).length &&
                            <div className="w-100 d-flex align-items-center justify-content-center gap-3">
                                {
                                    account.socialLinks?.quora &&    
                                    <Link to={`${account.socialLinks?.quora}`} className="p-2 d-flex align-items-center justify-content-center border border-3 border-dark" 
                                    style={{width: "50px", height: "45px", background: "#63cdf1"}}>
                                        <BsQuora className='fs-1 text-dark'/>
                                    </Link>
                                }
                                {
                                    account.socialLinks?.reddit &&    
                                    <Link to={`${account.socialLinks?.reddit}`} className="p-2 d-flex align-items-center justify-content-center border border-3 border-dark" 
                                    style={{width: "50px", height: "45px", background: "#63cdf1"}}>
                                        <BsReddit className='fs-1 text-dark'/>
                                    </Link>
                                }
                                {
                                    account.socialLinks?.youtube &&    
                                    <Link to={`${account.socialLinks?.youtube}`} className="p-2 d-flex align-items-center justify-content-center border border-3 border-dark" 
                                    style={{width: "50px", height: "45px", background: "#63cdf1"}}>
                                        <BsYoutube className='fs-1 text-dark'/>
                                    </Link>
                                }
                                {
                                    account.socialLinks?.facebook &&    
                                    <Link to={`${account.socialLinks?.facebook}`} className="p-2 d-flex align-items-center justify-content-center border border-3 border-dark" 
                                    style={{width: "50px", height: "45px", background: "#63cdf1"}}>
                                        <GrFacebookOption className='fs-1 text-dark'/>
                                    </Link>
                                }
                                {
                                    account.socialLinks?.twitter &&
                                    <Link to={`${account.socialLinks?.twitter}`} className="p-2 d-flex align-items-center justify-content-center border border-3 border-dark" 
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
                            (authUser?.userName !== account.userName) &&
                            <>
                                {
                                    (account.followers.some(item => item._id === authUser.id)) ?
                                        <FollowingButton
                                            accountId={account._id}
                                            className={"text-dark bg-white px-3 py-1 border-bottom border-dark shadow-very-sm"} 
                                        />                                 
                                    :
                                        <FollowButton
                                            accountId={account._id}
                                            className={"text-dark bg-white px-3 py-1 border-bottom border-dark shadow-very-sm"} 
                                        />
                                }
                            </>
                        }
                        {
                            !isObjEmpty(authUser) && account._id === authUser.id &&
                            <>
                                <WriteButton />
                                <UserSetting />
                            </>
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default UserInfo