import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom'
// import images from '../assets/images';
import BreadCrumb from '../componentes/breadCrumb/BreadCrumb';
// import Left from '../componentes/left/Left';
import BigCard from '../componentes/postCards/BigCard';
// import MainAside from '../componentes/mainAside/MainAside';
import { data } from '../assets/data';
import CategoriesLinks from '../componentes/ui-kits/CategoriesLinks';
import TagsLinks from '../componentes/ui-kits/TagsLinks';
import useMediaQuery from '../hooks/useMediaQuery';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsByQuery, selectPosts } from '../features/posts/postsSlice';
import { toast } from 'react-toastify';
import SkeletonBigCard from '../componentes/skeletonLoading/postCards/SkeletonBigCard';
import useObserver from '../hooks/useObserver';
import Observed from '../componentes/ui-kits/Observed';

const DinamicPage = () => {
    const dispatch= useDispatch();
    const {posts, isLoading, isSuccess, isError, message}= useSelector(selectPosts)
    const [searchParams, setSearchParams] = useSearchParams();
    const matches_min_sm = useMediaQuery("(min-width: 576px)");
    const matches_min_lg = useMediaQuery("(min-width: 992px)");
    const isFirstRender= useRef(true);
    const [postData, setPostData]= useState(!!posts.length? posts : data)
    const observedEle = useRef();
    const observer= useObserver(fetchMorePosts);
    const category = searchParams.get("category");
    const tag = searchParams.get("tag");
    const {query , id} = (()=>{
         
        if(category != null && tag == null){
            return {
                query: {category, limit: 4, skip: 0},
                id: "category"
            }
        }
        
        if(category == null && tag != null){
            return {
                query: {tag, limit: 4, skip: 0},
                id: "tag"
            }
        }
    })();
    
    // console.log("postData", postData);
    const card_style= matches_min_sm? {height: "300px"} : undefined;
    const renderedPostCards = postData.map((post, i)=>{
        return <BigCard key={i} postData={post} style={card_style}/>
    })
    
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
        if(id === "category" || id === "tag"){

            dispatch(getPostsByQuery(query));
        }
    }, [searchParams])

    useEffect(()=>{
        if(!isFirstRender.current && isSuccess){
            // console.log("inside useEffect", !!posts.length? posts : data);
            setPostData(prev => !!posts.length? [...prev, ...posts] : [...prev, ...data]);
        }
        if(!isFirstRender.current && isError && !!message){
            toast.error(message);
        }

        return ()=> isFirstRender.current= false;
    }, [isLoading, isSuccess, isError, message])
    return (
        <div id={id}>
            <BreadCrumb title={`${id} : ${query[id]}`}/>
            <section className='py-5'>
                <div className="container">
                    <div className="row justify-content-between gap-5 m-0">
                        <div className='col-12 col-lg d-flex flex-column gap-5 p-0 order-2 order-lg-1'>
                            {
                                (isLoading && !!!posts.length) &&
                                <>
                                    <SkeletonBigCard />
                                    <SkeletonBigCard />
                                    <SkeletonBigCard />
                                </>
                            }
                            {
                                (!!postData.length) &&
                                <>
                                    {renderedPostCards}
                                    <Observed reference={observedEle} cb={handleLoadingPosts} />
                                </>
                            }
                        </div>
                        <div className='col position-lg-sticky d-flex flex-column gap-5 p-0 order-1 order-lg-2'
                        style={{maxWidth: matches_min_lg? "360px" : "", height: "fit-content", top: "1.5rem"}}>
                            <CategoriesLinks label={"Categories"} matchWith={[category]} />
                            <TagsLinks label={"Tags"} matchWith={[tag]} />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default DinamicPage