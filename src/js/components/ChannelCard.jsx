import React, { useRef } from "react"
import { useRipple } from "../hooks";
import { Link } from "react-router-dom";

export default function ChannelCard({channel}) {
    const broadcast = channel.currentStep.broadcast
    const nextBroadcast = channel.nextStep.broadcast

    const element = useRef(null)
    const ripple = useRipple(element)

    if (!channel.currentStep) {
        return "Impossible de retrouver les informations."
    }

    return <Link to={channel.endpoint}>
        <div ref={element} href="#" className="button card card--channel" onMouseDown={ripple}>
            <div className="thumbnail"><img src={channel.currentStep.broadcast.thumbnail_src} alt={channel.endpoint + "_thumbnail"}/></div>
            <div className="info">
                <div className="channel-name">{channel.name}</div>
                <div className="show-title">
                    <span className="badge badge--inverted badge--large-only" >En direct</span> {broadcast.show_title.toUpperCase()} <em>{broadcast.show_title ? "sur " : "" }{broadcast.station.name}</em>
                </div>
                <div className="title"><strong>{broadcast.title}</strong></div>
                <div className="next-title">
                    <span className="badge badge--inverted">À suivre</span> {nextBroadcast.show_title ? nextBroadcast.show_title : nextBroadcast.title} <em>sur {nextBroadcast.station.name}</em>
                </div>
            </div>
        </div>
    </Link>
}
