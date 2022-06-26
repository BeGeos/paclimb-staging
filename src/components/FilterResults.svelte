<script>
	import { createEventDispatcher } from 'svelte';

	// Font awesome
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faArrowRight } from '@fortawesome/free-solid-svg-icons/index.es';

	// Utils
	import { titleCase } from '@utils';

	export let results;

	const dispatch = createEventDispatcher();

	const handleCloseResults = () => {
		dispatch('closeFilterResults');
	};

	const viewMap = () => {
		dispatch('viewMap');
	};

	const handleFlyFromResults = (e, x, y) => {
		dispatch('flyFromResults', {
			x,
			y
		});
	};

	$: isResultsEmpty = Object.keys(results).length === 0;
</script>

<div class="max-w-full text-2xl lg:text-base flex justify-between items-center">
	<div class="cursor-pointer" on:click={handleCloseResults}>
		<Fa icon={faArrowRight} />
	</div>
	<p
		class="m-0 text-sm cursor-pointer decoration-dotted hover:underline lg:text-base"
		on:click={viewMap}
	>
		View Map
	</p>
</div>
<div class="my-8">
	{#if !isResultsEmpty}
		{#each Object.entries(results) as [sector, crags]}
			<h4 class="text-lg bg-white py-2">{titleCase(sector)}</h4>
			<ul>
				{#each crags as crag}
					<li
						class="min-w-full hover:bg-light-blue cursor-pointer p-2 font-normal text-base"
						on:click={(e) => handleFlyFromResults(e, crag.x, crag.y)}
					>
						{titleCase(crag.name)}
					</li>
				{/each}
				<hr />
			</ul>
		{/each}
	{:else}
		<h3>No crag match your search</h3>
	{/if}
</div>
