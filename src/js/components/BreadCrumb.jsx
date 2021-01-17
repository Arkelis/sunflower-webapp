import React, { useRef } from "react";
import { useRipple } from "../hooks";
import { Link } from "react-router-dom";

export default React.memo(function BreadCrumb({children}) {
    return <ol className="breadcrumb">{children}</ol>
})
