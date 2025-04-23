import React from 'react'
import LinkButton from './LinkButton'
import SecondaryTitle from './SecondaryTitle'

const categories= [
    "english", 
    "travel",
    "technology", 
    "cooking",
    "spaces"
]

const CategoriesLinks = ({label, matchWith}) => {
    // console.log("matchWith", matchWith)
    const rederedCategoriesItems = categories.map((category, i)=>{
        let matchedCategory = null;

        if(matchWith){
            // console.log("matchWith: ", matchWith);
            matchedCategory = matchWith.some(item =>{
                return item === category;
            })
        }
        return(
            <LinkButton
                key={i}
                link={`/blog?category=${category}`}
                text={category}
                isActive={matchedCategory}
                extraClasses={`strike strike-w-50 text-dark bg-white p-2 ${false? "active strike-w-50": ""}`}
            />
        )
    })

  return (
    <div className='row gap-3 gutter-x-0'>
        <SecondaryTitle title={label} extraClasses={"justify-content-center"} />
        <div className='d-flex flex-wrap align-items-center justify-content-center gap-3'>
            {rederedCategoriesItems}
        </div>
    </div>
  )
}

export default CategoriesLinks