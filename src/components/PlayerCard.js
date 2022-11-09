import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getIndividualPlayer } from "../api";
import { getPlayerHittingStats } from "../api";
import { getIndividualPitchingStats } from "../api";
import { getIndividualSeasonStats } from "../api";

const PlayerCard = (props) => {

    // get singlePlayer from useState in index.js
    const { singlePlayer } = props

    // get our token if we are logged in
    const { token } = props

    // pull the player id from the URL
    const switcher = useParams();

    // sets our player object
    const [ourPlayer, setOurPlayer] = useState({});

    // gets the players batting stats
    const [careerBattingStats, setCareerBattingStats] = useState({});

    // sets state for pitching stats
    const [pitchingStats, setPitchingStats] = useState({});

    // get individual season stats
    const [season, setSeason] = useState("");

    const [seasonSearch, setSeasonSearch] = useState("")

    // only runs the playerFetch on load and when the page changes
    useEffect(() => {

        handlePlayerfetch(switcher.switcher)
        setPitchingStats()
        setCareerBattingStats()

    }, [switcher.switcher])

    // handles the api call with the id from the url
    const handlePlayerfetch = async (id) => {
        const battingStats = await getPlayerHittingStats(id)
        setCareerBattingStats(battingStats)
        // console.log('batting stats in handlePlayer', battingStats)
        const justOnePlayer = await getIndividualPlayer(id)
        setOurPlayer(justOnePlayer);
        // console.log('ourplayer initially should be empty?', ourPlayer)
        console.log('justOnePlayer', justOnePlayer)

        // run the pitching stats api call if they are a pitcher
        if (justOnePlayer.primary_position == "1") {
            await getIndividualPitchingStats(id).then(results => setPitchingStats(results))
            console.log('pitching stats', pitchingStats)
        }
    }

    const handleSelector = (playerId, season) => {
        // this is where we would get our season batting stats
        console.log('season we are searching', season)
        getIndividualSeasonStats(playerId, season).then(results => setCareerBattingStats(results))
    }

    // our return with our baseball players stats and a button to add to a team
    return (
        <div className="player-card">
            <div className="personal-stats">
                <h3>Stats for {ourPlayer.name_display_first_last}:</h3>
                <p>Born in {ourPlayer.birth_date}</p>
                <p>Went to highschool at {ourPlayer.high_school}</p>
                
            </div>
            <div className="baseball-stats">
                <h5>Professional stats:</h5>
                <p>Currently plays for the {ourPlayer.team_name}</p>
                <p>Throws {ourPlayer.throws}</p>
                <p>Bats {ourPlayer.bats}</p>
                <p>Primary position {ourPlayer.primary_position_txt}</p>
                {!careerBattingStats ? null : (
                    <div className="batting-stats">
                        <h5> Batting stats for 
                            <select className="batting-select" onChange={(event) => {
                            setSeason(event.target.value)
                            }}>
                                <option defaultValue={"career"}>Regular season career</option>
                                <option value={"season"}>Season</option>
                                <option>World Series</option>
                            </select>
                        </h5>
                        
                        {season !== "season" ? null : (
                            <form onSubmit={(event) => (event.preventDefault(), handleSelector(ourPlayer.player_id, seasonSearch))}>
                                <input 
                                    placeholder="type season to load"
                                    value={seasonSearch} 
                                    onChange={(event) => setSeasonSearch(event.target.value)}/>
                                    <button type="submit">Submit</button>
                            </form>
                        )}
                        
                        <p>Career homers: {careerBattingStats.hr}</p>
                        <p>Career at bats: {careerBattingStats.ab}</p>
                        <p>Career slugging percentage: {careerBattingStats.slg}</p>
                        <p>Career RBIs: {careerBattingStats.rbi}</p>
                        <p>Career hits: {careerBattingStats.h}, triples: {careerBattingStats.t}, doubles: {careerBattingStats.d}</p>
                    </div>
                )}
                {!pitchingStats ? null : (
                    <div className="pitching-stats">
                        <h5>Career pitching stats</h5>
                        <p>ERA: {pitchingStats.era}</p>
                        <p>WHIP: {pitchingStats.whip}</p>
                        <p>Average strikeouts per 9 innings: {pitchingStats.k9}</p>
                    </div>
                )}
                
            </div>
            {token ? (<button>Add player to team</button>) : null}
            
        </div>
    )
}

export default PlayerCard