import React, { useEffect } from 'react'
import ReactDom from 'react-dom';
import { useDispatch, useSelector } from 'react-redux'
import VisibleModal from './VisibleModal';
import HiddenModal from './HiddenModal';
import { selectPost } from '../../features/post/postSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Modal = ({title, actionText, modelId, action, actionParam, open, setOpen, children}) => {
    const disptach = useDispatch();
    const {post, isLoading, isSuccess, isError, message}= useSelector(selectPost);
    const navigate = useNavigate()
    const removePost = ()=>{
        if(action){
            disptach(action(actionParam))
        }
    }

    useEffect(()=>{

        if(isSuccess && !Object.keys(post).length){
            navigate("/")
            toast.success("delete post successfuly")
        } 

    }, [isLoading, isSuccess, isError])
    console.log("open", open)

    return ReactDom.createPortal(
        <div 
        className={`modal fade`} 
        id={modelId || "staticBackdrop"}
        data-bs-backdrop="static" 
        data-bs-keyboard="false"
        tabIndex="-1" 
        aria-labelledby="staticBackdropLabel"
        aria-hidden={open? false: true}
        aria-modal={open? true: false}
        // role={open? "dialog": "none"}
        role= "dialog"
        style={{display: `${open? "block": "none"}`, backgroundColor: "rgb(55 55 55 / 0.5)"}}
        >
            <div className="modal-dialog">
                <div className="modal-content rounded-0">
                    <div className="modal-header">
                        {title && <h5 className="modal-title" id="staticBackdropLabel">{title}</h5>}
                        <button 
                        type="button" 
                        // onClick={(e)=> setOpen(!open)}
                        className="btn-close" 
                        data-bs-dismiss="modal" 
                        aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {children}
                    </div>
                    <div className="modal-footer">
                        <button 
                        type="button" 
                        className="btn btn-secondary" 
                        data-bs-dismiss="modal"
                        >
                            close
                        </button>
                        <button 
                        type="button" 
                        onClick={removePost}
                        className="btn btn-primary">
                            {actionText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        ,
        document.getElementById("portal")
    )
}

export default Modal