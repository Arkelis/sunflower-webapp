import React, { useEffect } from "react"
import Card from "../components/Card";
import ThemeSwitcher from "../components/ThemeSwitcher";

export default function ChannelsList({channels, setPlayerMode}) {
    useEffect(() => setPlayerMode("normal"), [])
    const cards = []
    for (let channel in channels) {
        cards.push(<li key={channel}><Card channel={channels[channel]}/></li>)
    }



    return <>
        <div className="radio-title">
            <div className="ellipse"></div>
            <h1 className="radio-name"><img className="radio-logo" src="https://www.pycolore.fr/assets/img/sunflower-dark-min.jpg" alt="Sunflower logo"/>Radio Pycolore</h1>
            <ThemeSwitcher />
        </div>
        <div className="channels-list-container">
            <h2>En ce moment sur les chaînes</h2>
            <ul className="channel-cards">
                {cards}
            </ul>
        </div>
    </>
}
