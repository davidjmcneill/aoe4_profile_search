<script>
	import ProfileSearch from './components/ProfileSearch.svelte';
	import Leaderboard_User from './components/Leaderboard_User.svelte';
	import PlayerRating_User from './components/PlayerRating_User.svelte';
    import Matches_User from './components/Matches_User.svelte';

	//data storage imports
    import { user_name, fetch_status } from './stores.js';

    export let search_box;
	export let player_stats;
	export let player_rating;
	export let match_info;
    
</script>

<main>
	<h3>Age of Empires 4 Profile Search</h3>

	<div class="container">
		<div class="row align-items-center align-items-stretch">
			<div class="col-sm">
				<div class="card bg-secondary text-white">
					<div class="card-body">
						<h5 class="card-title">Type in a Profile ID</h5>
						<ProfileSearch bind:player_stats={player_stats} bind:match_info={match_info} bind:player_rating={player_rating} bind:search_box={search_box}/>
					</div>
	
					{#if $fetch_status.length > 0}
					<div class="card-footer">
						<b>{$fetch_status}</b>
					</div>
					{/if}
				</div>
			</div>
	
			<div class="col-sm">
				<div class="card bg-secondary text-white">
					<div class="card-body">
						<h5 class="card-title">{#if $user_name}{$user_name}'s{/if} Leaderboard Stats</h5>
						<Leaderboard_User bind:this={player_stats}/>
					</div>
				</div>
			</div>
	
			<div class="col-sm">
				<div class="card bg-secondary text-white">
					<div class="card-body">
						<h5 class="card-title">Rating History</h5>
						<PlayerRating_User bind:this={player_rating}/>
					</div>
				</div>
			</div>
		</div>

		<hr/>
	
		<Matches_User bind:this={match_info} bind:search_box={search_box}/>
	</div>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}
	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>