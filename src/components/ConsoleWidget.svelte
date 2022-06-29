<script>
	// Svelte
	import { createEventDispatcher } from 'svelte';

	// Font awesome
	import Fa from 'svelte-fa/src/fa.svelte';
	import {
		faExclamationTriangle,
		faUpRightFromSquare
	} from '@fortawesome/free-solid-svg-icons/index.es';

	// Components
	import Tooltip from '@components/Tooltip.svelte';

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

	let danger = false;

	$: if (title === 'UVI' && data >= 8) {
		danger = true;
	}
</script>

<div
	class="group relative p-2 text-center rounded-lg transition-all hover:bg-light-blue cursor-pointer"
	on:click={() => handleClick(param)}
>
	<h4 class="relative">
		{title}
		{#if title !== 'UVI'}
			<span class="absolute -top-2 -right-1">
				<Fa icon={faUpRightFromSquare} color="rgba(0,0,0,0.3)" size="xs" />
			</span>
		{/if}
	</h4>
	<p class="flex items-center justify-center gap-2">
		{data}
		{measure}
		{#if danger}
			<span>
				<Fa icon={faExclamationTriangle} color="red" />
			</span>
		{/if}
	</p>
	{#if title === 'UVI' && danger}
		<Tooltip text="The UVI is quite high. Make sure to wear sunscreen and stay hydrated" />
	{/if}
</div>
