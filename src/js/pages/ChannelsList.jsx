import React from "react"
import ChannelCard from "../components/ChannelCard";

export default function ChannelsList({channels}) {
    const cards = []
    for (let channel in channels) {
        cards.push(<li key={channel}><ChannelCard channel={channels[channel]}/></li>)
    }

    
    return <div className="wrapper">
        <div className="radio-title">
            <div className="ellipse"></div>
            <h1 className="radio-name"><img className="radio-logo" src="https://www.pycolore.fr/assets/img/sunflower-dark-min.jpg" alt="Sunflower logo"/>Radio Pycolore</h1>
        </div>
        <div className="channels-list-container">
            <h2>En ce moment sur les chaînes</h2>
            <ul className="channel-cards">
                {cards}
            </ul>
        </div>
    </div>
}
