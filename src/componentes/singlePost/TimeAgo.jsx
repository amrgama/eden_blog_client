import React from 'react'
import {formatDistanceToNow} from "date-fns"
const TimeAgo = ({date, extraClasses, style}) => {
  const timeAgo = formatDistanceToNow(new Date(date), {addSuffix: false})
  return (
    <span className={`date ${extraClasses? extraClasses : ""}`} style={style}>{timeAgo}</span>
  )
}

export default TimeAgo