import React, { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import CSSDelayedTransition from "../components/CSSDelayedTransition"
import LinkButton from "../components/Button";
import LinkableText from "../components/LinkableText";
import { backButton, playButton, stopButton } from "../svg";

export default function OnAir({channels, playingChannelName, setOnAirChannel, setPlayerMode}) {
    //const [channel, setChannel] = useState("")
    const { name } = useParams()
    const channel = useMemo(() => channels[name], [name])
    const [isPlaying, setIsPlaying] = useState(playingChannelName === name)
    
    useEffect(function() {
        document.title = `Chaîne ${channel.name} | Radio Pycolore`
    })
    

    useEffect(function() {
        if (isPlaying === (playingChannelName === name)) return
        setIsPlaying(playingChannelName === name)
    }, [playingChannelName])
    
    const togglePlayStation = useCallback((isPlaying) => {
        const channelToSet = isPlaying ? "" : channel
        console.log("channelToSet", channelToSet)
        setOnAirChannel(channelToSet)
        setIsPlaying(!isPlaying)
    }, [])

    if (!channel) return <Fragment/>
    const currentBroadcast = channel.currentStep.broadcast
    const nextBroadcast = channel.nextStep.broadcast
    const nextStepStart = new Date(channel.nextStep.start * 1000)
    return <div className="wrapper channel-player-container">
        <Link to="/">
            <h2 className="button button--text">
                <button className="go-back">{backButton}</button>
                Chaîne {channel.name}</h2>
        </Link>
        <div className="current-broadcast-info-container">
            <div className="current-broadcast-thumbnail-container">
                <img className="current-broadcast-thumbnail" src={currentBroadcast.thumbnail_src} alt={`${currentBroadcast.title} thumbnail`}/>
                <div className={"play-channel-button-container " + (isPlaying ? "" : "force-visible")}>
                    <button onClick={() => togglePlayStation(isPlaying)} className="play-channel-button">
                        {
                            isPlaying ?
                            <>{stopButton} Arrêter</> :
                            <>{playButton} Écouter</>
                        }
                    </button>
                    {/* <button className="full-screen-button">
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="expand" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M0 180V56c0-13.3 10.7-24 24-24h124c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H64v84c0 6.6-5.4 12-12 12H12c-6.6 0-12-5.4-12-12zM288 44v40c0 6.6 5.4 12 12 12h84v84c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12V56c0-13.3-10.7-24-24-24H300c-6.6 0-12 5.4-12 12zm148 276h-40c-6.6 0-12 5.4-12 12v84h-84c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h124c13.3 0 24-10.7 24-24V332c0-6.6-5.4-12-12-12zM160 468v-40c0-6.6-5.4-12-12-12H64v-84c0-6.6-5.4-12-12-12H12c-6.6 0-12 5.4-12 12v124c0 13.3 10.7 24 24 24h124c6.6 0 12-5.4 12-12z"></path></svg> Plein écran
                    </button> */}
                </div>
            </div>
            <div className="main-info">
                {/* <CSSDelayedTransition
                    timeout={500}
                    transitionType="fadeup"
                    delay={0}
                    component={}
                /> */}
                <LinkableText target="_blank" isBlock={true} href={currentBroadcast.show_link} className="current-broadcast-show">{currentBroadcast.show_title}</LinkableText>
                {/* <CSSDelayedTransition
                    timeout={500}
                    transitionType="fadeup"
                    delay={100}
                    component={
                    
                    }
                /> */}
                <div className="current-broadcast-station">
                    {currentBroadcast.parent_show_title ? <>dans <LinkableText target="_blank" href={currentBroadcast.parent_show_link}>{currentBroadcast.parent_show_title}</LinkableText> </> : ""}
                    {currentBroadcast.show_title ? "sur " : "Vous écoutez " }<LinkableText target="_blank" href={currentBroadcast.station.website}>{currentBroadcast.station.name}</LinkableText>
                </div>
                {/* <CSSDelayedTransition
                    timeout={500}
                    transitionType="fadeup"
                    delay={200}
                    component={}
                /> */}
                <LinkableText target="_blank" isBlock={true} href={currentBroadcast.link} className="current-broadcast-title">{currentBroadcast.title}</LinkableText>
                <p className="current-broadcast-summary">{currentBroadcast.summary}</p>
            </div>
        </div>
        <div className="channel-info-container">
            <div className="next-broadcast"><strong>À suivre à {new Intl.NumberFormat('fr-FR', {minimumIntegerDigits: 2}).format(nextStepStart.getHours())}&nbsp;h&nbsp;{new Intl.NumberFormat('fr-FR', {minimumIntegerDigits: 2}).format(nextStepStart.getMinutes())}&nbsp;: </strong>{nextBroadcast.show_title ? nextBroadcast.show_title : nextBroadcast.title} <em>sur {nextBroadcast.station.name}</em></div>
            {/* <LinkButton to={`/${channel.endpoint}/schedule`} className="go-to-schedule">Voir le programme</LinkButton> */}
        </div>
    </div>
}
