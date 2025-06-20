import React, { useEffect, useRef, useState } from 'react'
import BreadCrumb from '../componentes/breadCrumb/BreadCrumb';
import BigCard from '../componentes/postCards/BigCard';
import { data } from '../assets/data';
import CategoriesLinks from '../componentes/ui-kits/CategoriesLinks';
import TagsLinks from '../componentes/ui-kits/TagsLinks';
import useMediaQuery from '../hooks/useMediaQuery';
import { useDispatch, useSelector } from 'react-redux';
import { selectPosts, getPostsByQuery } from '../features/posts/postsSlice';
import useObserver from '../hooks/useObserver';
import SkeletonBigCard from '../componentes/skeletonLoading/postCards/SkeletonBigCard';
import Observed from '../componentes/ui-kits/Observed';
import notFoundPosts from "../assets/animations/notFoundPosts.json"
import Lottie from 'lottie-react';

// Add at the top of your imports
import MetaTags from '../componentes/ui-kits/MetaTags'

const LatestNew = () => {
    const dispatch= useDispatch();
    const allPosts= useRef([]);
    const {posts, isLoading, isSuccess, isError, message}= useSelector(selectPosts)
    const observedEle = useRef();
    const observer= useObserver(fetchMorePosts);

    const matches_lg = useMediaQuery("(min-width: 992px)");
    const matches_md = useMediaQuery("(min-width: 576px)");
    const style_card= matches_md? {height: "300px"} : undefined;
    const query= {
        createdAt: {$gte: new Date().setDate(new Date().getDate() - 1)},
        skip: 0,
        limit: 5
    };

    function fetchMorePosts(){
        if(window.innerHeight > observedEle.current.getBoundingClientRect().bottom && !!posts.length){
            console.log("fetching")
            dispatch(getPostsByQuery({...query, skip: query.skip + query.limit}))
        }
    }
    
    function handleLoadingPosts(){
        if(isLoading){
            return <SkeletonBigCard />
        }
    }

    useEffect(()=>{
        if(observedEle.current){
          observer.observe(observedEle.current)
        }
        console.log("infirstRender>> query", query)
        dispatch(getPostsByQuery(query))

        return ()=> {
          if(observedEle.current){
            observer.unobserve(observedEle.current)
          }
        }
    },[])

    if(isSuccess && !!posts.length){
        allPosts.current= [...allPosts.current, ...posts];
    }
    console.log("allPosts.current", allPosts.current);
    const renderedPostCards = allPosts.current.map((post, i)=>{
        return <BigCard key={i} postData={post} style={style_card}/>
    })

    return (
    <div id="LatestNew">
        <MetaTags 
            title="Latest News - Eden Blog"
            description="Stay updated with the newest articles and fresh content on Eden Blog."
            keywords="latest news, new articles, fresh content, eden blog"
            ogImage="/blog.jpg"
            ogUrl={import.meta.env.VITE_SITE_URL + "/latest-new"}
        />
        <BreadCrumb title={"latest new"}/>
        <section className='py-5'>
            <div className="container">
               <div className="row justify-content-between gap-5 m-0">
                    <div className='col-12 col-lg d-flex flex-column gap-5 p-0 order-2 order-lg-1'>
                        {
                            (isLoading && !!!posts.length)?
                                <>
                                    <SkeletonBigCard />
                                    <SkeletonBigCard />
                                    <SkeletonBigCard />
                                </>
                            :
                                (!!allPosts.current.length)?
                                <>
                                    {renderedPostCards}
                                    <Observed reference={observedEle} cb={handleLoadingPosts} />
                                </>
                                :
                                    <div className="w-100 d-flex flex-column flex-wrap justify-content-cente align-items-center" style={{height: "520px"}}>
                                        <Lottie  animationData={notFoundPosts} style={{height: "400px"}}/>
                                        <span className="fs-4 bold">There are't posts yet.</span>
                                    </div>
                        }
                    </div>
                    {
                        (!!allPosts.current.length) &&
                        <div className='col position-lg-sticky d-flex flex-column gap-5 p-0 order-1 order-lg-2'
                        style={{maxWidth: `${matches_lg? "360px": ""}`, height: "fit-content", top: "1.5rem"}}>
                            <CategoriesLinks label={"Categories"} matchWith={[data[0].category]} />
                            <TagsLinks label={"Tags"} matchWith={data[0].tags} />
                        </div>
                    }
                </div>
            </div>    
        </section>
    </div>
  )
}

export default LatestNew