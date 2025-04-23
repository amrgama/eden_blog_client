import Lottie from 'lottie-react'
import React from 'react'
import postLoading from "../../assets/animations/postLoading.json"

function PageLoading() {
  return (
    <div className='vw-100 vh-100 position-fixed top-0 start-0'  style={{zIndex: 10000}}>
      <div className="container h-100 d-flex align-items-center justify-content-center">
        <Lottie animationData={postLoading} loop={true} style={{maxWidth: "600px",maxHeight: "600px"}} />
      </div>
    </div>
  )
}

export default PageLoading