import React, { useEffect, useRef, useState } from 'react'
import BreadCrumb from '../componentes/breadCrumb/BreadCrumb';
import BigCard from '../componentes/postCards/BigCard';
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
import spinner from "../assets/animations/spinner.json";
// Add at the top of your imports
import MetaTags from '../componentes/ui-kits/MetaTags'
import { useSearchParams } from 'react-router-dom';

const LatestNew = () => {
    const dispatch= useDispatch();
    const allPosts= useRef([]);
    const {posts, isLoading, isSuccess, isError, message}= useSelector(selectPosts)
     const [searchParams, setSearchParams] = useSearchParams();
    const category = searchParams.get("category");
    const tag = searchParams.get("tag");
    const observedEle = useRef();
    const observer= useObserver(fetchMorePosts);

    const matches_lg = useMediaQuery("(min-width: 992px)");
    const matches_md = useMediaQuery("(min-width: 576px)");
    const style_card= matches_md? {height: "300px"} : undefined;
    const query= {
        createdAt: {$gte: new Date().setDate(new Date().getDate() - 6)},
        skip: 0,
        limit: 5
    };

    if(category){
        query.category= category;
    }
    if(tag){
        query.category= tag;
    }

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

        return ()=> {
          if(observedEle.current){
            observer.unobserve(observedEle.current)
          }
        }
    },[])

    useEffect(()=>{
        console.log("infirstRender>> query", query)
        allPosts.current= [];
        dispatch(getPostsByQuery(query))
    }, [])

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
                                // <>
                                //     <SkeletonBigCard />
                                //     <SkeletonBigCard />
                                //     <SkeletonBigCard />
                                // </>
                                <Lottie
                                    animationData={spinner} 
                                    loop={true} 
                                    className={'d-flex align-items-center m-auto'} 
                                    style={{width: "100px", height: "400px"}}
                                />
                            :
                                (!!allPosts.current.length)?
                                    <>
                                        {renderedPostCards}
                                        <Observed reference={observedEle} cb={handleLoadingPosts} />
                                    </>
                                :
                                    <div className="w-100 d-flex flex-column justify-content-cente align-items-center" style={{height: "400px"}}>
                                        <Lottie  animationData={notFoundPosts} style={{height: "300px"}}/>
                                        <span className="d-block w-100 fs-4 bold">There are't new posts yet.</span>
                                    </div>
                        }
                    </div>
                    {
                        (!!allPosts.current.length) &&
                        <div className='col position-lg-sticky d-flex flex-column gap-5 p-0 order-1 order-lg-2'
                        style={{maxWidth: `${matches_lg? "360px": ""}`, height: "fit-content", top: "1.5rem"}}>
                            <CategoriesLinks label={"Categories"} matchWith={[]} />
                            <TagsLinks label={"Tags"} matchWith={[]} />
                        </div>
                    }
                </div>
            </div>    
        </section>
    </div>
  )
}

export default LatestNew