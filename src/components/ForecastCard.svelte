<script lang="ts">
	// Font awesome
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faDroplet } from '@fortawesome/free-solid-svg-icons/index.es';

	// Utils
	import { formatUnixDate, getPercentage } from '@utils';

	export let temp: number;
	export let iconUrl: string;
	export let dt: number;
	export let rainProbability: number;
	export let altText: string;

	let [day, weekDay, hour] = formatUnixDate(dt);
</script>

<div class="text-sm text-center min-w-fit my-2 px-4" class:separate={hour === 0}>
	<p class="m-0">{weekDay} {day}</p>
	<p class="m-0 font-normal">{hour}</p>
	<img src={iconUrl} alt={`forecast icon ${altText} at ${hour} on ${weekDay} ${day}`} />
	<p class="m-0 font-normal">{Math.floor(temp)}˚</p>
	<p class="m-0 font-normal flex gap-2 items-center justify-center">
		<Fa icon={faDroplet} color="#4c8bf5" />
		{getPercentage(rainProbability)}%
	</p>
</div>

<style>
	.separate {
		border-left: 1px solid rgba(0, 0, 0, 0.3);
	}
</style>
