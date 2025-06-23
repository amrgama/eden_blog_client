import React, { useEffect, useRef, useState } from 'react'
import { Outlet, useLoaderData, useParams, useSearchParams } from 'react-router-dom'
// import images from '../assets/images';
import BreadCrumb from '../componentes/breadCrumb/BreadCrumb';
import Article from '../componentes/singlePost/Article';
import CreateComment from '../componentes/singlePost/createComment/CreateComment';
import Comments from '../componentes/singlePost/comments/Comments';
import { useDispatch, useSelector } from 'react-redux';
import { getPost, increaseReadings, selectPost } from '../features/post/postSlice';
import { CommentsContextProvider } from '../context/Comments';
// import PostLoading from '../componentes/singlePost/postTools/PostLoading';
import { toast } from 'react-toastify';
import SkeletonArticle from '../componentes/skeletonLoading/singlePost/SkeletonArticle';
// import SkeletonComment from '../componentes/skeletonLoading/singlePost/SkeletonComment';
// import {cash} from "../utils/helper";
import UserCard from '../componentes/singlePost/aside/AuthorInfo';
import MoreFromBloger from '../componentes/singlePost/aside/MoreFromBloger';
import PopularPosts from '../componentes/singlePost/aside/PopularPosts';
import { selectAuth } from '../features/auth/authSlice';
import useMediaQuery from '../hooks/useMediaQuery';
import { getAccount, selectAccount } from '../features/account/accountSlice';
import JoinToUsModal from '../componentes/modal/JoinToUsModal';

// Add at the top of your imports
import MetaTags from '../componentes/ui-kits/MetaTags'
import { usePosts } from '../context/Posts';

// Inside your component, before the return statement
const SinglePost = () => {
    const params = useParams();
    const [searchParams] = useSearchParams();
    const modalName= "";
    const id = params.id;
    const commentsRef = useRef()
    const dispatch = useDispatch()
    let {post, isLoading, isSuccess, isError, message, meta} = useSelector(selectPost)
    const {user: authUser} = useSelector(selectAuth)
    const authorState= useSelector(selectAccount);
    const matches = useMediaQuery("(min-width: 992px)");
    // const posts = useLoaderData();
    const { posts } = usePosts();
    post = posts?.filter(post=> post._id == id)?.[0] || post;
    // post = JSON.parse(window.localStorage.getItem("posts"))?.filter(post=> post._id == id)?.[0] || post;
    // const [showJoinToUSModal, setShowJoinToUSModal]= useState(searchParams.get("modal-name") == "join-to-us");
    // cash("post", {id,...post}, "session");
    console.log("idParam>>", id, "post", post);

    commentsRef.current= (Object.keys(post?.comments ?? []).length)? [...post?.comments?.values]: [];
    console.log("commentRef in singlePost", commentsRef.current)
    const isFirstRender = useRef(true);
    console.log("isFirstRender.current", isFirstRender.current)
    useEffect(()=>{
       if(post?.isStatic) return;
        dispatch(getPost(id))
        return ()=> isFirstRender.current = false;
    }, [])
    useEffect(()=>{
        if(post?.isStatic) return;
        if(isSuccess){
            dispatch(getAccount(post?.author?.userName));
        }
    }, [isSuccess])

    useEffect(()=>{
        if(post?.isStatic) return;
        if(isSuccess && isFirstRender.current && authUser?.id != post?.author?._id){
            console.log("isReader", authUser?.id?.toString() !== post?.author?._id?.toString())
            dispatch(increaseReadings({postId: post?._id, isReader: authUser?.id?.toString() !== post?.author?._id?.toString()}))
        }
        if(!isSuccess && isError && message){
            console.log("from single post")
            toast.error(message)
        }
    }, [isLoading, isSuccess, isError, dispatch])

    useEffect(()=>{
        window.scrollTo({top: 0, behavior: "smooth"});
    },[])
    // useEffect(()=>{

    //     if(searchParams.get("modal-name") == "join-to-us"){
    //         setShowJoinToUSModal(searchParams.get("modal-name") == "join-to-us");
    //     }
    // }, searchParams.get("modal-name"))
    return (
    <div id="singlePost">
        <MetaTags 
            title={post?.title || "Blog Post - Eden Blog"}
            description={post?.desc || "Read this interesting article on Eden Blog"}
            keywords={post?.tags?.join(", ") || "blog, article"}
            ogImage={post?.image}
            ogUrl={import.meta.env.VITE_SITE_URL + `/${post?._id}`}
        />
        <BreadCrumb title={post?.title} ignor={"posts"}/>
        <section className='py-5'>
            <div className="container">
                <div className="row gap-4 m-0">
                    <div className='col-12 col-lg p-0 d-flex flex-column gap-5' style={{maxWidth: "800px"}}>
                        {
                            (isLoading && !!!Object.keys(post ?? []).length)?
                                <SkeletonArticle />
                            :
                                <>
                                    {
                                        !!Object.keys(post ?? []).length &&
                                        <>
                                            <Article post={post} />
                                            <div className="p-5 mt-3 bg-white">
                                                <CommentsContextProvider commentsRef={commentsRef} initialVal={post?.comments?.values || []} >
                                                    <CreateComment />
                                                    {
                                                        isSuccess && !!Object.keys(post).length && !!post?.comments?.values?.length &&
                                                        <Comments comments={post?.comments}/>
                                                    }
                                                    {
                                                        isSuccess && !!Object.keys(post).length && !post?.comments?.values?.length &&
                                                        <span className="fs-6 text-muted bg-white">
                                                            Be the first Reader who is comment
                                                        </span>
                                                    }
                                                </CommentsContextProvider>
                                            </div>
                                        </>
                                    }
                                </>
                        }

                    </div>
                    <div className='col position-sticky d-flex flex-column gap-5 p-0 mt-5 mt-lg-0'
                    style={{maxWidth: `${matches? "360px": ""}`, height: "fit-content", top: "1.5rem"}}>
                        {
                            (!!Object.keys(post).length) &&
                            <>
                                <UserCard author={post?.author} authUser={authUser}/>
                                <div className="w-100 d-flex flex-wrap gap-5">
                                    {
                                        !post?.isStatic &&
                                        <MoreFromBloger bloggerId={post?.author._id} />
                                    }
                                    <PopularPosts />
                                </div>
                            </>
                        }
                        
                    </div>
                </div>
            </div>    
        </section>
        {/* <JoinToUsModal show={showJoinToUSModal} setshow={setShowJoinToUSModal}/> */}
    </div>
    )
}

export default SinglePost