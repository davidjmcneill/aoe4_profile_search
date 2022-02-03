<script>
    import { onMount } from 'svelte';

    //data storage imports
    import { match_type, search_id, user_name, fetch_status } from '../stores.js';

    let stats = [];
    
    //function to fetch JSON data from AoE4 servers
    export const fetch_stats = async () => {
        let temp_obj = {};
        let temp_array = [];
        for (let i = 17; i <= 21; i++) {
            let base_url = 'https://aoeiv.net/api/leaderboard?game=aoe4&leaderboard_id='+i;
            let url_modifier = '&profile_id='+$search_id;
            if (i == 21) {
                //Get Custom info
                base_url = 'https://aoeiv.net/api/leaderboard?game=aoe4&leaderboard_id=0';
            }
            let url = base_url + url_modifier;
            temp_obj[i] = await (await fetch(url)).json();
            temp_array.push(temp_obj[i]);
        }
        stats = temp_array;
        $fetch_status = '';
        console.log(stats);

        for (const key in stats) {
            $user_name = '';
            if (stats[key]["count"] > 0) {
                //save user name of profile id searched
                $user_name = stats[key]["leaderboard"][0]["name"];
                break;
            }
        }
    };
    //fetch default data (future: saved session ID?)
    onMount(fetch_stats);

    const CalculatePercent = (top,bottom) => {
        return Math.round(top / bottom * 100);
    }
</script>

{#if $user_name.length > 0}
<div class="table-responsive">
<table class="table table-bordered table-dark">
    <thead>
        <tr>
            <th>Match Type</th>
            <th>Rank</th>
            <th>ELO Rating</th>
            <th>Win Rate (%)</th>
        </tr>
    </thead>
    <tbody>
    {#each stats as board (board.leaderboard_id)}
        <tr>
            <th>{$match_type[0]["leaderboard"][board.leaderboard_id]}</th>
            {#each board.leaderboard as player (player.profile_id)}
            <td>#{player.rank}</td>
            <td>{player.rating}</td>          
            <td>{CalculatePercent(player.wins,player.games)}% ({player.wins}W | {player.losses}L)</td>
            {:else}
            <td colspan="100%">No player data</td>
            {/each}
        </tr>
    {/each}
    </tbody>
</table>
</div>
{:else}
    <p>No data found for {$search_id}</p>
{/if}

<style>

</style>