<script>
	import { createEventDispatcher } from 'svelte';
	import { roadColors } from '../stores';

	const dispatch = createEventDispatcher();

	export let road;
	export let x;
	export let y;

	const flyToPark = () => {
		dispatch('flyToPark', {
			x,
			y
		});
	};

	$: dotColor = $roadColors[road.toLowerCase()];

	$: styles = `background-color: ${dotColor}`;
</script>

<div
	class="w-[1.5rem] h-[1.5rem] rounded-full border-2 border-white shadow-xl flex items-center justify-center cursor-pointer"
	style={styles}
	on:click={flyToPark}
>
	<p class="text-white m-0">P</p>
</div>
