import React, { useEffect } from 'react'
import BreadCrumb from '../componentes/breadCrumb/BreadCrumb';
import BigCard from '../componentes/postCards/BigCard';
import { data } from '../assets/data';
import CategoriesLinks from '../componentes/ui-kits/CategoriesLinks';
import TagsLinks from '../componentes/ui-kits/TagsLinks';
import useMediaQuery from '../hooks/useMediaQuery';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsByQuery, selectPosts } from '../features/posts/postsSlice';

// Add at the top of your imports
import MetaTags from '../componentes/ui-kits/MetaTags'
import { usePosts } from '../context/Posts';

const Trending = () => {
    const matches_lg = useMediaQuery("(min-width: 992px)");
    const matches_sm = useMediaQuery("(min-width: 576px)");
    const style_card= matches_sm? {height: "300px"} : undefined;
    const { posts } = usePosts()
    // const posts= JSON.parse(window.localStorage.getItem("posts"));
    
    console.log("posts", posts);

    const renderedPostCards = posts?.map((post, i)=>{
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
            <div className="container">
                {
                    !!posts?.length?
                        <div className="row justify-content-between gap-5 m-0">
                            <div className='col-12 col-lg d-flex flex-column gap-5 p-0 order-2 order-lg-1'>
                                {renderedPostCards}
                            </div>
                            <div className='col position-lg-sticky d-flex flex-column gap-5 p-0 order-1 order-lg-2'
                            style={{maxWidth: `${matches_lg? "360px": ""}`, height: "fit-content", top: "1.5rem"}}>
                                <CategoriesLinks label={"Trending Categories"} matchWith={[data[0].category]} />
                                <TagsLinks label={"Trending Tags"} matchWith={data[0].tags} />
                            </div>
                        </div>
                    :
                        <span style={{height: "100px"}} className="d-flex justify-content-center align-items-center text-muted fs-5">There is't trending posts yet!</span>
                }
            </div>    
        </section>
    </div>
  )
}

export default Trending