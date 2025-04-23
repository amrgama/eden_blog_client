import React from 'react'
import { data } from '../../../assets/data'
import MainTitle from '../../ui-kits/MainTitle'

const ThirdSection = () => {
  const renderedPosts = data.map((post, i) =>{
    return <div key={i} className="col-12 col-md-6 col-lg-4 px-0 px-md-3 py-3" style={{height: "fit-content"}}>
      <NormalCard key={i} postData={post} />
    </div>
  })

  return (
    <section className='py-5'>
        <div className="container">
            <MainTitle title={"Featured Blog Post"} extraClasses={"justify-content-center"} />
            <div className='d-flex flex-wrap'>
              {renderedPosts}
            </div>
        </div>
    </section>
  )
}

export default ThirdSection