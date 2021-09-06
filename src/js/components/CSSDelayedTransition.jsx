import React, { Fragment, useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";


export default function CSSDelayedTransition({timeout, transitionType, delay, component}) {
    const [show, setShow] = useState(false)
    const [childrenToRender, setChildrenToRender] = useState(<Fragment/>)

    useEffect(() => {
        if (component == childrenToRender) return
        const ti = setTimeout(() => {
            setShow(false)
            setTimeout(() => {
                setChildrenToRender(component)
                setShow(true)
            }, show ? timeout : 0)
        }, delay)
        return () => clearTimeout(ti)
    }, [component])

    return <CSSTransition
        in={show}
        appear
        timeout={timeout}
        classNames={transitionType}
    >
        {childrenToRender}
    </CSSTransition>
}
