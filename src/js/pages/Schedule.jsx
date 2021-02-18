import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import BreadCrumb from "../components/BreadCrumb"
import ScheduleCard from "../components/ScheduleCard"
import Loader from "../components/Loader";
import { capitalize } from "../utils"
import API from "../api.js"

export default function Schedule() {
    const {name} = useParams()
    const [schedule, setSchedule] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchSchedule = async () => {
        const res = await API.getSchedule(name)
        setSchedule(res)
        setLoading(false)
    }

    useEffect(() => {
        document.title = `Programme de la chaîne ${name} | Radio Pycolore`
        fetchSchedule()
    }, [])

    if (loading) return <Loader/>
    return <div className="wrapper">
        <BreadCrumb>
            <li><Link to="/" className="link">Radio Pycolore</Link></li>
            <li><Link to={`/${name}`} className="link">Chaîne {capitalize(name)}</Link></li>
            <li>Programme du jour</li>
        </BreadCrumb>
        <div className="schedule-container">
            <h2>Programme de la chaîne {capitalize(name)}</h2>
            <ul className="timeline">
                {schedule.map((step, i) => {
                    return <li key={i}><ScheduleCard step={step}/></li>
                })}
            </ul>
        </div>
    </div>
}
