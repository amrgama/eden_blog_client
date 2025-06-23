import MainTitle from '../../ui-kits/MainTitle'
import NormalCard from '../../postCards/NormalCard'
const ThirdSection = ({posts}) => {
 const renderedPosts = posts?.map((post, i) =>{

    return <div key={i} className="col-12 col-md-6 col-lg-4 px-0 px-md-3 py-3" style={{height: "fit-content"}}>
      <NormalCard key={i} postData={post} />
    </div>
  })

  return (
    <section className='section-pt'>
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