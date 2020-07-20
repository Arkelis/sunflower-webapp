import React from "react"

export default function Card({channel}) {

    const broadcast = channel.currentStep.broadcast

    return <a href="#" className="card">
        <div className="thumbnail"><img src={channel.currentStep.broadcast.thumbnailSrc}/></div>
        <div className="info">
            <div className="channel-name">{channel.name}</div>
            <div className="show-title">{broadcast.showTitle.toUpperCase()} <em>sur {broadcast.station.name}</em></div>
            <div><strong>{broadcast.title}</strong></div>
        </div>
    </a>
}
