import React, { useRef } from "react"
import { useRipple } from "../hooks";
import { Link } from "react-router-dom";

export default function Card({channel}) {

    const broadcast = channel.currentStep.broadcast
    const nextBroadcast = channel.nextStep.broadcast

    const element = useRef(null)
    const ripple = useRipple(element)

    return <Link to={channel.endpoint}>
        <div ref={element} href="#" className="button card" onClick={ripple}>
            <div className="thumbnail"><img src={channel.currentStep.broadcast.thumbnailSrc}/></div>
            <div className="info">
                <div className="channel-name">{channel.name}</div>
                <div className="show-title">
                    <span className="badge badge--inverted badge--large-only" >En direct</span> {broadcast.showTitle.toUpperCase()} <em>sur {broadcast.station.name}</em>
                </div>
                <div className="title"><strong>{broadcast.title}</strong></div>
                <div className="next-title">
                    <span className="badge badge--inverted">À suivre</span> {nextBroadcast.showTitle.toUpperCase()} <em>sur {nextBroadcast.station.name}</em>
                </div>
            </div>
        </div>
    </Link>
}
