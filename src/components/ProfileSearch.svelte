<script>
    import MatchList from './MatchList.svelte';

    export let search_id = '6935410';
    let search;
</script>

<div>
    <b>Profile ID:</b> <input type="text" bind:value={search_id}>
    <button on:click={ () => search.fetch_data()}>Search</button>
</div>

<MatchList bind:this={search} {search_id}/>