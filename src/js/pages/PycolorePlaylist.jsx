import React, { useEffect, useState } from "react"
import 'regenerator-runtime/runtime'

export default function PycolorePlaylist({apiHost}) {

    const [playlist, setPlaylist] = useState([])
    const [filteredPlaylist, setFilteredPlaylist] = useState([])

    useEffect(() => {
        async function fetchPlaylist() {
            const resp = await fetch(`${apiHost}/stations/pycolore/playlist/?shape=groupartist`)
            const json = await resp.json()
            setPlaylist(json)
            setFilteredPlaylist(json)
        }
        fetchPlaylist()
    }, [])


    const filterPlaylist = event => {
        let input = event.target.value.toLowerCase();
        let copyPlaylist = Object.assign({}, playlist)
        Object.keys(copyPlaylist).forEach(key => {
            copyPlaylist[key] = filterArtist(copyPlaylist[key], input)
        });
        setFilteredPlaylist(copyPlaylist);
    }

    const filterArtist = (artistSongs, input) => {
        return artistSongs.filter(song => {
            return song.album.toLowerCase().includes(input) || song.title.toLowerCase().includes(input)
        })
    }

    const formattedPlaylist = formatPlaylist(filteredPlaylist)

    function formatPlaylist(playlist) {
        const groups = []
        for (let artist in playlist) {
            const songs = playlist[artist]
            const size = songs.length
            if (size == 0) continue;
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

        <input type="text" placeholder="Rechercher un titre ou un album..." onChange={filterPlaylist}/>
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
