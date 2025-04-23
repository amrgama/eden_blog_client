import React from 'react'
import UserCard from './UserCard'
import MoreFromBloger from './MoreFromBloger'
import PopularPosts from './PopularPosts'

const Aside = () => {
  return (
    <div className='position-sticky d-flex flex-column gap-5'
    style={{height: "fit-content", top: "1.5rem"}}>
        <UserCard />
        <MoreFromBloger />
        <PopularPosts />
    </div>
  )
}

export default Aside