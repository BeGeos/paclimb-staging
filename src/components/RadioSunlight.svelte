<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	// Components
	import Tooltip from '@components/Tooltip.svelte';

	// Utils
	import { slugify } from '@utils';

	const dispatch = createEventDispatcher();

	// Import Font awesome
	import Fa from 'svelte-fa/src/fa.svelte';

	export let icon: any;
	export let text: string;
	export let checked: boolean;
	export let subtext: string;

	const checkSunlightOptions = () => {
		dispatch('checkSunlight', {
			name: name
		});
	};
</script>

<label class="relative w-28 flex-1 group">
	<span class="font-normal block text-center">{text}</span>
	<!-- <input type="hidden" name={radioGroup} value="False" /> -->
	<div class="text-[.75em] min-w-full text-center font-light mb-2 text-gray-500">
		{subtext}
	</div>
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
