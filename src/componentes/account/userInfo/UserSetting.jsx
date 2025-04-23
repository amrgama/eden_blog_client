import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'
import {RiUserSettingsLine, RiUserSettingsFill} from "react-icons/ri"
import UserSettingModal from '../../modal/UserSettingModal';
import AccountEditForm from './accountEditeForm/AccountEditForm';

const UserSetting = () => {
    const [active, setActive] = useState(false);
    const modelId = "staticBackdrop2"

    const handleClick = e=> {
        setActive(!active)
    }

  return (
    <div
        className='border border-1 border-dark shadow-very-sm'
    >
        <button 
            onClick={handleClick}
            className="normalize-btn rounded-0 bg-white"
            style={{width: "35px", height: "35px"}}
            data-toggle="modal"
            data-target={"#" + modelId}
        >
            <AnimatePresence mode="await" initial="false">
                { 
                    !active && 
                    <motion.span
                        initial={{originX: "center"}}
                        whileHover={{scale: 1.2, originX: "center"}}
                        exit={{visibility: "hidden", position: "absolute"}}
                        className="w-100 h-100 d-flex flex-wrap align-items-center justify-content-center"
                    >
                        <RiUserSettingsLine className="fs-5 text-dark" />
                    </motion.span>
                }
            </AnimatePresence>
            
            <AnimatePresence mode="await" initial="false">
            { 
                active && 
                <motion.span
                    initial={{originX: "center"}}
                    animate={{scale: 1.22}}
                    exit={{visibility: "hidden", position: "absolute"}}
                    transition={{duration: "0.2s", type: "spring", stiffness: "2000"}}
                    className="w-100 h-100 d-flex flex-wrap align-items-center justify-content-center"
                >
                    <RiUserSettingsFill className="fs-5 text-primary" />
                </motion.span>
            }
          </AnimatePresence>           
        </button>
        {
            active &&
            <UserSettingModal show={active} setshow={setActive} modelId={modelId}>
                <AccountEditForm />
            </UserSettingModal>
        }
    </div>
  )
}

export default UserSetting