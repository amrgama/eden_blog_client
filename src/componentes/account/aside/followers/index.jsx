import React, { useRef, useState } from 'react'
import followerImg from "../../../../assets/images/person_1.jpg.webp"
import FollowerCard from './FollowerCard'
import AsideList from '../aside-list/AsideList'
import AsideListSearch from '../aside-list/AsideListSearch'

const Followers = ({user, followers}) => {
    const [searchResult, setSearchResult]= useState([]);
    const [isEmptyQuery, setIsEmptyQuery]= useState(true);
    const followersRef = useRef(followers);
    console.log("searchResult", searchResult, "isEmptyQuery", isEmptyQuery)
    if(isEmptyQuery){
        followersRef.current= followers
    }
    else{
        followersRef.current= searchResult;
    }
    
    const renderedFollowerCards= followersRef.current.map((follower, i)=>{
        return (
            <React.Fragment key={i}>
                <FollowerCard follower={follower} />
                { i !== (followersRef.current.length - 1) && <hr className='m-0 bg-dark border-bottom border-dark' />}
            </React.Fragment>
        )
    })

    return (
        <AsideList title={"Followers"}>
            <AsideListSearch searchParams={{searchIn: "followers", accountId: user._id}} setIsEmpty={setIsEmptyQuery} getSearchResult={setSearchResult} />
            <div className='overflow-auto' style={{maxHeight: "300px"}}>
                {
                    (!!followersRef.current.length)?
                        <>
                            {renderedFollowerCards}
                        </>
                    :
                        <div className="py-1 text-center text-muted fw-500">
                            {
                                (!!!searchResult.length && isEmptyQuery)?
                                    "There is not followers"
                                :
                                    "There is not matched users"
                            }
                        </div>
                }
            </div>
        </AsideList>
    )
}

export default Followers