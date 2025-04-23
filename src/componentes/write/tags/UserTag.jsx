import React, { useContext, useEffect } from 'react'
import TagsContext from '../../../context/Tags'

const UserTag = ({i, tag}) => {
    const {setTags} = useContext(TagsContext);

    const deleteTag= (e)=>{
        e.preventDefault()
        e.stopPropagation()

        setTags(prev=>{
            return [...prev.filter(tag => tag !== e.target.parentElement.dataset.value)];
        });
    }


  return (
    <span 
        data-value={tag}
        className="new-tag btn btn-primary p-0 mb-2 fs-7 text-white text-center created"
        style={{transform: `translateY(-100%)`,animation: `translateY 0.2s 1 0.1s ease-in forwards`}}
    >
        <span className='d-inline-block mx-2'>{tag}</span>
        <button 
            onClick={deleteTag} 
            className="delete-btn btn btn-secondary px-2 py-1 ms-auto rounded-1 fs-7 text-primary text-center"
            // style={{width:}}
        >X</button>
    </span>    
  )
}

export default UserTag