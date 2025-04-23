import {AnimatePresence, motion} from "framer-motion"
import {MdError} from "react-icons/md"

const ErrorMsg = ({ message, extraClasses }) => {
    const Classes = extraClasses? extraClasses: "";
    return (
        <motion.p
            className={`d-flex align-items-center gap-1 px-2 m-0 font-bold text-danger ${Classes}`}
            // {...framerError}
            initial= {{ opacity: 0, y: 10 }}
            animate= {{ opacity: 1, y: 0 }}
            exit={{opacity: 0, y:10}}
            transition={{duration: 0.2}}
        >
            <MdError />
            {message}
        </motion.p>
    )
  }

  export default ErrorMsg