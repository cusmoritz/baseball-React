import React, { useState } from "react";
import { Link } from "react-router-dom";
import { playerNameSearchAutoComplete } from "../api";
import { getPlayersByPosition } from "../api";

const Search = (props) => {

    const { setSinglePlayer } = props

    // our Search bar text and state
    const [search, setSearch] = useState("Search here")
    const [searchTerm, setSearchTerm] = useState("players");
    
    // useState for our players returned from API so we can map over them
    const [playerNames, setPlayerNames] = useState([])
    
    // if you click search it should do something but rn prints what you searched for
    const handleSearch = async (search) => {
        // we need to call the api for players of that position
        console.log('you searched for: ', search);
        await getPlayersByPosition(search).then(results => setPlayerNames(results))
    }

    // function that runs to the api for our search term
    const handleAutoComplete = (searchAuto) => {
        playerNameSearchAutoComplete(searchAuto).then((result) => setPlayerNames(result))
    }

    // our return where we map over the search term response 
    return (
        <form className="grid-container" onSubmit={(event) => {event.preventDefault(), handleSearch(search)}} >
            <label htmlFor="search-select"> Pick a search term:
                <select onChange={(event) => {setSearchTerm(event.target.value), setPlayerNames([]), setSearch("")}}>
                    <option defaultValue={"players"} >Players</option>
                    <option value={"teams"} >Teams</option>
                    <option value={"position"} >Position</option>
                </select>
            <input
                value={search}
                onChange={(event) => {
                    setSearch(event.target.value), handleAutoComplete(event.target.value) 
                }}
                onFocus={() => {setSearch(""), setPlayerNames([])}}
            />
            </label>
            <button type="sumbit">Submit search</button>

            {!playerNames ? null : (
                playerNames.map((eachPlayer) => {
                    // console.log('each players name: ', eachPlayer.name_display_first_last)
                    return (
                        <div className="search-result-container">
                            <p className="search-results" 
                                onClick={() => {
                                    setSearch("");
                                    setPlayerNames([]);
                                    setSinglePlayer(eachPlayer.player_id)}}>
                                <Link to={`/players/${eachPlayer.player_id}`}>{eachPlayer.name_display_first_last}</Link></p>
                        </div>
                    )
                })
            )}

        </form>

    )
}

export default Search