import React, { useRef } from "react"
import { useRipple } from "../hooks";
import { Link } from "react-router-dom";
import { formatTime } from "../utils";

export default function ScheduleCard({step}) {

    const broadcast = step.broadcast
    //const element = useRef(null)
    //const ripple = useRipple(element)

    return (//<Link to={broadcast.link}>
        <div href="#" className="card card--schedule">
            <div className="thumbnail"><img src={broadcast.thumbnail_src}/></div>
            <div className="info">
                <span className="badge badge--inverted schedule">{formatTime(step.start)}</span>
                <div className="show-title">
                    {broadcast.show_title.toUpperCase()} <em>{broadcast.show_title ? "sur " : "" }{broadcast.station.name}</em>
                </div>
                <div className="title"><strong>{broadcast.title}</strong></div>
            </div>
        </div>
    )//</Link>
}
