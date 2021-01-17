import React, { useRef, useState, useCallback, useEffect, useMemo } from "react"
import { stopButton, playButton, volumeButton } from "../svg"
import { formatTime } from "../utils"

export default function Player({channel}) {
    const audioElement = useRef(null)
    const [play, setPlay] = useState(true)
    const [volume, setVolume] = useState(parseFloat(localStorage.getItem("radiopycolore__volume")) || 1)
    const currentBroadcast = channel.currentStep.broadcast
    const displayProgressBar = channel.currentStep.end !== 0
    const audioStreamUrl = useMemo(
        () => play ? channel.audio_stream + `?t=${Date.now()}`: "",
        [play, channel.endpoint]
    )
    useEffect(() => {
        if (play) {
            audioElement.current.play()
        } else {
            audioElement.current.load()
            //setTimestamp(Date.now())
        }
    }, [play])

    useEffect(() => {
        localStorage.setItem('radiopycolore__volume', volume)
        if (audioElement.current) audioElement.current.volume = volume
    }, [volume])

    useEffect(() => {
        if (play) audioElement.current.play()
    }, [channel.endpoint])

    const togglePlay = useCallback(() => setPlay(p => !p), [])

    return <div className="player">
        <div className="player__controls">
            <button onClick={togglePlay} className="play-button">
                { play ? stopButton : playButton}
            </button>
            <div className="volume-controls">
                <button className="icon-volume">{volumeButton}</button>
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
                    <div className="progress"></div>
                    <div className="end">{formatTime(channel.currentStep.end)}</div>
                </div> :
                ""

            }
        </div>
        <audio ref={audioElement} src={audioStreamUrl} preload="none"></audio>
    </div>
}
