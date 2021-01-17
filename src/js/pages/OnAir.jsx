import React, { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import CSSDelayedTransition from "../components/CSSDelayedTransition"
import LinkButton from "../components/LinkButton";
import LinkableText from "../components/LinkableText";
import { backButton, playButton, stopButton } from "../svg";
import BreadCrumb from "../components/BreadCrumb";
import Button from "../components/Button";
import { formatTime } from "../utils";

export default function OnAir({ channels, playingChannelName, setOnAirChannel }) {
    const { name } = useParams()
    const channel = channels[name]
    const [isPlaying, setIsPlaying] = useState(playingChannelName === name)
    
    
    useEffect(function () {
        document.title = `Chaîne ${channel.name} | Radio Pycolore`
    })


    useEffect(function () {
        if (isPlaying === (playingChannelName === name)) return
        setIsPlaying(playingChannelName === name)
    }, [playingChannelName])

    const togglePlayStation = useCallback((isPlaying) => {
        const channelToSet = isPlaying ? "" : channel
        setOnAirChannel(channelToSet)
        setIsPlaying(!isPlaying)
    }, [])

    const currentBroadcast = channel.currentStep.broadcast
    const nextBroadcast = channel.nextStep.broadcast
    return <div className="wrapper">
        <BreadCrumb>
            <li><Link className="link" to="/">Radio Pycolore</Link></li>
            <li>Chaîne {channel.name}</li>
        </BreadCrumb>
        <div className="channel-player-container">
            <h2>Chaîne {channel.name}</h2>
            <div className="current-broadcast-info-container">
                <div className="current-broadcast-thumbnail-container">
                    <img className="current-broadcast-thumbnail" src={currentBroadcast.thumbnail_src} alt={`${currentBroadcast.title} thumbnail`} />
                    <div className={"play-channel-button-container " + (isPlaying ? "" : "force-visible")}>
                        <Button onClick={(event) => togglePlayStation(isPlaying)} className="play-channel-button">
                            {
                                isPlaying ?
                                    <>{stopButton} Arrêter</> :
                                    <>{playButton} Écouter</>
                            }
                        </Button>
                    </div>
                </div>
                <div className="main-info">
                    <LinkableText target="_blank" isBlock={true} href={currentBroadcast.show_link} className="current-broadcast-show">
                        {currentBroadcast.show_title}
                    </LinkableText>
                    <div className="current-broadcast-station">
                        {currentBroadcast.parent_show_title ? <>dans <LinkableText target="_blank" href={currentBroadcast.parent_show_link}>{currentBroadcast.parent_show_title}</LinkableText> </> : ""}
                        {currentBroadcast.show_title ? "sur " : "Vous écoutez "}<LinkableText target="_blank" href={currentBroadcast.station.website}>{currentBroadcast.station.name}</LinkableText>
                    </div>
                    <LinkableText target="_blank" isBlock={true} href={currentBroadcast.link} className="current-broadcast-title">{currentBroadcast.title}</LinkableText>
                    <p className="current-broadcast-summary">{currentBroadcast.summary}</p>
                </div>
            </div>
            <div className="channel-info-container">
                <div className="next-broadcast"><strong>À suivre à {formatTime(channel.nextStep.start)}&nbsp;: </strong>{nextBroadcast.show_title ? nextBroadcast.show_title : nextBroadcast.title} <em>sur {nextBroadcast.station.name}</em></div>
                <LinkButton to={`/${channel.endpoint}/schedule`} className="go-to-schedule">Voir le programme</LinkButton>
            </div>
        </div>
    </div>
}
