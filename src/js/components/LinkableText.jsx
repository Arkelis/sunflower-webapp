import React from "react"

export default function LinkableText({href, className, isBlock, target, children}) {
    if (isBlock) {
        return <div className={className}>
        {
            href ?
            <a href={href} target={target} className="link">{children}</a> :
            <p>{children}</p>
        }
    </div>
    } else {
        return href ? 
            <a href={href} target={target} className={className + " link"}>{children}</a> :
            <p className={className}>{children}</p>
    }
}
