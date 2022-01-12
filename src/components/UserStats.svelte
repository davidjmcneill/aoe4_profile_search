<script>
    import { onMount } from 'svelte';

    export let search_id = '';
    export let fetch_status = '';
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
        fetch_status = '';
        console.log(stats);
    };
    //fetch default data (future: saved session ID?)
    onMount(fetch_stats);

    const CalculatePercent = (top,bottom) => {
        return Math.round(top / bottom * 100);
    }
</script>

{#if stats.length > 0}
<div class="table-responsive">
<table class="table table-bordered">
    <thead>
        <tr>
            <th>Match Type</th>
            <th>ELO Rating</th>
            <th>Rank</th>
            <th>Win Rate (%)</th>
        </tr>
    </thead>
    <tbody>
    {#each stats as board (board.leaderboard_id)}
        <tr>
            <th>{match_type[board.leaderboard_id]} QM</th>
            {#each board.leaderboard as player (player.profile_id)}
            <td>{player.rating}</td>
            <td>{player.rank}</td>
            <td>{CalculatePercent(player.wins,player.games)}% ({player.wins}/{player.games})</td>
            {:else}
            <td colspan="100%">No player data</td>
            {/each}
        </tr>
    {/each}
    </tbody>
</table>
</div>
{:else}
    <p>Loading..</p>
{/if}

<style>

</style>