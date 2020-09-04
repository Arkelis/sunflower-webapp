import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import LinkButton from "../components/Button";
import LinkableText from "../components/LinkableText";

export default function OnAir({channels, playingChannelName, setOnAirChannel, setPlayerMode}) {
    const [channel, setChannel] = useState("")
    const { name } = useParams()
    const channelFromProps = channels[name]
    const [isPlaying, setIsPlaying] = useState(playingChannelName === name)
    
    useEffect(() => {
        document.title = `Chaîne ${channel.name} | Radio Pycolore`
    })
    
    useEffect(function() {
        setChannel(channelFromProps)
    }, [channels])

    useEffect(function() {
        if (isPlaying === (playingChannelName === name)) return
        setIsPlaying(playingChannelName === name)
    }, [playingChannelName])
    
    const togglePlayStation = () => {
        const channelToSet = isPlaying ? "" : channelFromProps
        setOnAirChannel(channelToSet)
        setIsPlaying(!isPlaying)
    }
    
    if (!channel) return ""
    const currentBroadcast = channel.currentStep.broadcast
    const nextBroadcast = channel.nextStep.broadcast
    console.log("Render OnAir")
    console.log("State: ", isPlaying, channel)
    return <div className="channel-player-container">
        <Link to="/">
            <h2 className="button button--text"><img className="left-arrow" src="/arrow-left-solid.svg"/>Chaîne {channel.name}</h2>
        </Link>
        <div className="current-broadcast-info-container">
            <div className="current-broadcast-thumbnail-container">
                <img className="current-broadcast-thumbnail" src={currentBroadcast.thumbnail_src} alt={`${currentBroadcast.title} thumbnail`}/>
                <div className={"play-channel-button-container " + (isPlaying ? "" : "force-visible")}>
                    <button onClick={togglePlayStation} className="play-channel-button">
                        {
                            isPlaying ?
                            <><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="stop" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48z"></path></svg> Arrêter</> :
                            <><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="play" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path></svg> Écouter</>
                        }
                    </button>
                    {/* <button className="full-screen-button">
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="expand" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M0 180V56c0-13.3 10.7-24 24-24h124c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H64v84c0 6.6-5.4 12-12 12H12c-6.6 0-12-5.4-12-12zM288 44v40c0 6.6 5.4 12 12 12h84v84c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12V56c0-13.3-10.7-24-24-24H300c-6.6 0-12 5.4-12 12zm148 276h-40c-6.6 0-12 5.4-12 12v84h-84c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h124c13.3 0 24-10.7 24-24V332c0-6.6-5.4-12-12-12zM160 468v-40c0-6.6-5.4-12-12-12H64v-84c0-6.6-5.4-12-12-12H12c-6.6 0-12 5.4-12 12v124c0 13.3 10.7 24 24 24h124c6.6 0 12-5.4 12-12z"></path></svg> Plein écran
                    </button> */}
                </div>
            </div>
            <div className="main-info">
                <LinkableText target="_blank" isBlock={true} href={currentBroadcast.show_link} className="current-broadcast-show">{currentBroadcast.show_title}</LinkableText>
                <div className="current-broadcast-station">
                    {currentBroadcast.show_title ? "sur " : "Vous écoutez " }<LinkableText target="_blank" href={currentBroadcast.station.website}>{currentBroadcast.station.name}</LinkableText>
                </div>
                <LinkableText target="_blank" isBlock={true} href={currentBroadcast.link} className="current-broadcast-title">{currentBroadcast.title}</LinkableText>
                <p className="current-broadcast-summary">{currentBroadcast.summary}</p>
            </div>
        </div>
        <div className="channel-info-container">
            <div className="next-broadcast"><strong>À suivre : </strong>{(nextBroadcast.show_title ? nextBroadcast.show_title : nextBroadcast.title).toUpperCase()} <em>sur {nextBroadcast.station.name}</em></div>
            <LinkButton to={`/${channel.endpoint}/schedule`} className="go-to-schedule">Voir le programme</LinkButton>
        </div>
    </div>
}
