import React from "react";

export default function Loader() {
    return (
        <div style={{position: "absolute", top: 0, left: 0, right: 0, bottom: 0, display: "grid", placeItems: "center"}}>
            <div style={{display: "flex", alignItems: "center", flexDirection: "column"}}>
                <div className="ring"></div>
                <h1>Radio Pycolore</h1>
            </div>
        </div>
    )
}
