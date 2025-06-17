import React, { useRef, useState } from 'react'
import followerImg from "../../../../assets/images/person_1.jpg.webp"
import FollowingCard from './FollowingCard'
import AsideList from '../aside-list/AsideList'
import AsideListSearch from '../aside-list/AsideListSearch'
import { useEffect } from 'react'

const Following = ({user, following}) => {
    const [searchResult, setSearchResult]= useState([]);
    const [isEmptyQuery, setIsEmptyQuery]= useState(true);
    const followingRef = useRef(following);
    if(isEmptyQuery){
        followingRef.current= following
    }
    else{
        followingRef.current= searchResult
    }

    // console.log("followingRef.current", followingRef.current)
    const renderedFollowingCards= followingRef.current.map((user, i)=>{
        return (
            <React.Fragment key={i}>
                <FollowingCard user={user} />
                { i !== (followingRef.current.length - 1) && <hr className='m-0 bg-dark border-bottom border-dark' />}
            </React.Fragment>
        )
    })
    console.log("isEmpty", isEmptyQuery);
    // useEffect(()=>{

    // }, [isEmptyQuery]);
  return (
    <AsideList title={"Following"}>
        <AsideListSearch searchParams={{searchIn: "following", accountId: user._id}} setIsEmpty={setIsEmptyQuery} getSearchResult={setSearchResult} />
        <div className='overflow-auto' style={{maxHeight: "300px"}}>
            {
                (!!followingRef.current.length)?
                    <>
                        {renderedFollowingCards}
                    </>
                :
                    <div className="py-1 text-center text-muted fw-500">
                        {
                            (!!!searchResult.length && isEmptyQuery)?
                                "There is no following users"
                            :
                                "There is not matched users"
                        }
                    </div>
            }
        </div>
    </AsideList>
  )
}

export default Following