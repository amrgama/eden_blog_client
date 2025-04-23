import React from 'react'
// import images from '../../../assets/images'
import BigCard from '../../postCards/BigCard'
// import NormalCard from '../../postCards/NormalCard'
import { data } from '../../../assets/data'
import useMediaQuery from '../../../hooks/useMediaQuery'
import MainTitle from '../../ui-kits/MainTitle'

const orderes = [1, 2, 4, 5]

const SecondSection = () => {
  const matches = useMediaQuery("(min-width: 576px)");
  const style= matches? {height: "330px"} : undefined;

  const renderedPosts = data.map((post, i) =>{    
    if((orderes[i] % 2) > 0){
      return ( 
        <div key={i} className="col-12 col-lg-7 px-0 px-lg-3 py-3" style={{height: "fit-content"}}>
          <BigCard postData={post} style={style} />
        </div>
      )
    }
    else{
      return (
        <div key={i} className="col-12 col-lg-5 px-0 px-lg-3 py-3" style={{height: "fit-content"}}>
          <BigCard postData={post} type={"vertical"}/>
        </div>
      )
    }
  })

  return (
    <section className='py-5'>
        <div className="container">
            <MainTitle title={"trending articles"} extraClasses={"flex-column flex-sm-row"} />
            <div className='d-flex flex-wrap'>
              {renderedPosts}
            </div>
        </div>
    </section>
  )
}

export default SecondSection