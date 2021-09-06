import "../css/index.scss"
import React, { useEffect, useState } from "react"
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom"
import "regenerator-runtime/runtime"

import ChannelsList from "./pages/ChannelsList"
import OnAir from "./pages/OnAir"
import Schedule from "./pages/Schedule"
import Player from "./components/Player"
import PycolorePlaylist from "./pages/PycolorePlaylist"
import Loader from "./components/Loader"
import API from "./api.js"
import { useToggle } from "./hooks"
import PlayerContext from "./context/PlayerContext"
import ThemeContext from "./context/ThemeContext"
import ThemeSwitcher from "./components/ThemeSwitcher";
import getLocalTheme from "./theme.js"

export default function App() {
    const [onAirChannel, setOnAirChannel] = useState("")
    const [channelData, setChannelData] = useState({})
    const [channelEndpoints, setChannelEndpoints] = useState([])
    const [loading, setLoading] = useState(true)
    const [isPlaying, togglePlay] = useToggle(false)
    const [theme, setTheme] = useState(getLocalTheme())

    useEffect(() => {
        fetchChannelData()

        let root = document.getElementsByTagName("html")[0]
        theme === "dark" ? root.classList.add("dark") : root.classList.add("light")
    }, [])

    useEffect(() => {
        if (channelEndpoints.length === 0) return
        const es = new EventSource(process.env.REACT_APP_API_ENTRYPOINT + "/events")
        es.onmessage = async (message) => {
            const data = JSON.parse(message.data)
            const endpoint = data.channel
            const newChannelData = { ...channelData }
            const channelSteps = await API.getChannelSteps(endpoint)
            newChannelData[endpoint].currentStep = channelSteps.current_step
            newChannelData[endpoint].nextStep = channelSteps.next_step
            setChannelData(newChannelData)
        }
        es.onerror = (err) => console.log(err)
    }, [channelEndpoints, channelData])

    const fetchChannelData = async () => {
        const resp = await fetch(`${process.env.REACT_APP_API_ENTRYPOINT}/channels/`)
        const channelsData = await resp.json()
        const endpoints = []
        let newChannelData = {}
        for (let channel of channelsData) {
            endpoints.push(channel.id)
            newChannelData[channel.id] = {
                endpoint: channel.id,
                currentStep: channel.current_step,
                nextStep: channel.next_step,
                name: channel.name,
                schedule: channel.schedule,
                audio_stream: channel.audio_stream
            }
        }
        setChannelData(newChannelData)
        setChannelEndpoints(endpoints)
        setLoading(false)
    }

    if (loading) return <Loader />
    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <PlayerContext.Provider value={{ isPlaying, togglePlay, onAirChannel, setOnAirChannel }}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/">
                            <ChannelsList channels={channelData} />
                        </Route>
                        <Route
                            exact
                            path="/:name"
                            render={({ match }) => {
                                if (channelEndpoints.includes(match.params.name)) {
                                    return <OnAir channels={channelData} playingChannelName={onAirChannel.endpoint} />
                                } else return <Redirect to="/" />
                            }}
                        />
                        <Route
                            exact
                            path="/:name/schedule"
                            render={({ match }) => {
                                if (channelEndpoints.includes(match.params.name)) return <Schedule />
                                else return <Redirect to="/" />
                            }}
                        />
                        <Route exact path="/pages/playlist-pycolore">
                            <PycolorePlaylist />
                        </Route>
                        <Route>
                            <Redirect to="/" />
                        </Route>
                    </Switch>
                </BrowserRouter>

                <ThemeSwitcher />
                {/* render the player if radio is on */}
                {onAirChannel !== "" && <Player />}
            </PlayerContext.Provider>
        </ThemeContext.Provider>
    )
}
