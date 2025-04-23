import React from 'react'
import Slider from './slider/Slider'
import SmallCard from '../../postCards/SmallCard'
// import images from '../../../assets/images'
import { data } from '../../../assets/data'
import MainTitle from '../../ui-kits/MainTitle'

const FirstSection = () => {
    const renderedSmallCards = data.map((post, i)=>{
        return  <SmallCard key={i} postData={post}/>;
    })
  return (
    <section className='py-5'>
        <div className="container">
            <MainTitle title={"handpicked posts"} extraClasses={"flex-column flex-sm-row justify-content-center"} />
            <div className="d-flex flex-wrap">
                <div className="col-12 col-lg-7 pe-lg-3 py-3">
                    <Slider />
                </div>
                <div className="col-12 col-lg-5 ps-lg-3 py-3 d-flex flex-wrap gap-4">
                    {renderedSmallCards}
                </div>
            </div>
        </div>
    </section>
  )
}

export default FirstSection