import React, { useEffect } from 'react'
import BreadCrumb from '../componentes/breadCrumb/BreadCrumb';
import BigCard from '../componentes/postCards/BigCard';
import { data } from '../assets/data';
import CategoriesLinks from '../componentes/ui-kits/CategoriesLinks';
import TagsLinks from '../componentes/ui-kits/TagsLinks';
import useMediaQuery from '../hooks/useMediaQuery';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsByQuery, selectPosts } from '../features/posts/postsSlice';

const Trending = () => {
    const matches_lg = useMediaQuery("(min-width: 992px)");
    const matches_sm = useMediaQuery("(min-width: 576px)");
    const style_card= matches_sm? {height: "300px"} : undefined;
    const {posts}= useSelector(selectPosts);
    const dispatch= useDispatch();
    // useEffect(()=>{
    //     dispatch(getPostsByQuery());
    // }, [])
    console.log("posts", posts);

    const renderedPostCards = data.map((post, i)=>{
        return <BigCard key={i} postData={post} style={style_card}/>
    })
    return (
    <div id="trending">
        <BreadCrumb title={"trending"}/>
        <section className='py-5'>
            <div className="container">
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
            </div>    
        </section>
    </div>
  )
}

export default Trending