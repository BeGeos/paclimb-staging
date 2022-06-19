<script>
	// Svelte
	import { createEventDispatcher } from 'svelte';

	export let title;
	export let data;
	export let extension;
	export let param;

	let measure = data === '-' ? '' : extension;

	let dispatch = createEventDispatcher();

	const handleClick = (detail) => {
		if (!detail) return;

		dispatch('openWeatherDetail', {
			param: detail
		});
	};
</script>

<div
	class="p-2 text-center rounded-lg transition-all hover:bg-light-blue cursor-pointer"
	on:click={() => handleClick(param)}
>
	<h4>{title}</h4>
	<p class="text-center">{data} {measure}</p>
</div>
