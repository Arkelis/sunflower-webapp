import React, { useEffect, useState } from "react"
import 'regenerator-runtime/runtime'

export default function PycolorePlaylist({apiHost}) {

    const [playlist, setPlaylist] = useState([])

    useEffect(() => {
        async function fetchPlaylist() {
            console.log("coucou")
            const resp = await fetch(`${apiHost}/stations/pycolore/playlist/?shape=groupartist`)
            const json = await resp.json()
            setPlaylist(json)
        }
        fetchPlaylist()
    }, [])

    const formattedPlaylist = formatPlaylist(playlist)

    function formatPlaylist(playlist) {
        const groups = []
        for (let artist in playlist) {
            const songs = playlist[artist]
            const size = songs.length
            const songsRows = []
            for (let i = 1; i < size; i++) {
                songsRows.push(
                    <tr>
                        <td>{songs[i].title}</td>
                        <td>{songs[i].album}</td>
                    </tr>
                )
            }
            groups.push(
                <>
                    {/* <tr className="artist-row">
                        <td></td>
                        <td colSpan='2' className='artist-cell'>{artist}</td>
                    </tr> */}
                    <tr>
                        <th className="artist-th" rowSpan={size} scope="rowgroup">{artist}</th>
                        <td>{songs[0].title}</td>
                        <td>{songs[0].album}</td>
                    </tr>
                    {songsRows}
                </>
            )
        }
        return groups
    }

    return <>
        <h2>Playlist Pycolore</h2>
        <div id="playlist-wrapper">
            <table>
                <colgroup>
                    <col span='1' id="artist-col"/>
                    <col span='1' id="title-col"/>
                    <col span='1' id="album-col"/>
                </colgroup>
                <thead>
                    <tr>
                        <th>Artiste</th>
                        <th>Titre</th>
                        <th>Album</th>
                    </tr>
                </thead>
                <tbody>
                    {formattedPlaylist}
                </tbody>
            </table>
        </div>
    </>
}
