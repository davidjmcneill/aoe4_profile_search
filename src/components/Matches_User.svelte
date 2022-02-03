<script>
    import { onMount } from 'svelte';
    import * as animateScroll from "svelte-scrollto";

    //data storage imports 
    import { match_type, search_id, player_colors, civs, maps } from '../stores.js';
    
    export let search_box = '';
    let matches = [];

    //function to fetch JSON data from AoE4 servers
    export const fetch_matches = async () => {
        const base_url = 'https://aoeiv.net/api/player/matches?game=aoe4&count=10';
        let url_modifier = '&profile_id='+$search_id;
        let url = base_url + url_modifier;
        
        const response = await fetch(url);
        matches = await response.json();
        console.log(matches);
    };
    //fetch default data (future: saved session ID?)
    onMount(fetch_matches);

    //format unix timestamp to datetime
    const DateFormatted = (UNIX_timestamp) => {
        return new Date(UNIX_timestamp * 1000).toLocaleString();
    }

    //copy profile ID to search box
    const copyProfileID = (newID) => {
        $search_id = newID.toString();
        animateScroll.scrollToTop();
        search_box.focus();
    }
</script>

<h3>Recent Matches</h3>
{#each matches as match (match.match_id)}
    <div class="match bg-secondary text-white">
        <div class="row align-items-center">
            <div class="col">
                
                <div class="team">
                    <h4>Team 1</h4>
                {#each match.players as player (player.profile_id)}
                    {#if player.team === 1}
                    <div class="player" on:click={copyProfileID(player.profile_id)} title="Click to view {player.name}'s profile">
                        <div class="col-sm">
                            <img class="flag_img" src="{$civs[1][player.civ]}" alt="{$civs[0][player.civ]} Flag" title="{$civs[0][player.civ]}"/> 
                        </div>
                        <div class="col-sm">
                            <span class="player_name" style="color:{$player_colors[0][player.slot]}">{player.name}</span>
                            <br/>
                            <span>Rating: {#if player.rating !== null}{player.rating}{:else}Not available{/if}</span>
                        </div>
                    </div>
                    {/if}
                {/each}
                </div>
            </div>
            <div class="col">
                <h4>{$match_type[0]["matches"][match.rating_type_id]}</h4>
                <div class="match_details">
                    <p>Date {DateFormatted(match.started)}</p>
                    <p>
                        <img class="map_img" src="{$maps[1][match.map_type]}" alt="{$maps[0][match.map_type]} Map" title="{$maps[0][match.map_type]} Map"/>
                        <br/>
                        <span><b><i>{$maps[0][match.map_type]}</i></b></span>
                    </p>
                    
                </div>
            </div>
            <div class="col">
                
                <div class="team">
                    <h4>Team 2</h4>
                {#each match.players as player (player.profile_id)}
                    {#if player.team === 2}
                    <div class="player" on:click={copyProfileID(player.profile_id)} title="Click to view {player.name}'s profile">
                        <div class="col-sm">
                            <img class="flag_img" src="{$civs[1][player.civ]}" alt="{$civs[0][player.civ]} Flag" title="{$civs[0][player.civ]}"/> 
                        </div>
                        <div class="col-sm">
                            <span class="player_name" style="color:{$player_colors[0][player.slot]}">{player.name}</span>
                            <br/>
                            <span>Rank: {#if player.rating !== null}{player.rating}{:else}Not available{/if}</span>
                        </div>
                    </div>
                    {/if}
                {/each}
                </div>
            </div>
        </div>
    </div>
{:else}
    <p>No match results found for {$search_id}</p>
{/each}

<style>
.flag_img {
    height:40px;
    width:70px;
}
.map_img {
    height:200px;
    width:200px;
}
.match {
    margin-bottom:5px;
    padding:10px;
    border:1px solid #000;
    border-radius:5px;
}
.team {
    background-color:#444;
    border-radius:10px;
    padding:10px;
    color:#FFF;
    height:100%;
}
.player {
    padding:10px;
    cursor:pointer;
    display:inline-block;
}
.player_name{
    font-weight: bold;
}
.player_name:hover{
    color:#FFF !important;
}
</style>