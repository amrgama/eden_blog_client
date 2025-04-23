import React from 'react'
import SkeletonUserSetting from './SkeletonUserSetting'
import SkeletonImage from '../SkeletonImage'

const SkeletonUserInfo = ({isMyAccount}) => {
  return (
    <section className='user-info'>
        <div className="container p-0 px-lg-2" style={{maxWidth: "800px"}}>
            <span className='d-block' style={{width: "80px", height:"80px"}}></span>
            <div className='position-relative'>
                <div 
                    className="p-2 bg-white rounded-circle border border-2 border-dark box-shadow-sm"
                    style={{position: "absolute", left: "50%", transform: "translateX(-50%)", bottom: "calc(100% - 1.5rem)", zIndex: 1}}
                >
                    <div
                        style={{width: "80px", height:"80px"}} 
                    >
                        <SkeletonImage extraClasses={"overflow-hidden rounded-circle"} />
                    </div>
                </div>
                <div 
                    className="px-4 py-5 d-flex flex-column flex-wrap align-items-center justify-content-center gap-3 bg-white position-relative"
                >
                    <div className='w-100 d-flex flex-column align-items-center'>
                        <span className="col-6 col-md-4 col-xl-3 fw-bold fs-5 text-primary text-capitalize placeholder-glow">
                            <span className="col-12 placeholder"></span>
                        </span>
                        <span className="col-4 col-md-3 col-xl-2 fs-8 text-secondary placeholder-glow">
                            <span className="col-12 placeholder"></span>
                        </span>
                    </div>
                    <span className="col-3 fs-6 text-dark placeholder-glow">
                        <span className="col-12 placeholder"></span>
                    </span>
                    <p 
                        className="col-12 text-center text-secondary placeholder-glow"
                        style={{maxWidth: "500px"}}
                    >
                        <span className="col-10 placeholder"></span>
                        <span className="col-7 placeholder"></span>
                    </p>
                    <div className="col-12 d-flex align-items-center justify-content-center gap-3">
                        <span className="d-flex align-items-center justify-content-center border border-3 border-dark placeholder-glow" 
                        style={{width: "50px", height: "45px"}}>
                            <span className='col-12 h-100 d-block fs-1 text-dark placeholder'></span>
                        </span>
                        <span className="d-flex align-items-center justify-content-center border border-3 border-dark placeholder-glow" 
                        style={{width: "50px", height: "45px"}}>
                            <span className='col-12 h-100 d-block fs-1 text-dark placeholder'></span>
                        </span>
                        <span className="d-flex align-items-center justify-content-center border border-3 border-dark placeholder-glow" 
                        style={{width: "50px", height: "45px"}}>
                            <span className='col-12 h-100 d-block fs-1 text-dark placeholder'></span>
                        </span>
                    </div>
                </div>
                <div 
                    className="w-100 d-flex align-items-center justify-content-center gap-3 position-absolute start-0 top-100 bg-dange"
                    style={{height: "35px", transform: "translateY(-17px)"}}
                >
                    {
                        (isMyAccount)?
                            <>
                                <button 
                                    className="normalize-btn rounded-0 bg-white placeholder-glow"
                                    style={{width: "110px", height: "35px"}}
                                >
                                    <span className="col-12 h-100 d-block fs-5 text-dark placeholder" /> 
                                </button>
                                <button 
                                    className="normalize-btn rounded-0 bg-white placeholder-glow"
                                    style={{width: "35px", height: "35px"}}
                                >
                                    <span className="col-12 h-100 d-block fs-5 text-dark placeholder" /> 
                                </button>
                            </>
                        :
                            <button 
                                className="normalize-btn rounded-0 bg-white placeholder-glow"
                                style={{width: "110px", height: "35px"}}
                            >
                                <span className="col-12 h-100 d-block fs-5 text-dark placeholder" /> 
                            </button>
                    }
                </div>
                {/* <SkeletonUserSetting /> */}
            </div>
        </div>
    </section>
  )
}

export default SkeletonUserInfo