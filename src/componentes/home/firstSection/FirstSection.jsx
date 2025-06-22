import Slider from './slider/Slider'
import SmallCard from '../../postCards/SmallCard'
// import images from '../../../assets/images'
import { data } from '../../../assets/data'
import MainTitle from '../../ui-kits/MainTitle'

const FirstSection = ({posts}) => {

    const renderedSmallCards = posts?.map((post, i)=>{
        return  <SmallCard key={i} postData={post}/>;
    })
  return (
    <section className='section-pt'>
        <div className="container">
            <MainTitle title={"handpicked posts"} extraClasses={"flex-column flex-sm-row justify-content-center"} />
            <div className="d-flex flex-wrap">
                <div className="col-12 col-lg-7 pe-lg-3 py-3">
                    <Slider posts={posts} />
                </div>
                <div className="col-12 col-lg-5 ps-lg-3 py-3 d-flex align-content-start flex-wrap gap-4">
                    {renderedSmallCards}
                </div>
            </div>
        </div>
    </section>
  )
}

export default FirstSection