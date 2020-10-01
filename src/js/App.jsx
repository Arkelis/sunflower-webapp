import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import 'regenerator-runtime/runtime'

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
    const [loading, setLoading] = useState(true)

    const apiHost = "https://api.radio.pycolore.fr"
    // const apiHost = "http://192.168.1.52:8000"

    useEffect(() => {
        for (let endpoint of channelEndpoints) {
            const es = new EventSource(`${apiHost}/channels/${endpoint}/events/`)
            es.onmessage = async (message) => {
                console.log(endpoint, message.data)
                if (message.data === "unchanged") return
                const newChannelData = { ...channelData }
                const currentStep = await getChannelStep(endpoint, "current")
                const nextStep = await getChannelStep(endpoint, "next")
                newChannelData[endpoint].currentStep = currentStep
                newChannelData[endpoint].nextStep = nextStep
                setChannelData(newChannelData)
            }
        }
    }, [channelEndpoints])

    useEffect(() => {
        fetchChannelData()
    }, [])

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

    console.log("Render App.")
    if (loading) return "Chargement"
    return <>
        <Router>
            <Switch>
                <Route exact path="/">
                    <ChannelsList channels={channelData} setPlayerMode={setPlayerMode} />
                </Route>
                <Route exact path="/:name">
                    <OnAir channels={channelData} playingChannelName={onAirChannel.endpoint} setOnAirChannel={setOnAirChannel} setPlayerMode={setPlayerMode} />
                </Route>
                <Route exact path="/:name/schedule">
                    <Schedule setPlayerMode={setPlayerMode} />
                </Route>
                <Route path="/pycolore/playlist">
                    <PycolorePlaylist apiHost={apiHost}/>
                </Route>
                <Route path="*">
                    <Redirect to="/"/>
                </Route>
            </Switch>
        </Router>
        {onAirChannel === "" ? "" : <Player mode={playerMode} channel={onAirChannel} />}
    </>
}
