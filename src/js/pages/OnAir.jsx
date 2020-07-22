import React from "react";
import { useParams, Link } from "react-router-dom";
import LinkButton from "../components/Button";
import LinkableText from "../components/LinkableText";

export default function OnAir() {
    const { name } = useParams()

    const channel = {
        name: "Tournesol",
        endpoint: "tournesol",
        audioStream: "https://iecast.pycolore.fr/tournesol",
        currentStep: {
            start: 1595243714,
            end: 1595243940,
            broadcast: {
                title: "Le journal de 13h du lundi 20 juillet 2020",
                type:"Programme",
                station:{
                    name:"France Inter",
                    website:"https://www.franceinter.fr"
                },
                thumbnailSrc:"https://is2-ssl.mzstatic.com/image/thumb/Podcasts124/v4/5c/02/ba/5c02ba72-c182-fd14-d644-cf574e7a7a7e/mza_16729882287712886319.jpg/626x0w.jpg",
                link:"https://www.franceinter.fr/emissions/le-journal-de-13h/le-journal-de-13h-20-juillet-2020",
                showTitle:"Le journal de 13h",
                showLink:"https://www.franceinter.fr/emissions/le-journal-de-13h",
                summary:"Philippe Poutou, conseiller municipal de Bordeaux, est l'invité de Léa Salamé à 7h50. Etienne Klein, philosophe des Sciences, est l'invité du grand entretien de Nicolas Demorand et Léa Salamé à 8h20.",
                parentShowTitle:"",
                parentShowLink:"https://www.franceinter.fr/emissions/le-journal-de-13h"
            }
        },
        nextStep: {
            start: 1595243714,
            end: 1595243940,
            broadcast: {
                title: "Le journal de 13h du lundi 20 juillet 2020",
                type:"Programme",
                station:{
                    name:"France Inter",
                    website:"https://www.franceinter.fr"
                },
                thumbnailSrc:"https://is2-ssl.mzstatic.com/image/thumb/Podcasts124/v4/5c/02/ba/5c02ba72-c182-fd14-d644-cf574e7a7a7e/mza_16729882287712886319.jpg/626x0w.jpg",
                link:"https://www.franceinter.fr/emissions/le-journal-de-13h/le-journal-de-13h-20-juillet-2020",
                showTitle:"Le journal de 13h",
                showLink:"https://www.franceinter.fr/emissions/le-journal-de-13h",
                summary:"",
                parentShowTitle:"",
                parentShowLink:""
            }
        }
    }

    const currentBroadcast = channel.currentStep.broadcast
    const nextBroadcast = channel.nextStep.broadcast

    return <div className="channel-player-container">
        <Link to="/">
            <h2><img className="left-arrow" src="/arrow-left-solid.svg"/> Vous écoutez {currentBroadcast.station.name}</h2>
        </Link>
        <div className="current-broadcast-info-container">
            <img className="current-broadcast-thumbnail" src={currentBroadcast.thumbnailSrc} alt={`${currentBroadcast.title} thumbnail`}/>
            <div className="main-info">
                <LinkableText target="_blank" isBlock={true} href={currentBroadcast.showLink} className="current-broadcast-show">{currentBroadcast.showTitle}</LinkableText>
                <LinkableText target="_blank" isBlock={true} href={currentBroadcast.link} className="current-broadcast-title">{currentBroadcast.title}</LinkableText>
                <p className="current-broadcast-summary">{currentBroadcast.summary}</p>
            </div>
        </div>
        <div className="channel-info-container">
            <h3 className="channel-title">Chaîne {channel.name}</h3>
            <div className="next-broadcast"><strong>À suivre : </strong>{nextBroadcast.showTitle} <em>sur {nextBroadcast.station.name}</em></div>
            <LinkButton to={`/${channel.endpoint}/schedule`} className="go-to-schedule">Voir le programme</LinkButton>
        </div>
    </div>
}
