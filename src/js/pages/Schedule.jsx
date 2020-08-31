import React, { useEffect } from "react"

export default function Schedule({setPlayerMode}) {
    useEffect(() => {
        setPlayerMode("normal")
        document.title = "Programme de la chaîne ... | Radio Pycolore"
    }, [])
    return "Under construction."
}
