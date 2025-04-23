import {useState} from "react"
import {CiMenuKebab} from "react-icons/ci";
import { AnimatePresence, motion } from 'framer-motion'
import Edit from "./Edit";
import Delete from "./Delete";

const PostTools = ()=>{
    const [show, setShow] = useState(false);
    // const [activeEdit, setActiveEdit] = useState(false);
    // const [activeDelete, setActiveDelete] = useState(false);

    function handleOnClick(){
        setShow(prev => !prev)
    }

    return(
        <div className="dropdown-wrapper position-relative">
            <button
                onClick={handleOnClick}
                className="normalize-btn d-flex text-primary dropdonw-btn mb-1"
            >
                <CiMenuKebab className="fs-5" />
            </button>
            <AnimatePresence mode="await" initial="false">
                {   show &&
                    <motion.div
                        initial={{opacity: 0, translateY: "0%"}}
                        animate={{opacity: 1, translateY: "0%"}}
                        exit={{opacity: 0, translateY: "0%" }}
                        className="dropdown bg-white position-absolute top-100"
                        style={{left: `-25px`, boxShadow: "2px 2px black", border: "2px solid black"}}
                    >
                        <ul className="navbar-nav">
                            <Edit />
                            <hr className='m-0 p-0 lh-1'/>
                            <Delete />
                        </ul>
                    </motion.div>
                }
            </AnimatePresence>
        </div>
    )
}

export default PostTools;