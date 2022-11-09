import React, { useState } from "react";

const baseURL = `http://lookup-service-prod.mlb.com/json/named.search_player_all.bam?sport_code='mlb'&active_sw='Y'`

// /json/named.player_info.bam?sport_code='mlb'&player_id={player_id}



// &name_part='${encoded}%25'

export const playerNameSearchAutoComplete = async (value) => {

    try{
        // encode URI removes spaces and the like from our search bar
        const encoded = encodeURIComponent(value)

        const fetching = await fetch(`${baseURL}&name_part='${encoded}%25'`)
        const playerSearch = await fetching.json();
        // console.log('calling up... ', playerSearch)
        const newPlayerName = playerSearch.search_player_all.queryResults.row
        console.log('calling up... ', newPlayerName)

        // if (newPlayerName.typeOf() == array) {
        //     return newPlayerName
        // } else {
        //     return newPlayerName
        // }

        return newPlayerName;

    } catch (error) {
        console.error('there was an error searching: ', error)
    }
}

export const getIndividualPlayer = async (playerId) => {
    const response = await fetch(`http://lookup-service-prod.mlb.com/json/named.player_info.bam?sport_code='mlb'&player_id=${playerId}`).then(result => result.json())
    // console.log('response in api fetch: ', response)
    return response.player_info.queryResults.row

}

export const getIndividualSeasonStats = async (playerId, season) => {
    try {
        const response = await fetch(`http://lookup-service-prod.mlb.com/json/named.sport_hitting_tm.bam?league_list_id='mlb'&game_type='R'&season=${season}&player_id=${playerId}`).then(result => result.json())
        console.log('season stats', response)
        return response.sport_hitting_tm.queryResults.row
    } catch (error) {
        console.log('there was an error fetching season stats: ', error)
    }
}

export const getPlayerHittingStats = async (playerId) => {
    try {
        const response = await fetch(`http://lookup-service-prod.mlb.com/json/named.sport_career_hitting.bam?league_list_id='mlb'&game_type='R'&player_id=${playerId}`).then(result => result.json())

        // console.log('hitting stats in api', response.sport_career_hitting.queryResults.row)
    
        return response.sport_career_hitting.queryResults.row;
    } catch (error) {
        console.log('There was an error getting batting stats: ', error)
    }

}

export const getIndividualPitchingStats = async (playerId) => {
    try {
        const response = await fetch(`http://lookup-service-prod.mlb.com//json/named.sport_career_pitching.bam?league_list_id='mlb'&game_type='R'&player_id=${playerId}`).then(result => result.json())
        // console.log('pitching api response', response.sport_career_pitching.queryResults.row)
        return response.sport_career_pitching.queryResults.row
    } catch (error) {
        console.error('there was a problem getting pitching stats: ', error)
    }
}

export const getPlayersByPosition = async (positionId) => {
    try {
        const response = await fetch(`http://lookup-service-prod.mlb.com/json/named.search_player_all.bam?sport_code='mlb'&active_sw='Y'&name_part='${positionId}%25'`)
        .then(result => result.json());
        const playersByPosition = response.search_player_all.queryResults.row;
        console.log('playersByPosition', playersByPosition)

        // map through players and return ones who match the searched position Id
        const playerArray = []
        playersByPosition.map((eachplayer) => {
            if (eachplayer.position.toLowerCase() === positionId) {
                playerArray.push(eachplayer)
            }
        })
        console.log('playerArray in api', playerArray)
        return playerArray;
    } catch (error) {
        console.log('there was a problem fetching position players: ', error)
    }
}