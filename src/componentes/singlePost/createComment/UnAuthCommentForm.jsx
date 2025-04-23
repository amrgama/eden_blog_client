import React, {useState} from 'react'
import { AnimatePresence, motion } from 'framer-motion';

const UnAuthCommentForm = () => {
    const [active, setActive] = useState(false)
    
    return (
        <form className='form py-3' onSubmit={e => e.preventDefault()}>  
            <textarea name="comment" id="comment" className='w-100 p-3 mb-4 secondary-font-family border border-3 border-dark box-shadow-sm text-dark' 
            style={{height: "150px", background: "transparent", resize: "none"}}></textarea>
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
                <div className="col">
                    <input type="text" className='w-100 px-3 py-2 bg-secondary border-0 text-white' style={{minWidth: "250px"}}
                    placeholder='your name'/>
                </div>
                <div className="col">
                    <input type="email" className='w-100 px-3 py-2 bg-secondary border-0 text-white' style={{minWidth: "250px"}}
                    placeholder='your email'/>
                </div>
                <div className="col">
                    <input type="text" className='w-100 px-3 py-2 bg-secondary border-0 text-white' style={{minWidth: "250px"}}
                    placeholder='your website'/>
                </div>
            </div>
            <button type='submit' className="px-3 py-2 rounded-0 border border-3 border-dark bg-primary text-white">
                Post Comment
            </button>
        </form>
    )
}

export default UnAuthCommentForm