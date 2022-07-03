<script lang="ts">
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

	// Types
	interface WeatherConfig {
		threshold: number;
		dangerText: string;
	}

	export let title: string;
	export let data: number | string;
	export let extension: string;
	export let param: string;
	export let selectable: boolean = true;
	export let threshold: boolean = false;

	let measure = data === '-' ? '' : extension;

	let dispatch = createEventDispatcher();

	const handleClick = (detail: string): void => {
		if (!detail) return;

		dispatch('openWeatherDetail', {
			param: detail
		});
	};
	let dangerText: string = '';
	let danger: boolean = false;

	const uviConfig: WeatherConfig = {
		threshold: 8,
		dangerText: 'The UVI is quite high. Make sure to wear sunscreen and stay hydrated'
	};

	$: if (title === 'UVI' && data >= uviConfig.threshold) {
		danger = true;
		dangerText = uviConfig.dangerText;
	}
</script>

<div
	class="group relative p-2 text-center rounded-lg transition-all"
	class:selectable
	on:click={() => handleClick(param)}
>
	<h4 class="relative">
		{title}
		{#if selectable}
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
	{#if threshold && danger}
		<Tooltip text={dangerText} />
	{/if}
</div>

<style>
	.selectable:hover {
		background-color: var(--clr-light-blue);
		cursor: pointer;
	}
</style>
