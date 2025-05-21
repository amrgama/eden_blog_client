import React from 'react'
import Slider from './slider/Slider'

const Banner = ({posts}) => {
  return (
    <section className='banner py-5 overflow-hidden'>
        <div className="container">
            <Slider posts={posts} />
        </div>
    </section>
  )
}

export default Banner