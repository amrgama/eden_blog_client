import React, { useEffect } from 'react'
import Followers from './followers'
import Following from './following'
import { useSelector } from 'react-redux'
import { selectAccount } from '../../../features/account/accountSlice'
import { toast } from 'react-toastify'

const Aside = () => {
  const {user: account, isLoading, isSuccess, isError, message, meta}= useSelector(selectAccount);

  useEffect(()=>{
    if(isError && message){
      toast.error(message);
    }
  }, [account, isLoading, isSuccess, isError, message])

  return (
    <aside className='w-fit d-none d-lg-flex flex-column gap-4' style={{minWidth: "340px"}}>
      {/* {
        (isLoading && !account.followers)?
          "Loading"
        :
          <Followers followers={account.followers} />
      }
      {
        (isLoading && !account.following)?
          "Loading"
        :
          <Following following={account.following} />
      } */}
    </aside>
  )
}

export default Aside