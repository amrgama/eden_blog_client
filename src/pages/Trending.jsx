import React, { useEffect } from 'react'
import BreadCrumb from '../componentes/breadCrumb/BreadCrumb';
import BigCard from '../componentes/postCards/BigCard';
import { data } from '../assets/data';
import CategoriesLinks from '../componentes/ui-kits/CategoriesLinks';
import TagsLinks from '../componentes/ui-kits/TagsLinks';
import useMediaQuery from '../hooks/useMediaQuery';

// Add at the top of your imports
import MetaTags from '../componentes/ui-kits/MetaTags'
import { usePosts } from '../context/Posts';
import Lottie from 'lottie-react';
// import { useLoaderData } from 'react-router-dom';
import spinner from "../assets/animations/spinner.json"
import notFoundPosts from "../assets/animations/notFoundPosts.json"
import { useState } from 'react';
import SkeletonBigCard from '../componentes/skeletonLoading/postCards/SkeletonBigCard';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsByQuery, selectPosts } from '../features/posts/postsSlice';
import { useSearchParams } from 'react-router-dom';

const Trending = () => {
    const matches_lg = useMediaQuery("(min-width: 992px)");
    const matches_sm = useMediaQuery("(min-width: 576px)");
    const style_card= matches_sm? {height: "300px"} : undefined;
    // const posts = useLoaderData();
    const [searchParams, setSearchParams] = useSearchParams();
    const category = searchParams.get("category");
    const tag = searchParams.get("tag");
    const dispatch= useDispatch();
    const {posts: fetchedPosts, isLoading, isSuccess, isError, message}= useSelector(selectPosts)
    const { posts, loading } = usePosts();
    const [postData, setPostData]= useState(!!posts.length? posts : [])
    // const posts= JSON.parse(window.localStorage.getItem("posts"));
    
    console.log("posts", posts);
    const query = (()=>{
         
        if(category != null && tag == null){
            return {category, limit: 4, skip: 0}
        }
        
        if(category == null && tag != null){
            return {tag, limit: 4, skip: 0}
        }
    })();

    
    useEffect(()=>{
        if(category || tag){
            dispatch(getPostsByQuery(query));
        }
    }, [searchParams])

    useEffect(()=>{
        if(!!posts?.length){
            setPostData(posts);
        }
        if(!!fetchedPosts?.length){
            setPostData(fetchedPosts);
        }
    }, [fetchedPosts?.length, posts?.length])

     const renderedPostCards = postData?.map((post, i)=>{
        return <BigCard key={i} postData={post} style={style_card}/>
    })
    
    return (
    <div id="trending">
        <MetaTags 
            title="Trending Posts - Eden Blog"
            description="Discover the most popular and trending articles on Eden Blog."
            keywords="trending, popular posts, viral content, eden blog"
            ogImage="/blog.jpg"
            ogUrl={import.meta.env.VITE_SITE_URL + "/trending"}
        />
        <BreadCrumb title={"trending"}/>
        <section className='py-5'>
            <div className="container d-flex align-items-center justify-content-center">
                {
                    loading?
                        <Lottie
                            animationData={spinner} 
                            loop={true} 
                            className={'d-flex align-items-center m-auto'} 
                            style={{width: "100px", height: "400px"}}
                        />
                    :
                        <>
                            {
                                !!posts?.length?
                                    <div className="row w-100 justify-content-between gap-5 m-0">
                                        <div className='col-12 col-lg d-flex flex-column gap-5 p-0 order-2 order-lg-1'>
                                            {
                                                isLoading?
                                                    <>
                                                        <SkeletonBigCard />
                                                        <SkeletonBigCard />
                                                        <SkeletonBigCard />
                                                    </>
                                                :
                                                    renderedPostCards
                                            }
                                        </div>
                                        <div className='col position-lg-sticky d-flex flex-column gap-5 p-0 order-1 order-lg-2'
                                        style={{maxWidth: `${matches_lg? "360px": ""}`, height: "fit-content", top: "1.5rem"}}>
                                            <CategoriesLinks label={"Trending Categories"} matchWith={[]} />
                                            <TagsLinks label={"Trending Tags"} matchWith={[]} />
                                        </div>
                                    </div>
                                :
                                    <div className="w-100 d-flex flex-column justify-content-cente align-items-center" style={{height: "400px"}}>
                                        <Lottie  animationData={notFoundPosts} style={{height: "300px"}}/>
                                        <span className="d-block w-100 fs-4 bold">There are't trending posts yet.</span>
                                    </div>
                            }
                        </>
                }
            </div>    
        </section>
    </div>
  )
}

export default Trending