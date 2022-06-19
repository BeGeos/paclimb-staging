<script>
	// Font awesome
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faDroplet } from '@fortawesome/free-solid-svg-icons/index.es';

	// Utils
	import { formatUnixDate, getPercentage } from '@utils';

	export let temp;
	export let iconUrl;
	export let dt;
	export let rainProbability;
	export let altText;

	let [day, weekDay, hour] = formatUnixDate(dt);
</script>

<div class="text-sm text-center min-w-fit my-2">
	<p class="m-0">{weekDay} {day}</p>
	<p class="m-0 font-normal">{hour}</p>
	<img src={iconUrl} alt={`forecast icon ${altText} at ${hour} on ${weekDay} ${day}`} />
	<p class="m-0 font-normal">{Math.floor(temp)}˚</p>
	<p class="m-0 font-normal flex gap-2 items-center justify-center">
		<Fa icon={faDroplet} color="#4c8bf5" />
		{getPercentage(rainProbability)}%
	</p>
</div>
