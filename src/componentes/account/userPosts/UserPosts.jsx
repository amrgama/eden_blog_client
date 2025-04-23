import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import SkeletonBigCard from '../../skeletonLoading/postCards/SkeletonBigCard';
import BigCard from '../../postCards/BigCard';
import { selectPosts, getMorePosts } from '../../../features/posts/postsSlice';
import useMediaQuery from '../../../hooks/useMediaQuery';
import Observed from "../../ui-kits/Observed"
import useObserver from '../../../hooks/useObserver';

const UserPosts = ({userId, posts}) => {
  const {posts: selectedPosts, isLoading, isSuccess, isError, message, meta} = useSelector(selectPosts)
  const allPostsRef= useRef([...posts, ...selectedPosts])
  const dispatch = useDispatch();
  const observedEle = useRef();
  const observer= useObserver(fetchMorePosts);
  const matches = useMediaQuery("(min-width: 576px)");
  const style= matches? {height: "300px"} : undefined;
  const skip= useRef(4);
  const limit= 4;

  if((meta?.action === "get_more_posts") && isSuccess && !!selectedPosts.length){
    allPostsRef.current= [...allPostsRef.current, ...selectedPosts]
    skip.current += limit;
  }

  const renderedPostCards = allPostsRef.current?.map((post, i)=>{
    // console.log("post", post)
    return <BigCard key={i} postData={post} style={style}/>
  })

  function fetchMorePosts(){
    if(window.innerHeight > observedEle.current.getBoundingClientRect().bottom && !!selectedPosts.length){
      // console.log("fetched");
      const query = {limit, skip: skip.current}
      dispatch(getMorePosts({userId, query}))
    }
  }

  function handleLoadingPosts(){
    if(isLoading && meta?.action === "get_more_posts"){
      return <SkeletonBigCard />
    }
  }

  useEffect(()=>{
    if(observedEle.current){
      observer.observe(observedEle.current)
    }
    
    return ()=> {
      if(observedEle.current){
        observer.unobserve(observedEle.current)
      }
    }
  },[])
  
  useEffect(()=>{
    if(meta?.action === "get_more_posts"){
      if(isError && message){
        toast.error(message)
      }
    }
    
  }, [posts, isLoading, isSuccess, isError, message])
  
  return (
    <section className="user-posts py-5">
        <div className="container" style={{maxWidth: "800px"}}>
            <div className="d-flex flex-column gap-4">
              {
                (!!!posts.length)?
                  <div className="fs-4 text-muted text-500 p-5">There is no posts.</div>
                :
                  <>
                    {renderedPostCards}
                    <Observed reference={observedEle} cb={handleLoadingPosts} />
                  </>
              }
            </div>
        </div>
    </section>
  )
}

export default UserPosts