import React, { useContext, useCallback, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import LinkButton from "../components/LinkButton";
import LinkableText from "../components/LinkableText";
import { playButton, stopButton } from "../svg";
import BreadCrumb from "../components/BreadCrumb";
import Button from "../components/Button";
import PlayerContext from "../context/PlayerContext";
import { formatTime } from "../utils";

export default function OnAir({ channels }) {
    const { name } = useParams()
    const channel = channels[name]
    const { isPlaying: isPlayingGlobally, togglePlay, onAirChannel, setOnAirChannel } = useContext(PlayerContext);
    const playingChannelName = onAirChannel.endpoint

    // use the global context to check if we are playing this channel
    const [isPlaying, setIsPlaying] = useState(onAirChannel.endpoint === name)

    useEffect(() => {
        document.title = `Chaîne ${channel.name} | Radio Pycolore`
    })

    // update local state 'isPlaying' if music is stopped with the player
    useEffect(() => {
        if (!isPlayingGlobally) {
            setIsPlaying(false)
        }
        if (isPlayingGlobally && (onAirChannel.endpoint === name)) {
            setIsPlaying(true)
        }
    },  [isPlayingGlobally])

    useEffect(() => {
        if (isPlaying === (playingChannelName === name)) return
        setIsPlaying(playingChannelName === name)
    }, [playingChannelName])

    const togglePlayStation = useCallback((isPlaying) => {
        // if we stop the radio => onAirChannel = "" and  the player is removed
        const channelToSet = isPlaying ? "" : channel
        setOnAirChannel(channelToSet)
        setIsPlaying(!isPlaying)
        // if player on pause force playing
        if (!isPlayingGlobally) {
            togglePlay()
        }
        // we remove the padding if playing is stopped
        if (isPlaying)  {
            document.querySelector("#app").classList.remove("app--player-visible")
        }
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
                        <Button onClick={() => togglePlayStation(isPlaying)} className="play-channel-button">
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
