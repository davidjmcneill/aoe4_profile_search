<script>
    import { onMount } from 'svelte';

    export let search_id = '';
    let stats = [];
    let match_type = {17: "1v1", 18: "2v2", 19: "3v3", 20: "4v4"};

    //function to fetch JSON data from AoE4 servers
    export const fetch_stats = async () => {
        let temp_obj = {};
        let temp_array = [];
        for (let i = 17; i < 21; i++) {
            let base_url = 'https://aoeiv.net/api/leaderboard?game=aoe4&leaderboard_id='+i;
            let url_modifier = '&profile_id='+search_id;
            let url = base_url + url_modifier;
            temp_obj[i] = await (await fetch(url)).json();
            temp_array.push(temp_obj[i]);
        }
        stats = temp_array;
        console.log(stats);
    };
    //fetch default data (future: saved session ID?)
    onMount(fetch_stats);

    const CalculatePercent = (top,bottom) => {
        return Math.round(top / bottom * 100);
    }
</script>

<h3>User Stats</h3>

{#if stats.length > 0}
<h4>Quick Matches</h4>
<table class="table">
    <tr>
    {#each stats as board (board.leaderboard_id)}
        <th>{match_type[board.leaderboard_id]}</th>
    {/each}
    </tr>
    <tr>
    {#each stats as board (board.leaderboard_id)}
        <td class="player_info">

        {#each board.leaderboard as player (player.profile_id)}
            <p>Rating: {player.rating}</p>
            <p>Rank: {player.rank}</p>
            <p>Win Rate: {CalculatePercent(player.wins,player.games)}% ({player.wins}/{player.games})</p>
        {:else}
            <p>No player data</p>
        {/each}
        </td>
    {/each}
    </tr>
</table>
{:else}
    <td>No user stats found for {search_id}</td>
{/if}

<style>

</style>