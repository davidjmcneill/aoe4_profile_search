<script>
    import { onMount } from 'svelte';

    //data storage imports
    import { search_id, fetch_status } from '../stores.js';

    let stats = [];

    //function to fetch JSON data from AoE4 servers
    export const fetch_rating = async () => {
        let temp_obj = {};
        let temp_array = [];
        for (let i = 17; i < 21; i++) {
            let base_url = 'https://aoeiv.net/api/player/ratinghistory?game=aoe4&count=5&leaderboard_id='+i;
            let url_modifier = '&profile_id='+$search_id;
            let url = base_url + url_modifier;

            temp_obj[i] = await (await fetch(url)).json();
            if (temp_obj[i].length > 0) {
                temp_array.push(temp_obj[i]);
            }
        }
        stats = temp_array;
        $fetch_status = '';
        console.log(stats);
    };

    onMount(fetch_rating);
</script>

<div>
{#each stats as row}
    <p>
    {#each row as match_result}
    {match_result.rating},
    {/each}
    </p>
{/each}
</div>