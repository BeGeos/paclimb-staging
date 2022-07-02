<script>
	import { createEventDispatcher } from 'svelte';

	// Components
	import Tooltip from '@components/Tooltip.svelte';

	const dispatch = createEventDispatcher();

	// Import Font awesome
	import Fa from 'svelte-fa/src/fa.svelte';

	export let icon;
	export let text;
	export let checked;
	export let tooltip = false;
	export let tooltipText = '';

	const checkSunlightOptions = () => {
		dispatch('checkSunlight', {
			name: name
		});
	};

	const slugify = (text) => {
		return text
			.split(/\s+/)
			.map((c) => c.toLowerCase())
			.join('-');
	};
</script>

<label class="relative w-28 group">
	{#if tooltip}
		<Tooltip text={tooltipText} />
	{/if}
	<span class="font-normal block text-center mb-2">{text}</span>
	<!-- <input type="hidden" name={radioGroup} value="False" /> -->
	<input
		type="checkbox"
		name="hours-of-day"
		value={slugify(text)}
		class="hidden peer"
		{checked}
		on:click={checkSunlightOptions}
	/>
	<span
		class="block min-w-full p-2 cursor-pointer border border-black/40 rounded-md font-normal select-none peer-checked:bg-sky-blue peer-checked:text-white peer-checked:border-none"
	>
		<Fa {icon} size="lg" class="mx-auto" /></span
	>
</label>
