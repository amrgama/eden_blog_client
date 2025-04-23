import React, { useRef, useState } from 'react';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
// import required modules
import { EffectCreative, Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import SwiperCore from "swiper"
// import images
import images from '../../../../assets/images';
import Slide from './Slide';
import {MdArrowBackIosNew} from "react-icons/md"
import { data } from '../../../../assets/data';

const Slider = () => {

  SwiperCore.use([Autoplay])
  
  const renderedSlides = data.map((post, index) => {
    return(
      <SwiperSlide key={index}>
        <Slide postData={post} />
      </SwiperSlide>
    )
  });

  return (
    <Swiper
    effect={'creative'}
    creativeEffect={{
      prev: {
        shadow: true,
        translate: [0, 0, -400],
      },
      next: {
        translate: ['100%', 0, 0],
      },
    }}
    grabCursor={true}
    loop={true}
    autoplay={{
      delay: 1500,
      disableOnInteraction: true,
      pauseOnMouseEnter: true,
    }}
    
    onMouseLeave={()=> SwiperCore.use([Autoplay])}
    // navigation
    // pagination={{ clickable: true }}
    // scrollbar={{ draggable: true }}
      modules={[EffectCreative, Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      className="mySwiper"

    >
        {
          renderedSlides
        } 
        <div className="navigate-buttons w-100 px-3 d-flex align-items-center justify-content-between position-absolute top-50 start-0">
          {/* <button className='next-ele d-block position-relative p-0'>
            <MdArrowBackIosNew className='under fw-bolder display-1 text-dark' />
            <MdArrowBackIosNew className='fw-bolder display-1' />
          </button>
          <button className='prev-ele d-block'></button> */}
        </div>   
    </Swiper>
  )
}

export default Slider