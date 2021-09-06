import React from "react"
import ChannelCard from "../components/ChannelCard"
import Settings from "../components/Settings"

export default function ChannelsList({ channels }) {
    return (
        <>
            <Settings />
            <div className="wrapper">
                <div className="radio-title">
                    <div className="ellipse"></div>
                    <h1 className="radio-name">
                        <img className="radio-logo" src="https://www.pycolore.fr/assets/img/sunflower-dark-min.jpg" alt="Sunflower logo" />
                        Radio Pycolore
                    </h1>
                </div>
                <div className="channels-list-container">
                    <h2>En ce moment sur les chaînes</h2>

                    <ul className="channel-cards">
                        {Object.entries(channels).map(([key, channel]) => (
                            <li key={key}>
                                <ChannelCard channel={channel} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}
