import React from 'react'
import images from '../../../assets/images'
import TrendingTagsItem from './TrendingTagsItem'

const tags = ["technology", "travel", "cars", "holiday", "swimming", "animies"];

const TrendingTags = () => {
    const rederedTrendingTagsItems = tags.map((tag, i)=>{
        return <TrendingTagsItem key={i} text={tag} href={`/blog?tag=${tag}`} />
    })

  return (
    <aside id='tags' className='d-block bg-white shadow-sm'>
        <div className='aside-title p-3 bg-primary position-relative'>
            <h3 className='fs-4 fw-bold text-white m-0'>Trending Tags</h3>
        </div>
        <ul className='navbar-nav py-4 px-3 flex-row flex-wrap justify-content-center gap-3'>
            {rederedTrendingTagsItems}
        </ul>
    </aside>
  )
}

export default TrendingTags