import React, { useRef, useState } from 'react'
import ReactDOM from 'react-dom';
import UserTags from './UserTags';
import TrendingTags from './TrendingTags';

const allTags = ["holiday", "music", "english", "gym", "pool"]

const Tags = () => {

  return (
    <div className='tags d-block w-100 bg-white borde border-2 border-dark'>
        <span className="d-block fs-5 fw-500 border-bottom border-2 border-dark px-3 py-2">Tags</span>
        <UserTags />
        <TrendingTags />
    </div>
  )
}

export default Tags