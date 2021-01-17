import React, { useRef } from "react";
import { useRipple } from "../hooks";
import { Link } from "react-router-dom";

export default function Button({className, onClick, children}) {
    const element = useRef(null)
    const ripple = useRipple(element)
    const handleClick = (event) => {
        ripple(event)
        onClick(event)
    }

    return <button ref={element} onClick={handleClick} className={className + " button"}>
        {children}
    </button>
}
