import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import 'regenerator-runtime/runtime'
import { useLocation } from "react-router-dom";

import ChannelsList from "./pages/ChannelsList";
import OnAir from "./pages/OnAir";
import Schedule from "./pages/Schedule";
import Player from "./components/Player"
import PycolorePlaylist from "./pages/PycolorePlaylist";
import { CSSTransition, TransitionGroup } from "react-transition-group";


export default function App() {
    const [onAirChannel, setOnAirChannel] = useState("")
    const [channelData, setChannelData] = useState({})
    const [channelEndpoints, setChannelEndpoints] = useState([])
    const currentLoc = useLocation()
    const isPage = currentLoc.pathname.startsWith("/pages") || currentLoc.pathname.endsWith("schedule")
    const [loading, setLoading] = useState(true)
    const apiHost = "https://api.radio.pycolore.fr"
    // const apiHost = "http://192.168.1.52:8000"

    useEffect(() => {
        fetchChannelData()
    }, [])

    useEffect(() => {
        if (channelEndpoints.length == 0) return
        const es = new EventSource(`${apiHost}/events`)
        es.onmessage = async (message) => {
            const data = JSON.parse(message.data)
            const endpoint = data.channel
            const newChannelData = { ...channelData }
            console.log(channelData)
            const currentStep = await getChannelStep(endpoint, "current")
            const nextStep = await getChannelStep(endpoint, "next")
            newChannelData[endpoint].currentStep = currentStep
            newChannelData[endpoint].nextStep = nextStep
            setChannelData(newChannelData)
        }
        es.onerror = (err) => console.log(err)
    }, [channelEndpoints])


    const fetchChannelData = async () => {
        const resp = await fetch(`${apiHost}/channels/`)
        const json = await resp.json()
        const endpoints = []
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
        setChannelEndpoints(endpoints)
        setLoading(false)
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

    if (loading) return <div style={{position: "absolute", top: 0, left: 0, right: 0, bottom: 0, display: "grid", placeItems: "center"}}>
        <h1>Radio Pycolore</h1>
    </div>
    return <>
        <Switch location={currentLoc}>
            <Route exact path="/">
                <ChannelsList channels={channelData}/>
            </Route>
            <Route 
                exact path="/:name"
                render={({ match }) => {
                    if (channelEndpoints.includes(match.params.name)) {
                        return <OnAir channels={channelData} playingChannelName={onAirChannel.endpoint} setOnAirChannel={setOnAirChannel}/>
                    } else
                        return <Redirect to="/"/>
                }}
            />
            <Route 
                exact path="/:name/schedule"
                render={({ match }) => {
                    if (channelEndpoints.includes(match.params.name))
                        return <Schedule/>
                    else
                        return <Redirect to="/"/>
                }}
            />
            <Route exact path="/pages/playlist-pycolore">
                <PycolorePlaylist apiHost={apiHost}/>
            </Route>
            <Route>
                <Redirect to="/"/>
            </Route>
        </Switch>
        {onAirChannel === "" ? "" : <Player channel={onAirChannel} />}
    </>
}
