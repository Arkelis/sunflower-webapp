import { useCallback, useState } from "react"

const useRipple = (element) => useCallback(event => {
    const domElement = element.current
    const x = event.pageX - event.currentTarget.offsetLeft
    const y = event.pageY - event.currentTarget.offsetTop
    const circle = `circle at ${x}px ${y}px`
    
    const duration = 700
    let animationFrame, animationStart
    
    const animationStep = (timestamp) => {
        if (!animationStart) {
            animationStart = timestamp
        }
        
        const frame = timestamp - animationStart
        if (frame < duration) {
            const easing = (frame/duration) * (2 - (frame/duration))
            
            const color = `rgba(255, 255, 255, ${1 - easing})`
            const stop = `${100 * easing}%`
    
            domElement.style = `background-image: radial-gradient(${circle}, ${color} ${stop}, transparent ${stop})`
            animationFrame = window.requestAnimationFrame(animationStep)
        } else {
            domElement.style = "background-image: none"
            window.cancelAnimationFrame(animationFrame)
        }
    }
    animationFrame = window.requestAnimationFrame(animationStep)
}, [])

const useToggle =  (initialValue) => {
    const [value, setValue] = useState(initialValue)

    const toggle = () => {
        setValue(value => !value)
    }

    return [value, toggle]
}



export {
    useRipple,
    useToggle
}
