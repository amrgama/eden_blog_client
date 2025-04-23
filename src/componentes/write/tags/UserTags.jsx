import React, { useContext } from 'react'
import UserTag from './UserTag';
import TagsContext from '../../../context/Tags';

const UserTags = () => {
  const {tags, setTags} = useContext(TagsContext)

  const createTag= (e)=>{
      const enterKey = e.key || e.code;
  
      if(enterKey === "Enter") {
        e.preventDefault()
        e.stopPropagation()
        setTags(prev => [...prev, e.target.value])
        e.target.value= "";
      }
    }

  const renderedTags = tags.map((tag, i) => {
      return(
          <UserTag key={i} i={i} tag={tag} />
      )
  })

  return (
    <div className='user-tags'>
        <div className="head p-3 border-bottom border-2 border-dark">
          <input
            type='text'
            onKeyDown={createTag}
            placeholder='type your tag'
            className='d-block w-100 px-2 py-1 bg-transparent border-1 text-dark text-start'
          />
        </div>
        <div className="body d-flex flex-wrap gap-1 p-3 overflow-hidden">
          {
            !!tags.length?
              <>{renderedTags}</>
            :
              <span className="d-block text-muted m-auto">There is no choosen or created tags yet</span>
          }
          
        </div>
    </div>
  )
}

export default UserTags