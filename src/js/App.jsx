import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import 'regenerator-runtime/runtime'
import { useLocation } from "react-router-dom";

import ChannelsList from "./pages/ChannelsList";
import OnAir from "./pages/OnAir";
import Schedule from "./pages/Schedule";
import Player from "./components/Player"
import PycolorePlaylist from "./pages/PycolorePlaylist";


export default function App() {

    const [onAirChannel, setOnAirChannel] = useState("")
    const [channelData, setChannelData] = useState({})
    const [channelEndpoints, setChannelEndpoints] = useState([])
    const [playerMode, setPlayerMode] = useState("normal") // normal / fullscreen
    const currentLoc = useLocation()
    const isPage = currentLoc.pathname.startsWith("/pages")
    const [loading, setLoading] = useState(!isPage)

    const apiHost = "https://api.radio.pycolore.fr"
    // const apiHost = "http://192.168.1.52:8000"

    useEffect(() => {
        if (channelEndpoints.length == 0) return
        const es = new EventSource(`${apiHost}/events`)
        es.onmessage = async (message) => {
            const data = JSON.parse(message.data)
            const endpoint = data.channel
            const newChannelData = { ...channelData }
            const currentStep = await getChannelStep(endpoint, "current")
            const nextStep = await getChannelStep(endpoint, "next")
            newChannelData[endpoint].currentStep = currentStep
            newChannelData[endpoint].nextStep = nextStep
            setChannelData(newChannelData)
        }
        es.onerror = (err) => console.log(err)
    }, [channelEndpoints])

    useEffect(() => {
        if (!isPage) fetchChannelData()
    }, [isPage])

    const fetchChannelData = async () => {
        const resp = await fetch(`${apiHost}/channels/`)
        const json = await resp.json()
        let endpoints = []
        for (let endpoint in json) endpoints.push(endpoint)
        let newChannelData = {}
        for (let endpoint of endpoints) {
            const channelInfo = await getChannelInfo(endpoint)
            const currentStep = await getChannelStep(endpoint, "current")
            const nextStep = await getChannelStep(endpoint, "next")
            newChannelData[endpoint] = {
                ...channelInfo,
                currentStep: currentStep,
                nextStep: nextStep
            }
        }
        setChannelData(newChannelData)
        setLoading(false)
        setChannelEndpoints(endpoints)
    }

    const getChannelStep = async (endpoint, stepType) => {
        const resp = await fetch(`${apiHost}/channels/${endpoint}/${stepType}/`)
        const json = await resp.json()
        return json
    }

    const getChannelInfo = async (endpoint) => {
        const resp = await fetch(`${apiHost}/channels/${endpoint}/`)
        const json = await resp.json()
        return { endpoint: endpoint, name: json.name, schedule: json.schedule, audio_stream: json.audio_stream }
    }
    console.log("Render App")

    if (loading) return "Chargement"
    return <>
        <Switch>
            <Route exact path="/">
                <ChannelsList channels={channelData} setPlayerMode={setPlayerMode} />
            </Route>
            <Route 
                exact path="/:name"
                render={({ match }) => {
                    if (channelEndpoints.includes(match.params.name))
                        return <OnAir channels={channelData} playingChannelName={onAirChannel.endpoint} setOnAirChannel={setOnAirChannel} setPlayerMode={setPlayerMode} />
                    else
                        return <Redirect to="/"/>
                }}
            />
            <Route 
                exact path="/:name/schedule"
                render={({ match }) => {
                    if (channelEndpoints.includes(match.params.name))
                        return <Schedule setPlayerMode={setPlayerMode}/>
                    else
                        return <Redirect to="/"/>
                }}
            />
            <Route exact path="/pages/pycolore-playlist">
                <PycolorePlaylist apiHost={apiHost}/>
            </Route>
            <Route>
                <Redirect to="/"/>
            </Route>
        </Switch>
        {onAirChannel === "" ? "" : <Player mode={playerMode} channel={onAirChannel} />}
    </>
}
