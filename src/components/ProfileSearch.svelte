<script>  
    //data storage imports
    import { search_id, fetch_status } from '../stores.js';

    export let search_box = '';
    export let player_stats = '';
    export let match_info = '';
    let auto_refresh = false;
    let auto_poll;
    let auto_timer;
    let auto_poll_timer;

    const fetch_profile = () => {
        //Request will not complete more than 9 digits are entered
        if ($search_id.length > 3 && $search_id.length < 10) {
            $fetch_status = 'Loading profile data for '+$search_id;
            player_stats.fetch_stats();
            match_info.fetch_matches();
            auto_poll_timer = 120;
        } else {
            search_box.focus();
        }
    }

    const updateTimer = (time) => {
        auto_poll_timer = time;
        auto_timer = setInterval(() => {
            auto_poll_timer = auto_poll_timer - 1;
            if (auto_poll_timer < 1) {
                //reset the timer after expiring
                clearInterval(auto_timer);
                if (auto_refresh === true) {
                    //initialize new timer if still set to auto refresh
                    updateTimer(time);
                }
            }
        }, 1000);
    }

    const setAutoPoll = () => {
        let refresh_time_s = 120;//reload time in seconds
        if (auto_refresh === true) {
            updateTimer(refresh_time_s);
            auto_poll = setInterval(() => {
                fetch_profile(player_stats,match_info);
            }, (refresh_time_s*1000));
        } else {
            clearInterval(auto_poll);
            clearInterval(auto_timer);
        }
    }

    const CheckValue = (v) => {
        $search_id = v.target.value.replace(/[^\d.]/g,'');//replace all non-numerics except periods
    }
</script>

<input type="text" placeholder="Profile ID" on:keydown={CheckValue} on:keyup="{CheckValue}" bind:this={search_box} bind:value={$search_id}>
<button on:click={fetch_profile(player_stats,match_info)}>Search</button>

<div class="form-check" style="padding:10px;">
    <input type="checkbox" class="form-check-input" id="auto_refresh" bind:checked="{auto_refresh}" on:change="{setAutoPoll(auto_refresh)}">
    <label class="form-check-label" for="auto_refresh">
        <span>Automatic refresh</span>
        {#if auto_refresh === true}
        <span> | <i>Next refresh in: {auto_poll_timer} seconds</i></span>
        {/if}
    </label>
</div>

<style>
.form-check-input {
    float:none !important;
}
</style>