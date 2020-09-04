import React, { useRef, useState, useCallback, useEffect } from "react"

export default function Player({mode, channel}) {
    const audioElement = useRef(null)
    const [play, setPlay] = useState(true)
    const [volume, setVolume] = useState(1)
    if (audioElement.current) audioElement.current.volume = volume
    const currentBroadcast = channel.currentStep.broadcast
    const displayProgressBar = channel.currentStep.end !== 0
    const startDate = new Date(channel.currentStep.start * 1000)
    const endDate = new Date(channel.currentStep.end * 1000)

    useEffect(() => {
        if (play) {
            audioElement.current.play()
        } else {
            audioElement.current.pause()
        }
    }, [play])

    return <div className="player">
        <div className="player__controls">
            <button onClick={() => setPlay(!play)} className="play-button"><img src={play ? "/stop-solid.svg" : "/play-solid.svg"}/></button>
            <div className="volume-controls">
                <button>
                    <object type="image/svg+xml" data="/volume-up-solid.svg" className="icon--volume">
                        Volume controller
                    </object>
                </button>
                <input type="range" min="0" max="1" step="0.01" value={volume} onChange={(e) => setVolume(e.target.value)} className="volume-slider"/>
            </div>
        </div>
        <div className="player-info">
            {
                mode === "normal" ?
                <div className="text-info">
                    <div className="player-info__channel-show"><strong>{channel.name} : </strong>{currentBroadcast.show_title.toUpperCase()} <em>{currentBroadcast.show_title ? "sur " : ""} {currentBroadcast.station.name}</em></div>
                    <div className="player-info__title"><strong>{currentBroadcast.title}</strong></div>
                </div> :
                ""
            }
            {
                displayProgressBar ?
                <div className="player-info__progress-bar">
                    <div className="start">{new Intl.NumberFormat('fr-FR', {minimumIntegerDigits: 2}).format(startDate.getHours())}&nbsp;h&nbsp;{new Intl.NumberFormat('fr-FR', {minimumIntegerDigits: 2}).format(startDate.getMinutes())}</div>
                    <div className="progress"></div>
                    <div className="end">{new Intl.NumberFormat('fr-FR', {minimumIntegerDigits: 2}).format(endDate.getHours())}&nbsp;h&nbsp;{new Intl.NumberFormat('fr-FR', {minimumIntegerDigits: 2}).format(endDate.getMinutes())}</div>
                </div> :
                ""

            }
        </div>
        <audio ref={audioElement} src={channel.audio_stream}></audio>
    </div>
}
