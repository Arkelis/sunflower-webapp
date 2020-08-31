import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import LinkButton from "../components/Button";
import LinkableText from "../components/LinkableText";
import { ChannelContext } from "../App";

export default function OnAir({channels, setChannel, setPlayerMode}) {
    
    const { name } = useParams()
    const [channel, setOnAirChannel] = useState("")
    const channelFromProps = channels[name]

    useEffect(() => {
        document.title = "Chaîne " + channel.name + " | Radio Pycolore"
    })
    
    useEffect(function() {
        setPlayerMode("simple")
        setChannel(channelFromProps)
        setOnAirChannel(channelFromProps)
    }, [channels])
    
    if (!channel) return ""
    const currentBroadcast = channel.currentStep.broadcast
    const nextBroadcast = channel.nextStep.broadcast
    console.log("Render OnAir")
    return <div className="channel-player-container">
        <Link to="/">
            <h2><img className="left-arrow" src="/arrow-left-solid.svg"/> Vous écoutez {currentBroadcast.station.name}</h2>
        </Link>
        <div className="current-broadcast-info-container">
            <img className="current-broadcast-thumbnail" src={currentBroadcast.thumbnail_src} alt={`${currentBroadcast.title} thumbnail`}/>
            <div className="main-info">
                <LinkableText target="_blank" isBlock={true} href={currentBroadcast.show_link} className="current-broadcast-show">{currentBroadcast.show_title}</LinkableText>
                <LinkableText target="_blank" isBlock={true} href={currentBroadcast.link} className="current-broadcast-title">{currentBroadcast.title}</LinkableText>
                <p className="current-broadcast-summary">{currentBroadcast.summary}</p>
            </div>
        </div>
        <div className="channel-info-container">
            <h3 className="channel-title">Chaîne {channel.name}</h3>
            <div className="next-broadcast"><strong>À suivre : </strong>{(nextBroadcast.show_title ? nextBroadcast.show_title : nextBroadcast.title).toUpperCase()} <em>sur {nextBroadcast.station.name}</em></div>
            <LinkButton to={`/${channel.endpoint}/schedule`} className="go-to-schedule">Voir le programme</LinkButton>
        </div>
    </div>
}
