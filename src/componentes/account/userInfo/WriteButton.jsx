import React, { useState } from 'react'
import { BsPencil } from "react-icons/bs";
import LinkButton from '../../ui-kits/LinkButton';

const WriteButton = () => {
    const [active, setActive] = useState(false);

    const handleClick = e=> {
        setActive(!active)
    }

  return (
    <LinkButton
        link={"/write"}
        icon={<BsPencil />}
        text={"write"}
        extraClasses={"text-dark bg-white px-3"}
        style={{height: "35px"}}
    />
  )
}

export default WriteButton