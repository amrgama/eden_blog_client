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

const Slider = ({posts}) => {

  SwiperCore.use([Autoplay])

  const renderedSlides = posts?.map((post, index) => {
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
    </Swiper>
  )
}

export default Slider