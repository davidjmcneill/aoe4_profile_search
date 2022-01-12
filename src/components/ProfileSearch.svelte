<script>
    import UserStats from './UserStats.svelte';
    import MatchList from './MatchList.svelte';

    export let search_id = '6935410';
    export let fetch_status = '';
    let auto_fetch = false;
    let auto_poll;
    let match_info;
    let player_stats;

    const fetch_profile = () => {
        fetch_status = 'Loading profile data for '+search_id;
        player_stats.fetch_stats();
        match_info.fetch_matches();
    }

    const setAutoPoll = () => {
        if (auto_fetch === true) {
            auto_poll = setInterval(() => {
                fetch_profile(player_stats,match_info);
            }, (120*1000));//reload every 2 minutes
        } else {
            clearInterval(auto_poll);
        }
    }
</script>

<div class="container">
    <div class="row align-items-center align-items-stretch">
        <div class="col-sm">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Enter a Profile ID</h5>
                    <input type="text" bind:value={search_id}>
                    <button on:click={fetch_profile(player_stats,match_info)}>Search</button>

                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" id="auto_refresh" bind:checked="{auto_fetch}" on:change="{setAutoPoll(auto_fetch)}">
                        <label class="form-check-label" for="auto_refresh">Automatically refresh</label>
                    </div>
                </div>

                {#if fetch_status.length > 0}
                <div class="card-footer">
                    <b>{fetch_status}</b>
                </div>
                {/if}
            </div>
        </div>

        <div class="col-sm">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">User Stats</h5>
                    <UserStats bind:this={player_stats} {search_id} bind:fetch_status={fetch_status}/>
                </div>
            </div>
        </div>
    </div>
    <MatchList bind:this={match_info} bind:search_id={search_id}/>
</div>

<style>
.form-check-input {
    float:none !important;
}
</style>