import React, { useState } from 'react'
import { BsPersonFillSlash } from "react-icons/bs";
import ActionButton from '../../ui-kits/buttons/ActionButton';

const BlockButton = ({userId, isLoading=false, isDisabled=false, className}) => {
    const [active, setActive] = useState(false);

    const handleClick = e=> {
        setActive(!active)
    }

  return (
    <ActionButton
        cb={handleClick}
        icon={<BsPersonFillSlash className="fs-5" />}
        text={"remove"}
        extraClasses={className ?? ""}
        style={{height: "35px"}}
    />
  )
}

export default BlockButton