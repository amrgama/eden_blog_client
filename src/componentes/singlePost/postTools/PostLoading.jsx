import React from 'react'
import Lottie from "lottie-react"
import postLoading from "../../../assets/animations/postLoading.json"
const PostLoading = () => {
  return (
    <div
        className='w-100 h-100 d-flex flex-wrap align-items-center justify-content-center position-absolute top-0 start-0 bg-light'
        style={{zIndex: 10000}}
    >
      <Lottie  animationData={postLoading} />
    </div>
  )
}

export default PostLoading