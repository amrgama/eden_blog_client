import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import SkeletonBigCard from '../../skeletonLoading/postCards/SkeletonBigCard';
import BigCard from '../../postCards/BigCard';
import { selectPosts, getMorePosts } from '../../../features/posts/postsSlice';
import useMediaQuery from '../../../hooks/useMediaQuery';
import Observed from "../../ui-kits/Observed"
import useObserver from '../../../hooks/useObserver';

const UserPosts = ({userId, posts}) => {
  const {isLoading, isSuccess, isError, message, meta} = useSelector(selectPosts)
  const allPostsRef= useRef(posts)
  const dispatch = useDispatch();
  const observedEle = useRef();
  const observer= useObserver(fetchMorePosts);
  const matches = useMediaQuery("(min-width: 576px)");
  const style= matches? {height: "300px"} : undefined;
  const skip= useRef(0);
  const limit= 5;


  let renderedPostCards = useMemo(()=> {
    return allPostsRef.current?.map((post, i)=>{
      // console.log("post", post)
      return <BigCard key={i} postData={post} style={style}/>
    })
  }, [allPostsRef.current?.length]);

  async function fetchMorePosts(){
    if(window.innerHeight > observedEle.current?.getBoundingClientRect().bottom){
      // console.log("fetched");
      const query = {limit, skip: skip.current}
      const res= await dispatch(getMorePosts({userId, query}));
      if(res?.meta?.requestStatus == "fulfilled"){
        allPostsRef.current= [...allPostsRef.current, ...res?.payload?.posts]
        skip.current += limit;
      }
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
                    {
                      (meta?.page == meta?.pageCount) &&
                      <Observed reference={observedEle} cb={handleLoadingPosts} />
                    }
                  </>
              }
            </div>
        </div>
    </section>
  )
}

export default UserPosts