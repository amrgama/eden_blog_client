import { useEffect, useRef, useState } from 'react'
import BreadCrumb from '../../componentes/breadCrumb/BreadCrumb'
import Categories from '../../componentes/write/categories/Categories'
import Privacy from '../../componentes/write/privacy/Privacy'
import Tags from '../../componentes/write/tags/Tags'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createPost, editPost, getPost, reset, selectPost } from '../../features/post/postSlice'
import { toast } from 'react-toastify'
import SubmitBtn from '../../componentes/form/SubmitBtn'
import ErrorMsg from '../../componentes/form/ErrorMsg'
import { AnimatePresence } from 'framer-motion'
import { Controller, useForm } from 'react-hook-form'
import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from "yup"
import Title from '../../componentes/write/Title'
// import Upload from '../../componentes/write/Upload'
import { TagsContextProvider } from '../../context/Tags'
import TextEditor from '../../componentes/write/TextEditor'
// import ControlledTextarea from '../../componentes/form/ControlledTextarea'
import CategoriesSM from '../../componentes/write/categories/CategoriesSM'
import TagsSM from '../../componentes/write/tags/TagsSM'
import PrivacySM from '../../componentes/write/privacy/PrivacySM'
import UploadImg from '../../componentes/write/UploadImg'
// import {getFromCash} from "../../utils/helper";
import DescriptionInput from '../../componentes/write/DescriptionInput'
import ControlledTextarea from '../../componentes/form/ControlledTextarea'


const yupSchema = yup.object({
    title: yup.string()
    .required("title is required"),
    image: yup.mixed()
    .test("required", "You must upload cover image", (value)=>{
        console.log("file require: ", value)
        return Object.keys(value).length > 0
    })
    .test("file size", "The file type is not supported", (value)=>{
        console.log("file in file type test: ", value)
        console.log("image type", value[0]?.type)
        return ["image/jpeg", "image/png", "image/jpg", "image/svg+xml", "image/webp"].includes(value[0]?.type)
    }),
    content: yup.string(),
    category: yup.string().required("category is required"),
    // desc: yup.string()
    // .required("Description is required")
    // .min(10, "Description must has at least 10 characters")
    // .max(200, "Description must not has more than 200 characters")
})


const Write = () => {
    const {
        handleSubmit,
        control,
        register,
        formState: {errors, isSubmitSuccessful},
        getValues,
        setValue,
        watch
    } = useForm({
        resolver: yupResolver(yupSchema),
        mode: "onChange"
    })
    console.log("errorss", errors)

    const {id: postId} = useParams()
    const location = useLocation()
    const dispatch = useDispatch();
    const navigate= useNavigate();
    const [pageName, setPageName] = useState(location.pathname.split("/").at(-1));
    // console.log("pageName", pageName)
    const {post: selectedPost, isLoading, isSuccess, isError, message, meta} = useSelector(selectPost)
    const [currentPost, setCurrentPost]= useState((pageName === "edit")? selectedPost : {})
    // const parsedPost =  JSON.parse(getFromCash("post", "session"));
    // const postRef = useRef((parsedPost?.id === postId && !!postId)? parsedPost : post)
    // const postRef = useRef((pageName === "edit")? post : {})
  
    const isFirstRender = useRef(true);
    const imageUrlRef = useRef("")
    const tagsRef = useRef();
    const publishRef = useRef();

    const [isMatched, setIsMatched] = useState(window.matchMedia("only screen and (max-width: 992px)").matches)
    const dummyFileObj = {"0": {name: "dumyData", type: "image/png"}, length: 1};
    const EmptydummyFileObj = {length: 0};
    // console.log("content>>", watch("content"))
    // if(pageName === "write"){
    //     setCurrentPost({});
    // }

    // if(isSuccess && meta?.action === "get_post"){
    //     setCurrentPost(post);
    // }

    window.addEventListener("resize", (e)=>{
      setIsMatched(window.matchMedia("only screen and (max-width: 992px)").matches);
    })

    const publish = (postData)=>{
        console.log("postData", postData);
        dispatch(createPost(postData))
    }

    const edit = (postData)=>{
        dispatch(editPost(postData))
    }
    
    useEffect(()=>{
        console.log("pageName_useEffect", pageName, "location.pathname", location.pathname.split("/").at(-1))
        // console.log("post in session storage", post);
        if(pageName !== location.pathname.split("/").at(-1)){
            setPageName(location.pathname.split("/").at(-1))
        }
        console.log("pageName", pageName, "currentPost", currentPost);
        if(pageName === "edit" && !!!Object.keys(currentPost).length){
            console.log("called post");
            dispatch(getPost(postId))
        }
        
        if(pageName === "write"){
            setCurrentPost({});
        }

        return ()=>{
            isFirstRender.current = false;
        }
    }, [pageName, location.pathname, location, useParams, useLocation])

    useEffect(()=>{

        if(isSubmitSuccessful && isSuccess && meta?.action === "get_post" && pageName === "edit"){
            console.log("post_get_post", currentPost);
            setCurrentPost(selectedPost);
        }

        if(isSubmitSuccessful && isSuccess && meta?.action === "create_post"){
            toast.success("Article created successfully")
            navigate(`/account/${JSON.parse(window?.localStorage?.getItem("user"))?.userName}`)
        }
        // console.log("isFirstRender.current", isFirstRender.current,"isSuccess: ", isSuccess, "meta.action", meta?.action);
        if(isSubmitSuccessful && isSuccess && meta?.action === "edit_post"){
            toast.success("Article edited successfully");
            navigate(`/account/${JSON.parse(window?.localStorage?.getItem("user"))?.userName}`)
        }

        // console.log(isError, "action", meta?.action);
        if(isSubmitSuccessful && isError && (meta?.action === "create_post" || meta?.action === "edit_post")){
            toast.error(message)
        }

    }, [currentPost, isLoading, isSuccess, isError, dispatch])

    console.log("post_later", currentPost)
    const submit = data => {
        console.log("formData", data);
        console.log("parsedContent>>", data.content);
        const {desc, ...other}= data;
        if(!!!desc){
            data= other;
        }

        const postData = {
            ...data,
            "image": imageUrlRef.current,
            "tags": tagsRef?.current.value.split(","),
            isFeatured: true,
            // isHandPicked: true,
            isPrivate: publishRef?.current.value === "private",
        };

        if(pageName === "write"){
            publish(postData)
        }
        else if(pageName === "edit"){
            edit({id: postId, ...postData})
        }
    }
    return (
        <div id="write">
            <BreadCrumb title={pageName}/>
            <section className='py-5'>
                <div className="container">
                    <form className="row gap-4 gap-lg-0 m-0 m-x-sm-4" noValidate onSubmit={handleSubmit(submit)}>
                        <div className='col-12 col-lg-8 col-xl-9 order-1 order-lg-0 p-0 pe-lg-5'>
                            { (!!Object.keys(currentPost).length || pageName === "write") &&
                                <div className='mb-4' style={{height: "350px"}}>
                                    <Controller
                                        control={control}
                                        name={"image"}
                                        defaultValue= {(!!currentPost?.image)? dummyFileObj: EmptydummyFileObj}
                                        render={ ({ field: {onChange, value, ref} })=>{
                                            return (
                                                <UploadImg
                                                    id={"file"}
                                                    name={"image"}
                                                    text={"Upload cover image"}
                                                    defaulImageUrlVal={currentPost?.image ?? ""}
                                                    imageUrlRef={imageUrlRef}
                                                    value={value}
                                                    onChange={onChange}
                                                    errMsg= {errors?.image?.message}
                                                />
                                            )
                                        }}
                                    />
                                </div>
                            }
                            <div className='w-100 mb-4'>
                                { (!!Object.keys(currentPost).length || pageName === "write") &&                           
                                    <Controller
                                        control={control}
                                        name={"title"}
                                        defaultValue= {currentPost?.title ?? ""}
                                        render={ ({ field: {onChange, value, ref} })=>{
                                            return (
                                                <Title 
                                                    id={"title"}
                                                    name={"title"}
                                                    onChange={onChange}
                                                    value={value}
                                                    errMsg={errors?.title?.message}
                                                    placeholder={"title"} 
                                                />
                                            )
                                        }}
                                    />
                                }
                            </div>
                            <div className="w-100 mb-4">
                                <Controller
                                    control={control}
                                    name={"desc"}
                                    defaultValue={currentPost?.desc ?? ""}
                                    render={({field})=>{
                                        return (
                                            <ControlledTextarea
                                                onChange={field.onChange}
                                                id={"desc"}
                                                name={"desc"}
                                                placeholder={"Description"}
                                                value={field.value}
                                                textareaWrapperClasses={"p-0 m-0"}
                                                textareaClasses= {"border border-2 border-dark shadow-none"}
                                            />
                                        )
                                    }}
                                />
                            </div>
                            <div id={"content"} className="content mb-4">
                                { (!!Object.keys(currentPost).length || pageName === "write") &&
                                    <>
                                        <Controller
                                            control={control}
                                            name={"content"}
                                            defaultValue = {currentPost?.content ?? ""}
                                            render={ ({ field: {onChange, value} })=>{
                                                return <TextEditor
                                                            onChange={onChange}
                                                            value={value}
                                                        />
                                            }}
                                        />
                                        <AnimatePresence mode='await' initial="false">
                                            {errors?.content?.message && <ErrorMsg message={errors?.content?.message} extraClasses={"mt-1"} />}
                                        </AnimatePresence>
                                    </>
                                }
                            </div>
                            <div className='w-100 '>
                                <div className="" style={{height: "55px"}}>
                                    {
                                        pageName === "write" &&
                                        <SubmitBtn text={"Publish"} isLoading={isLoading} isDisabled={!!Object.keys(errors).length || isLoading} /> 
                                    }
                                    {
                                        pageName === "edit" &&
                                        <SubmitBtn text={"Edit"} isLoading={isLoading} isDisabled={!!Object.keys(errors).length || isLoading} /> 
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='col-12 col-lg-4 col-xl-3 order-0 order-lg-1 p-0 ps-lg-3 ps-xl-5 d-lg-block'>
                            <div className='d-flex flex-wrap align-items-lg-end gap-3 gap-lg-5'>
                                { (!!Object.keys(currentPost).length || pageName === "write") &&
                                    <div 
                                        className="col p-0 p-x-lg-1 h-fit"
                                        style={{minWidth: "170px"}}
                                    >
                                        {
                                            (isMatched)?
                                                <PrivacySM
                                                    pubishRef={publishRef}
                                                    defaultVal={(currentPost?.isPrivate)? "private" : "public"}
                                                />
                                            :
                                                <Privacy
                                                    // isPrivate={isPrivate}
                                                    // setIsPrivate={setIsPrivate}
                                                    pubishRef={publishRef}
                                                    defaultVal={(currentPost?.isPrivate)? "private" : "public"}
                                                />
                                        }
                                    </div>
                                }
                                { (!!Object.keys(currentPost).length || pageName === "write") &&
                                    <div 
                                        className="col p-0 p-x-lg-1 h-fit"
                                        style={{minWidth: "170px"}}
                                    >
                                        <Controller
                                            control={control}
                                            name={"category"}
                                            defaultValue = {currentPost?.category ?? ""}
                                            render={ ({ field: { onChange, value } })=>{
                                                
                                                if(isMatched){
                                                    return <CategoriesSM
                                                        id={"category"}
                                                        name={"category"}
                                                        onChange={onChange}
                                                        value={value}
                                                        errMsg={errors?.category?.message}
                                                    />
                                                }

                                                return <Categories
                                                    id={"category"}
                                                    name={"category"}
                                                    onChange={onChange}
                                                    value={value}
                                                    errMsg={errors?.category?.message}
                                                />
                                            }}
                                        />
                                    </div>
                                }
                                { 
                                    (!!Object.keys(currentPost).length || pageName === "write") &&
                                    <div 
                                        className="col p-0 p-x-lg-1 h-fit"
                                        style={{minWidth: "170px"}}
                                    >
                                        <TagsContextProvider
                                            tagsRef={tagsRef}
                                            tagsRefVal= {currentPost?.tags}
                                        >
                                            {
                                                (isMatched)?
                                                    <TagsSM />
                                                :
                                                    <Tags />
                                            }
                                        </TagsContextProvider>
                                    </div>
                                }
                            </div>
                        </div>
                    </form>
                </div>    
            </section>
        </div>
    )
}

export default Write