import React from "react"
import { Link } from "react-router-dom";
import { formatTime } from "../utils";

export default function ScheduleCard({step}) {

    const broadcast = step.broadcast
    let link = "#"
    if (broadcast.title.includes("Pycolore")) {
        link = "/pages/playlist-pycolore"
    }
    
    return <Link to={link}>
        <div href={link} className="card card--schedule">
            <div className="thumbnail"><img src={broadcast.thumbnail_src} alt={broadcast.title +"_thumbnail"}/></div>
            <div className="info">
                <span className="badge badge--inverted schedule">{formatTime(step.start)}</span>
                <div className="show-title">
                    {broadcast.show_title.toUpperCase()} <em>{broadcast.show_title ? "sur " : "" }{broadcast.station.name}</em>
                </div>
                <div className="title"><strong>{broadcast.title}</strong></div>
            </div>
        </div>
    </Link>
}
