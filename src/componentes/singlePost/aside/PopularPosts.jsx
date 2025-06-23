import React from 'react'
import images from '../../../assets/images'
import VerySmallCard from '../../postCards/VerySmallCard'
import { usePosts } from '../../../context/Posts'

const PopularPosts = () => {
    const {posts}= usePosts();
    const renderedPopularCards= posts?.slice(0, 5)?.map((post, i)=>{
        return <VerySmallCard key={i} postData={post} whiteText={true} />
    })

  return (
    <div className="col-12 col-md col-lg-12 bg-dark py-4">
      <h3 className='d-block fs-4 fw-bold text-start text-primary px-3 mb-3'>Popular Posts</h3>
      <div className="d-flex flex-column gap-3 px-3 py-2">
          {renderedPopularCards}
      </div>
    </div>
  )
}

export default PopularPosts