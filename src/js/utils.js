import React from "react"

export function capitalize(string) {
     return string[0].toUpperCase() + string.substring(1)
}

export function formatTime(timestamp) {
     const date = new Date(timestamp * 1000)
     return <>
          {new Intl.NumberFormat('fr-FR', { minimumIntegerDigits: 2 }).format(date.getHours())}
          &nbsp;h&nbsp;
          {new Intl.NumberFormat('fr-FR', { minimumIntegerDigits: 2 }).format(date.getMinutes())}
     </>
}
