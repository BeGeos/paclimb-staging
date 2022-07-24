<script lang="ts">
	// Import utils
	import { parseTimeInterval, getPartOfDay, getStartPosition, getEndPosition } from '@utils';

	export let period: string | null = null;
	export let title: string = '';
	export let fake: boolean = false;

	let periodStart: number;
	let periodEnd: number;
	let periodRatio: number;
	let periodStartPosition: number;
	let periodEndPosition: number;

	$: if (period) {
		[periodStart, periodEnd] = parseTimeInterval(period);
		periodRatio = getPartOfDay(periodStart, periodEnd);
		periodStartPosition = getStartPosition(periodStart);
		periodEndPosition = getEndPosition(periodEnd);
	}
</script>

<div class="flex gap-4 items-center">
	<p class="w-[20%] m-0 font-normal">{title}</p>
	{#if fake}
		<div class="flex-1 relative flex justify-between">
			<p class="m-0">AM</p>
			<p class="m-0">PM</p>
			<span class="absolute left-[50%] w-[2px] h-[800%] z-10 bg-black/30 -translate-x-1/2" />
		</div>
	{:else}
		<div class="h-3.5 flex-1 bg-deep-brown relative">
			{#if periodStart >= 0}
				<span class="font-light absolute -top-[140%]" style:left={`${periodStartPosition - 2}%`}
					>{periodStart}</span
				>
			{/if}
			<span
				class="absolute h-full bg-grey-brown"
				style:left={`${periodStartPosition}%`}
				style:width={`${periodRatio}%`}
			>
				<span class="h-full bg-sun-yellow w-[80%] block mx-auto" />
			</span>
			{#if periodStart != periodEnd}
				<span class="font-light absolute -top-[140%]" style:left={`${periodEndPosition}%`}
					>{periodEnd}</span
				>
			{/if}
		</div>
	{/if}
</div>
