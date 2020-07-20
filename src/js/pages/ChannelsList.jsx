import React, { useState, useEffect } from "react"
import Card from "../components/Card";

export default function ChannelsList() {
    const channels = [
        {
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
                    summary:"",
                    parentShowTitle:"",
                    parentShowLink:""
                }
            }
        },
        {
            name: "Musique",
            endpoint: "musique",
            audioStream: "https://iecast.pycolore.fr/musique",
            currentStep: {
                start: 1595243714,
                end: 1595243940,
                broadcast: {
                    title: "L'été des grosses têtes du 20 juillet 2020",
                    type:"Programme",
                    station:{
                        name:"RTL",
                        website:"https://www.rtl.fr"
                    },
                    thumbnailSrc:"https://cdn-media.rtl.fr/online/image/2020/0716/7800673863_les-grosses-te-tes.jpg",
                    showTitle:"Les Grosses Têtes",
                    showLink:"https://www.rtl.fr/emission/les-grosses-tetes",
                    summary:"",
                    parentShowTitle:"",
                    parentShowLink:""
                }
            }
        }
    ]

    const cards = []
    channels.forEach((channel) => {
        cards.push(<li key={channel.endpoint}><Card channel={channel}/></li>)
    })

    console.log('render')

    return <div>
        <div className="radio-title">
            <div className="ellipse"></div>
            <h1 className="radio-name">Radio Pycolore</h1>
        </div>
        <h2>En ce moment sur les chaînes</h2>
        {cards}
    </div>
}
