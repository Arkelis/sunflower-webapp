import React, { useContext, useRef, useState, useEffect, useMemo } from "react"
import { stopButton, playButton, volumeButton, muteButton } from "../svg"
import { formatTime } from "../utils"
import { useToggle } from "../hooks"
import PlayerContext from "../context/PlayerContext";

export default function Player() {
    const audioElement = useRef(null)
    const { isPlaying: play, togglePlay, onAirChannel: channel} = useContext(PlayerContext);
    const [isMuted, toggleMuted] = useToggle(false)
    const [volume, setVolume] = useState(parseFloat(localStorage.getItem("sunflowerradio__volume")) || 1)
    const currentBroadcast = channel.currentStep.broadcast
    const displayProgressBar = channel.currentStep.end !== 0
    const audioStreamUrl = useMemo(
        () => play ? channel.audio_stream + `?t=${Date.now()}`: "",
        [play, channel.endpoint]
    )

    useEffect(() => {
        if (play) {
            audioElement.current.play()
            document.querySelector("#app").classList.add("app--player-visible")
        } else {
            audioElement.current.load()
        }
    }, [play])

    useEffect(() => {
        localStorage.setItem('sunflowerradio__volume', volume)
        if (audioElement.current) audioElement.current.volume = volume
    }, [volume])

    useEffect(() => {
        audioElement.current.muted = isMuted
    }, [isMuted])

    useEffect(() => {
        if (play) audioElement.current.play()
    }, [channel.endpoint])


    return <div className="player">
        <div className="player__controls">
            <button onClick={togglePlay} className="play-button">
                { play ? stopButton : playButton}
            </button>
            <div className="volume-controls">
                <button onClick={toggleMuted} className={isMuted ? "icon-mute" : "icon-volume"}>
                    { isMuted ? muteButton : volumeButton}
                </button>
                <input type="range" min="0" max="1" step="0.01" value={volume} onChange={(e) => setVolume(e.target.value)} className="volume-slider"/>
            </div>
        </div>
        <div className="player-info">
            <div className="text-info">
                <div className="player-info__channel-show"><strong>{channel.name} : </strong>{currentBroadcast.show_title.toUpperCase()} <em>{currentBroadcast.show_title ? "sur " : ""} {currentBroadcast.station.name}</em></div>
                <div className="player-info__title"><strong>{currentBroadcast.title}</strong></div>
            </div>
            {
                displayProgressBar ?
                <div className="player-info__progress-bar">
                    <div className="start">{formatTime(channel.currentStep.start)}</div>
                    <div className="progress" />
                    <div className="end">{formatTime(channel.currentStep.end)}</div>
                </div> :
                ""
            }
        </div>
        <audio ref={audioElement} src={audioStreamUrl} preload="none" />
    </div>
}
