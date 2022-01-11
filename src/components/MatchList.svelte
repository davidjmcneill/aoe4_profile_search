<script>
    import { onMount } from 'svelte';

    export let search_id = '';
    let matches = [];

    //lookup array tables
    let match_type = {15: "1v1", 16: "2v2", 17: "3v3", 18: "4v4"};
    let civ_name = {0: "Abbasid Dynasty", 1: "Chinese", 2: "Delhi Sultanate", 3: "English", 4: "French", 5: "Holy Roman Empire", 6: "Mongols", 7: "Rus"};
    let civ_flag = {0: "./images/CivIcon-AbbasidAoE4.png", 1: "./images/CivIcon-ChineseAoE4.png", 2: "./images/CivIcon-DelhiAoE4.png", 3: "./images/CivIcon-EnglishAoE4.png", 4: "./images/CivIcon-FrenchAoE4.png", 5: "./images/CivIcon-HREAoE4.png", 6: "./images/CivIcon-MongolsAoE4.png", 7: "./images/CivIcon-RusAoE4.png"};

    //function to fetch JSON data from AoE4 servers
    export const fetch_matches = async () => {
        const base_url = 'https://aoeiv.net/api/player/matches?game=aoe4&count=10';
        let url_modifier = '&profile_id='+search_id;
        let url = base_url + url_modifier;
        
        const response = await fetch(url);
        matches = await response.json();
        //console.log(matches);
    };
    //fetch default data (future: saved session ID?)
    onMount(fetch_matches);

    //format unix timestamp to datetime
    const DateFormatted = (UNIX_timestamp) => {
        return new Date(UNIX_timestamp * 1000);
    }
</script>

<h3>Match Details</h3>
{#each matches as match (match.match_id)}
    <div class="match">
        <p>Match Time: {DateFormatted(match.started)}</p>
        <p>Server: {match.server}</p>
        <p>Match ID: {match.match_id}</p>
        <p>Match Type: {match_type[match.rating_type_id]}</p>
    
    {#each match.players as player (player.profile_id)}
        <div class='player team{player.team}'>
            <p><img src="{civ_flag[player.civ]}" alt="{civ_name[player.civ]} Flag" title="{civ_name[player.civ]}"/> <span class="font-bold">{player.name}</span> - <button on:click>{player.profile_id}</button> (ELO: {player.rating})</p>
        </div>
    {:else}
        <p>No player data</p>
    {/each}
    </div>
{:else}
    <p>No match results found for {search_id}</p>
{/each}

<style>
img {
    height:25px;
    width:50px;
}
.match {
    margin-bottom:5px;
    padding:10px;
    border:1px solid #000;
    border-radius:5px;
}
.player {
    width: 25%;
}
.font-bold{
    font-weight: bold;
}
</style>