import React from 'react'
import images from '../../../assets/images'
import CategoriesItem from './CategoriesItem'
import { data } from '../../../assets/data'

const Categories = () => {
    const rederedCategoriesItems = data.map((post, i)=>{
        return <CategoriesItem key={i} index={i} text={post.category} href={`/blog?category=${post.category}`} />
    })

  return (
    <aside id='categories' className='d-block bg-white shadow-sm'>
        <div className='aside-title p-3 bg-primary position-relative'>
            <h3 className='fs-4 fw-bold text-white m-0'>Categories</h3>
        </div>
        <ul className='navbar-nav'>
            {rederedCategoriesItems}
        </ul>
    </aside>
  )
}

export default Categories