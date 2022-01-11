<script>
    import UserStats from './UserStats.svelte';
    import MatchList from './MatchList.svelte';

    export let search_id = '6935410';
    let match_info;
    let player_stats;

    const fetch_profiledata = () => {
        player_stats.fetch_stats();
        match_info.fetch_matches();
    }
</script>

<div>
    <b>Profile ID:</b> <input type="text" bind:value={search_id}>
    <button on:click={fetch_profiledata(player_stats,match_info)}>Search</button>
</div>

<UserStats bind:this={player_stats} {search_id}/>

<MatchList bind:this={match_info} {search_id}/>