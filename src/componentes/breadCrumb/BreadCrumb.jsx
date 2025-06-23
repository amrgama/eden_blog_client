import React, { Children } from 'react'
import { Outlet, useLocation, useParams, useSearchParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import BreadCrumbItem from './BreadCrumbItem'

const BreadCrumb = ({title, ignor}) => {
  const id= useParams();
  const location = useLocation();
  console.log("location>>", location, "id>>", id);
  const links = location.pathname.split("/")
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category");
  const tag = searchParams.get("tag");
  let query = "";
  let path= "";
 
  if(category !== null && tag === null){
    query = category
  }
  else if(category === null && tag !== null){
    query = tag
  }

  const renderedLinks = links.map((link, i)=>{
    path += "/"

    if(i == 0) {   
      return (
        <BreadCrumbItem key={i} text={"home"} path={"/"} />
      )
    }
    
    if((i !== (links.length - 1)) && ignor != link){
      path += `${link}`
      return (
        <BreadCrumbItem key={i} text={link} path={path} />
      )
    }

    let text = (query)? query : link;
    // if(id) text= link;

    return (
      <BreadCrumbItem key={i} text={text} isActive={true}/>
    )

  })
  console.log("title",title)
  return (
    <div 
      className='breadcrumb-wrapper lh-base py-3 bg-white border-bottom border-3 border-dark'
      style={{marginTop: "78px"}}
    >
      <div className='container'>
        <nav aria-label="breadcrumb" className='d-flex flex-column align-items-center lh-lg my-2'>
          <ol className="breadcrumb fs-7 min-md-fs-6 m-0">
            {renderedLinks}
          </ol>
        </nav>
        <h1 className='breadcrumb-title fs-6 min-md-fs-5 min-lg-fs-4 fw-bold text-dark text-capitalize m-0'>{title}</h1>
      </div>
    </div>
  )
}

export default BreadCrumb