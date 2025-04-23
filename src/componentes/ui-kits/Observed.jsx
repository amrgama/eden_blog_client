import React from 'react'

const Observed = ({reference, cb}) => {
  return (
    <>
      <div ref={reference} className='w-100 bg-danger'></div>
      {cb()}
    </>
  )
}

export default Observed