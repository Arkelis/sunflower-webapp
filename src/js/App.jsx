import React, { useEffect, useState } from "react"
import { Redirect, Route, Switch } from "react-router-dom"
import 'regenerator-runtime/runtime'

import ChannelsList from "./pages/ChannelsList";
import OnAir from "./pages/OnAir";
import Schedule from "./pages/Schedule";
import Player from "./components/Player"
import PycolorePlaylist from "./pages/PycolorePlaylist";
import Loader from "./components/Loader";
import API from "./api.js";
import PlayerContext from "./PlayerContext.js";
import { useToggle } from "./hooks";
import ThemeContext from "./context/ThemeContext"
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
        theme == "dark" ?  root.classList.add("dark") : root.classList.add("light")
    }, [])

    useEffect(() => {
        if (channelEndpoints.length == 0) return
        const es = new EventSource(process.env.REACT_APP_API_ENTRYPOINT + '/events')
        es.onmessage = async (message) => {
            const data = JSON.parse(message.data)
            const endpoint = data.channel
            const newChannelData = {...channelData}
            console.log(channelData)
            const currentStep = await API.getChannelStep(endpoint, "current")
            const nextStep = await API.getChannelStep(endpoint, "next")
            newChannelData[endpoint].currentStep = currentStep
            newChannelData[endpoint].nextStep = nextStep
            setChannelData(newChannelData)
        }
        es.onerror = (err) => console.log(err)
    }, [channelEndpoints])


    const fetchChannelData = async () => {
        const resp = await fetch(`${process.env.REACT_APP_API_ENTRYPOINT}/channels/`)
        const json = await resp.json()
        const endpoints = []
        for (let endpoint in json) endpoints.push(endpoint)
        let newChannelData = {}
        for (let endpoint of endpoints) {
            const channelInfo = await API.getChannelInfo(endpoint)
            const currentStep = await API.getChannelStep(endpoint, "current")
            const nextStep = await API.getChannelStep(endpoint, "next")
            newChannelData[endpoint] = {
                ...channelInfo,
                currentStep: currentStep,
                nextStep: nextStep
            }
        }
        setChannelData(newChannelData)
        setChannelEndpoints(endpoints)
        setLoading(false)
    }

    if (loading) return <Loader/>
    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            <PlayerContext.Provider value={{isPlaying, togglePlay, onAirChannel, setOnAirChannel}}>
                <Switch>
                    <Route exact path="/">
                        <ChannelsList channels={channelData}/>
                    </Route>
                    <Route
                        exact path="/:name"
                        render={({match}) => {
                            if (channelEndpoints.includes(match.params.name)) {
                                return <OnAir channels={channelData} playingChannelName={onAirChannel.endpoint}/>
                            } else
                                return <Redirect to="/"/>
                        }}
                    />
                    <Route
                        exact path="/:name/schedule"
                        render={({match}) => {
                            console.log(channelEndpoints)
                            if (channelEndpoints.includes(match.params.name))
                                return <Schedule/>
                            else
                                return <Redirect to="/"/>
                        }}
                    />
                    <Route exact path="/pages/playlist-pycolore">
                        <PycolorePlaylist/>
                    </Route>
                    <Route>
                        <Redirect to="/"/>
                    </Route>
                </Switch>
                {/* render the player if radio is on */}
                {onAirChannel === "" ? "" : <Player />}
            </PlayerContext.Provider>
        </ThemeContext.Provider>
    )
}
