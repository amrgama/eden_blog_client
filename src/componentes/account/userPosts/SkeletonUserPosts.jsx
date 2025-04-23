import React from 'react'
import SkeletonBigCard from '../../skeletonLoading/postCards/SkeletonBigCard'

const SkeletonUserPosts = () => {
 
  return (
    <section className="user-posts py-5">
        <div className="container" style={{maxWidth: "800px"}}>
            <SkeletonBigCard />
            <SkeletonBigCard />
        </div>
    </section>
  )
}

export default SkeletonUserPosts