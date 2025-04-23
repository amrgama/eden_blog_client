import React, { useEffect } from 'react'
import UserInfo from '../../componentes/account/userInfo/UserInfo'
import UserPosts from '../../componentes/account/userPosts/UserPosts'
// import Aside from '../../componentes/account/aside'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAccount, getMyAccount, selectAccount } from '../../features/account/accountSlice'
import SkeletonUserInfo from '../../componentes/skeletonLoading/skeletonUserInfo/SkeletonUserInfo'
import { selectAuth } from '../../features/auth/authSlice'
import { toast } from 'react-toastify'
import Followers from '../../componentes/account/aside/followers'
import Following from '../../componentes/account/aside/following'
import SkeletonAsideList from "../../componentes/account/aside/aside-list/SkeletonAsideList"
import SkeletonUserPosts from '../../componentes/account/userPosts/SkeletonUserPosts'

const Account = () => {
  const {username} = useParams();
  const {user: account, isLoading, isSuccess, isError, message, meta} = useSelector(selectAccount)
  const {user} = useSelector(selectAuth);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(user.userName === username){
      dispatch(getMyAccount(username))
    }
    else{
      dispatch(getAccount(username))
    }
  }, [username])

  useEffect(()=>{
    if(meta?.action === "get-account" || meta?.action === "get-my-account"){

      if(isSuccess){
        console.log("account: ", account)
      }
      if(isError){
        toast.error(message)
      }
    }
  }, [isLoading, isSuccess, isError, message])

  // console.log("account rendered")
  return (
    <div id='account' style={{minHeight: "87vh"}}>
      <div className="container py-4">
        <div className="row m-0 m-lg-1" style={{minHeight: "79vh"}}>
          <div className="col-12 col-lg">
            {
              (isLoading && !!!Object.keys(account).length) && <SkeletonUserInfo />
            }
            {
              !!Object.keys(account).length &&
              <UserInfo account={account} authUser={user} />
            }
            {
              (isLoading && !!!Object.keys(account).length) &&
              <SkeletonUserPosts />
            }
            {
              !!Object.keys(account).length &&
              <UserPosts userId={account._id} posts={account.posts} />
            }
          </div>
          <aside className='d-none d-lg-flex flex-column gap-4' style={{width: "385px"}}>
            <div style={{marginTop: "56px"}}></div>
            {
              (isLoading && !!!Object.keys(account).length) &&
              <>
                <SkeletonAsideList title={"Followers"}/>
                <SkeletonAsideList title={"following"} />
              </>
            }
            {
              !!Object.keys(account).length &&
              <>
                <Followers followers={account.followers} />
                <Following following={account.following} />
              </>
            }
          </aside>
        </div>
      </div>
    </div>
  )
}

export default Account