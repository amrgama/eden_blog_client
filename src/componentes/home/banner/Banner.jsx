import React from 'react'
import Slider from './slider/Slider'

const Banner = ({posts}) => {
  return (
    <section className='banner section-pt overflow-hidden' style={{minHeight: "100svh"}}>
        <div className="container">
            <Slider posts={posts} />
        </div>
    </section>
  )
}

export default Banner