import React from 'react'
import LinkButton from './LinkButton'
import SecondaryTitle from './SecondaryTitle'
const tags= [
    "technology", 
    "travel",
    "technology", 
    "cooking", 
    "food",
    "cars",
    "js",
    "node.js",
    "programming",
    "c#",
    "php"
]

const TagsLinks = ({label, matchWith}) => {
    const rederedTagsItems = tags.map((tag, i)=>{
        let matchedTag = null;

        if(matchWith){
            // console.log("matchWith: ", matchWith);
            matchedTag = matchWith.some(item =>{
                return item === tag;
            })
        }
        return(
            <LinkButton
                key={i}
                link={`/blog?tag=${tag}`}
                text={tag}
                extraClasses={`strike text-dark bg-white p-2 ${matchedTag? "active strike-w-50": ""}`}
            />
        )
    })

  return (
    <div className='row gap-3 gutter-x-0'>
        <SecondaryTitle title={label} extraClasses={"justify-content-center"} />
        <div className='d-flex flex-wrap align-items-center justify-content-center gap-3'>
            {rederedTagsItems}
        </div>
    </div>
  )
}

export default TagsLinks