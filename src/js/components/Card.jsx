import React from "react"

export default function Card({channel}) {

    const broadcast = channel.currentStep.broadcast
    const nextBroadcast = channel.nextStep.broadcast

    return <a href="#" className="card">
        <div className="thumbnail"><img src={channel.currentStep.broadcast.thumbnailSrc}/></div>
        <div className="info">
            <div className="channel-name">{channel.name}</div>
            <div className="show-title">
                <span className="badge badge--large-only" >En direct</span> {broadcast.showTitle.toUpperCase()} <em>sur {broadcast.station.name}</em>
            </div>
            <div className="title"><strong>{broadcast.title}</strong></div>
            <div className="next-title">
                <span className="badge">À suivre</span> {nextBroadcast.showTitle.toUpperCase()} <em>sur {nextBroadcast.station.name}</em>
            </div>
        </div>
    </a>
}
