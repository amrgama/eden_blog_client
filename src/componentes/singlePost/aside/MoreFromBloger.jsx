import React, { useEffect } from 'react'
import images from '../../../assets/images'
import VerySmallCard from '../../postCards/VerySmallCard'
import { data } from '../../../assets/data'
import { useDispatch, useSelector } from 'react-redux'
import { getMorePosts, selectPosts } from '../../../features/posts/postsSlice'
import { toast } from 'react-toastify'

const MoreFromBloger = ({bloggerId}) => {
    const dispatch= useDispatch();
    const {posts, isLoading, isSuccess, isError, message} = useSelector(selectPosts);

    useEffect(()=>{
      if(!isLoading && !isSuccess && !isError){
        const query= {
          skip: 0,
          limit: 4
        }
        dispatch(getMorePosts({userId: bloggerId, query}))
      }
      if(isError){
        toast.error(message);
      }
    }, [posts, isLoading, isSuccess, isError, message])

    const renderedPostCards= posts.map((post, i)=>{
      return <VerySmallCard key={i} postData={post} />
    })

  return (
    <div className="col-12 col-md col-lg-12 bg-white py-4">
        <h3 className='d-block fs-4 fw-bold text-start text-primary px-3 mb-3'>More From Bloger</h3>
        <div className="d-flex flex-column gap-3 px-3 py-2">
          {
            (!!posts.length)?
              <>{renderedPostCards}</>
            :
              <span className="d-block fs-5 text-muted text-start py-2">This blogger has no blogs</span>
          }
        </div>
    </div>
  )
}

export default MoreFromBloger