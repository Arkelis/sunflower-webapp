import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import BreadCrumb from "../components/BreadCrumb"
import ScheduleCard from "../components/ScheduleCard"
import { capitalize } from "../utils"

export default function Schedule() {
    const { name } = useParams()
    const [schedule, setSchedule] = useState([])
    useEffect(() => {
        document.title = `Programme de la chaîne ${name} | Radio Pycolore`
    }, [])

    const apiHost = "https://api.radio.pycolore.fr"

    useEffect(() => {
        const fetchSchedule = async () => {
            const resp = await fetch(`${apiHost}/channels/${name}/schedule/`)
            const json = await resp.json()
            setSchedule(json)
        }
        fetchSchedule()
    }, [])

    const list = []
    schedule.forEach((step, i) => {
        list.push(<li key={i}><ScheduleCard step={step}/></li>)
    })

    return <div className="wrapper">
        <BreadCrumb>
            <li><Link to="/" className="link">Radio Pycolore</Link></li>
            <li><Link to={`/${name}`} className="link">Chaîne {capitalize(name)}</Link></li>
            <li>Programme du jour</li>
        </BreadCrumb>
        <div className="schedule-container">
            <h2>Programme de la chaîne {capitalize(name)}</h2>
            <ul className="timeline">
                {list}
            </ul>
        </div>
    </div>
}
