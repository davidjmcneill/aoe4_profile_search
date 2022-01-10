<script>
	import ProfileSearch from './components/ProfileSearch.svelte';

</script>

<main>
	<h3>Age of Empires 4 Profile Search</h3>
	<ProfileSearch/>
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