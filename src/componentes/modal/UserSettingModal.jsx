import React, { useEffect, useRef } from 'react'
import ReactDom from 'react-dom';
import { useDispatch, useSelector } from 'react-redux'
import VisibleModal from './VisibleModal';
import HiddenModal from './HiddenModal';
import { selectPost } from '../../features/post/postSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const UserSettingModal = ({modelId, show, setshow, children}) => {
    const modalRef = useRef();
    function closeModal(e){
        setshow(false);
    }

    useEffect(()=>{
        modalRef.current?.classList?.add("show")
    },)

    return ReactDom.createPortal(
        <div
            ref={modalRef}
            className={`modal fade`} 
            id={modelId || "staticBackdrop"}
            data-bs-backdrop="static" 
            data-bs-keyboard="false"
            tabIndex="-1" 
            aria-labelledby="staticBackdropLabel"
            aria-hidden={show? false: true}
            aria-modal={show? true: false}
            role= "dialog"
            style={{display: `${show? "block": "none"}`, backgroundColor: "rgb(55 55 55 / 0.5)"}}
        >
            <div className="modal-dialog my-5 d-flex align-items-center justify-content-center my-0">
                <div className="modal-content rounded-0">
                    <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel">{"Account Setting"}</h5>
                    <button 
                        type="button" 
                        onClick={closeModal}
                        className="btn-close" 
                        data-bs-dismiss="modal" 
                        aria-label="Close">
                    </button>
                    </div>
                    <div className="modal-body">
                        {children}
                    </div>
                    <div className="modal-footer">
                        <button 
                            type="button" 
                            className="w-100 btn btn-secondary rounded-pill fs-5" 
                            data-bs-dismiss="modal"
                            style={{minHeight: "50px"}}
                        >
                            decline
                        </button>
                    </div>
                </div>
            </div>
        </div>
        ,
        document.getElementById("portal")
    )
}

export default UserSettingModal