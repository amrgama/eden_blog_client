import React, { useEffect, useRef } from 'react'
// import { data } from '../../assets/data'
import { useParams } from 'react-router-dom'
import {BsEye} from "react-icons/bs"
import LikeBtn from './LikeBtn'
import SaveBtn from './SaveBtn'
// import ShareBtn from './ShareBtn'
import TimeAgo from './TimeAgo'
import PostTools from './postTools/PostTools'
import { EditorState, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { combineWithBaseUrl } from '../../utils/helper'

const Article = ({post}) => {
  const params = useParams();
  const postId = params.id;
  const user = JSON.parse(window.localStorage.getItem("user"))
  const userId = user?.id;

  let rawContent, convertedRawContent;
  if(post?.content){
    rawContent = JSON.parse(post?.content);
    convertedRawContent = convertFromRaw(rawContent);
  }

  useEffect(()=>{
    const editorToolbar = document.querySelector(".rdw-editor-toolbar");
    const textEditor = document.querySelector(".notranslate");
    const contentEle = document.createElement("div");
    if(editorToolbar) editorToolbar.remove();
    if(textEditor){
      contentEle.setAttribute("class", textEditor.getAttribute("class"));
      contentEle.innerHTML= textEditor.innerHTML;
      textEditor.replaceWith(contentEle)
    }
  }, [])

  return (
    <article className='d-block w-100 position-relative p-0 bg-white'>
      <img src={combineWithBaseUrl(post?.image)} className='d-block w-100 object-fit-contain' style={{height: "370px", objectPosition: "center"}} alt="..." />
      <div className='d-flex flex-column gap-3 p-4 text-start'>
        <div className="w-100 d-flex align-items-center justify-content-between gap-3">
          <div className='d-flex flex-wrap gap-1'>
            {
              post?.tags?.map((tag, i) =>{
              return <span key={i}> <span className='text-primary fw-bold me-1'>#</span>{tag}</span>
              })
            }
          </div>
          <div className='d-flex align-items-center gap-2 gap-xl-3'>
            <TimeAgo date={post?.createdAt} />
            <span className='bg-primary' style={{width: "30px", height: "10px"}}></span>
            <span className='d-flex align-items-center'>
              {post.readings}
              <BsEye className='ms-1' />
            </span>
            {
              !!user &&
              <PostTools />
            }
          </div>
        </div>
        <span className="category w-100 fw-bold text-capitalize text-start">\ {post?.category}</span>
        <h2 className='card-title m-0 fs-3 fw-bold text-dark'>
          {post?.title}
        </h2>
        <Editor
          editorState={EditorState.createWithContent(convertedRawContent)}
        />
        <div 
        className="col-12 col-sm-6 d-flex align-items-center justify-content-center gap-3 position-absolute"
        style={{top: "100%", left: "50%", transform: "translate(-50%, -50%)"}}
        >
          <LikeBtn postId={postId} userId={userId} reactionList={post?.reactionList}/>
          <SaveBtn postId={postId} userId={userId} saveList={post?.saveList} />
          {/* <ShareBtn postId={postId} userId={userId} reactionList={post?.reactionList} /> */}
        </div>
      </div>
    </article>
  )
}

export default Article