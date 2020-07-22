import React, { useRef } from "react";
import { useRipple } from "../hooks";
import { Link } from "react-router-dom";

export default function LinkButton({to, className, children}) {
    const element = useRef(null)
    const ripple = useRipple(element)

    return <Link to={to} className={className} ref={element} onClick={ripple}>
        <span className="badge button">{children}</span>
    </Link>
}
