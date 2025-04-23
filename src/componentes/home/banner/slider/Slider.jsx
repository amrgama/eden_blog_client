import React, { useRef, useState } from 'react';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
// import required modules
import { EffectCards, Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
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
      effect={'cards'}
      grabCursor={true}
      loop={true}
      autoplay={{
        delay: 1500,
        disableOnInteraction: true,
        pauseOnMouseEnter: true,
        reverseDirection: true
      }}
      
      onMouseLeave={()=> SwiperCore.use([Autoplay])}
      // navigation
      // pagination={{ clickable: true }}
      // scrollbar={{ draggable: true }}
      modules={[EffectCards, Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      className="mySwiper"
      style={{width: "clamp(340px, 80%, 1000px)"}}

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