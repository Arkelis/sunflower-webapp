import React, { useEffect, useState } from "react"
import cog from "../../css/svg/cog.svg"
import { useToggle } from "../hooks"
import { check } from "../svg"

export default function Settings() {
    const [visible, toggleVisible] = useToggle(false)
    const [fadeClass, setFadeClass] = useState("m-fadeOut")

    const deletePreferences = () => {
        localStorage.clear()
        // show check button for a few seconds
        setFadeClass("m-fadeIn")
        setTimeout(function () {
            setFadeClass("m-fadeOut")
        }, 1200)
    }

    return (
        <>
            <img className="settings-icon" src={cog} alt="settings" onClick={toggleVisible} />

            {visible && (
                <div id="settings-box">
                    <div className="popupCloseButton" onClick={toggleVisible}>
                        &times;
                    </div>
                    <h4>Paramètres</h4>
                    <p>Ce site conserve seulement vos préférences (thème et volume) dans le local storage </p>
                    <div className="delete-block">
                        <button className="settings-delete" onClick={deletePreferences}>
                            Supprimer
                        </button>
                        <span id="check-icon" className={fadeClass}>
                            {check}
                        </span>
                    </div>
                </div>
            )}
        </>
    )
}
