import React from "react"
import Player from "./components/Player"
import ChannelsList from "./pages/ChannelsList";
import OnAir from "./pages/OnAir";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

export default function App() {
    return  <Router>
        <Switch>
            <Route exact path="/" component={ChannelsList}/>
            <Route exact path="/:name" component={OnAir}/>
        </Switch>
    </Router>
}
