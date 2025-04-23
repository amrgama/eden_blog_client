import React, { useContext } from 'react'
import TagsContext from '../../../context/Tags'
const allTags = ["holiday", "music", "english", "gym", "pool"]

const TrendingTags = () => {
    const {tags, setTags} = useContext(TagsContext)

    const onChange = (e)=>{
        console.log("tags",tags, "checked "+e.target.checked, "value "+e.target.value)
    
        if(e.target.checked){
          setTags(prev => {
            return [...prev, e.target.value]
          })
        }
        else{
          const otherTags = tags?.filter(tag => tag !== e.target.value)
          setTags(prev => [...otherTags])
        }
    
    }

    const renderedLi = allTags?.map((tagItem, i) =>{
        return(
            <li
            key={i}
            className="nav-item form-check text-end p-0"
            style={{"width": "fit-content"}}
            >
                <input 
                    className="btn-check"
                    name={tagItem}
                    type="checkbox"
                    id={`${tagItem}i`}
                    onChange={onChange}
                    defaultChecked={tags?.some(tag => tag === tagItem)}
                    value={tagItem}
                />
                <label 
                htmlFor={`${tagItem}i`}
                className="w-100 btn btn-primary text-primary" 
                >
                  {tagItem}
                </label>
            </li>
        )
    })

  return (
    <div className='bg-secondary'>
      <span className='w-100 d-block fw-bold text-white p-3 border-bottom border-2 border-white'>Trending Tags</span>
      <ul className='navbar-nav flex-row flex-wrap p-3 gap-2' >
          {renderedLi}
      </ul>
    </div>
  )
}

export default TrendingTags