<script lang="ts">
	import { roadColors } from '@stores';

	// Font Awesome
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faRoute } from '@fortawesome/free-solid-svg-icons/index.es';

	export let handleClose: Function;
	export let roadName: string;
	export let featureName: string;
	export let featureLink: string;
	export let show: boolean;
</script>

<div
	class="fixed bg-white bottom-0 left-0 min-w-full max-h-fit translate-y-full z-40 p-2 rounded-md scale-0 pr-6 font-Voltaire lg:min-w-fit"
	class:show
>
	<span
		class="absolute right-2 top-1 cursor-pointer text-4xl"
		on:click={(e) => {
			e.stopPropagation();
			handleClose();
		}}>&times;</span
	>
	{#if roadName}
		<h3 class="m-0" style:color={$roadColors[roadName.toLowerCase()]}>{roadName}</h3>
	{/if}
	<div class="flex items-center justify-between gap-4 p-2 border border-black/40 rounded-lg">
		<p class="m-0 text-xl">{featureName}</p>
		<a
			href={featureLink}
			class="p-2 shadow-lg rounded-md border border-black/40 flex gap-2 items-center"
			target="_blank"
			rel="noopener noreferrer"
		>
			<Fa icon={faRoute} />
			To get there</a
		>
	</div>
</div>

<style>
	.show {
		transition: transform 0.3s ease;
		transform: scale(1);
		animation: slideIn 0.2s ease-in forwards;
	}

	@keyframes slideIn {
		from {
			transform: translateY(100%);
		}
		to {
			transform: translateY(0%);
		}
	}
</style>
