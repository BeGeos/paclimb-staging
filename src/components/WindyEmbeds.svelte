<script>
	import { createEventDispatcher } from 'svelte';

	export let lat;
	export let lon;
	export let detail;

	const dispatch = createEventDispatcher();

	const handleWindyClose = () => {
		dispatch('closeWindy');
	};
</script>

<div
	class="fixed inset-0 flex justify-center items-center overscroll-contain overflow-hidden z-40 bg-black/60"
	on:click={handleWindyClose}
>
	<!-- Embed -->
	<h1 class="absolute top-[10px] left-[10px] text-white text-3xl md:text-6xl cursor-pointer">
		&times;
	</h1>
	<iframe
		title="windy.com"
		src={`https://embed.windy.com/embed2.html?lat=${lat}&lon=${lon}&zoom=21&level=surface&overlay=${detail}&product=ecmwf&menu=&message=true&marker=&calendar=now&pressure=true&type=map&location=coordinates&detail=&metricWind=default&metricTemp=default&radarRange=-1`}
		frameborder="0"
		class="min-w-full min-h-full md:min-h-[450px] md:min-w-[650px]"
	/>
</div>
