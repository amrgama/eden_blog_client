import React from 'react'
import {formatDistanceToNow} from "date-fns"
const TimeAgo = ({date, extraClasses}) => {
  const timeAgo = formatDistanceToNow(new Date(date), {addSuffix: true})
  return (
    <span className={`date text-muted ${extraClasses? extraClasses : ""}`}>{timeAgo}</span>
  )
}

export default TimeAgo