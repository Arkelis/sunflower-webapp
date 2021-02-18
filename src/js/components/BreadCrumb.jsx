import React from "react";

export default React.memo(function BreadCrumb({children}) {
    return <ol className="breadcrumb">{children}</ol>
})
